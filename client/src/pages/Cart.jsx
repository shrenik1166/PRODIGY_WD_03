import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="page">
        <section className="empty-cart">
          <p className="eyebrow">YOUR CART</p>

          <h1>Your cart is empty.</h1>

          <p>Add some products to your cart and they will appear here.</p>

          <Link to="/products" className="shop-button">
            Browse Products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="cart-page">
        <div className="cart-header">
          <div>
            <p className="eyebrow">YOUR CART</p>

            <h1>Shopping Cart</h1>
          </div>

          <Link to="/products" className="continue-shopping">
            ← Continue shopping
          </Link>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-info">
                  <p className="product-category">{item.category}</p>

                  <h2>{item.name}</h2>

                  <p className="cart-item-price">₹{item.price}</p>

                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item._id)}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <strong>₹{item.price * item.quantity}</strong>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <p className="eyebrow">ORDER SUMMARY</p>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>₹{cartTotal}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{cartTotal}</strong>
            </div>

            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Cart;
