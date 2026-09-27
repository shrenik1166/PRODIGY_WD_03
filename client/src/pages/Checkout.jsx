import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pinCode: "",
  });

  const [error, setError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setPlacingOrder(true);

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: formData,
          items: cartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      clearCart();

      navigate(`/order-success/${data.order.orderId}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="page">
        <section className="empty-cart">
          <p className="eyebrow">CHECKOUT</p>
          <h1>Your cart is empty.</h1>
          <p>Add products before proceeding to checkout.</p>

          <Link to="/products" className="shop-button">
            Browse Products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="checkout-page">
        <div className="checkout-header">
          <p className="eyebrow">CHECKOUT</p>
          <h1>Complete Your Order</h1>
          <p>Enter your delivery details to place your order.</p>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Delivery Details</h2>

              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </label>

              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
              </label>

              <label>
                Address
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter your complete delivery address"
                  required
                />
              </label>

              <label>
                City
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />
              </label>

              <label>
                PIN Code
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="Enter your 6-digit PIN code"
                  pattern="[0-9]{6}"
                  maxLength="6"
                  required
                />
              </label>
            </div>

            {error && <div className="checkout-error">{error}</div>}

            <button
              type="submit"
              className="checkout-button"
              disabled={placingOrder}
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <aside className="checkout-summary">
            <p className="eyebrow">ORDER SUMMARY</p>

            {cartItems.map((item) => (
              <div className="summary-row" key={item._id}>
                <span>
                  {item.name} × {item.quantity}
                </span>

                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{cartTotal}</strong>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Checkout;
