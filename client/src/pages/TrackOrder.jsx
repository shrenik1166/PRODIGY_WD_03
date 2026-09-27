import { useState } from "react";
import { Link } from "react-router-dom";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const statuses = ["Placed", "Processing", "Shipped", "Delivered"];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedOrderId = orderId.trim();

    if (!trimmedOrderId) {
      setError("Please enter your order ID.");
      setOrder(null);
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${encodeURIComponent(
          trimmedOrderId,
        )}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order not found");
      }

      setOrder(data.order);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status) => {
    return statuses.indexOf(status);
  };

  return (
    <main className="page">
      <section className="track-order-page">
        <div className="track-order-header">
          <p className="eyebrow">ORDER TRACKING</p>
          <h1>Track your order.</h1>
          <p>Enter your NexaCart order ID to check your order status.</p>
        </div>

        <form className="track-order-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={orderId}
            onChange={(event) => setOrderId(event.target.value)}
            placeholder="Enter order ID e.g. NC-12345678-1234"
          />

          <button type="submit" className="checkout-button" disabled={loading}>
            {loading ? "Checking..." : "Track Order"}
          </button>
        </form>

        {error && <div className="track-order-error">{error}</div>}

        {order && (
          <section className="order-tracking-result">
            <div className="tracking-result-header">
              <div>
                <p className="eyebrow">ORDER FOUND</p>
                <h2>{order.orderId}</h2>
              </div>

              <span className="order-status">{order.status}</span>
            </div>

            <div className="tracking-timeline">
              {statuses.map((status, index) => {
                const currentIndex = getStatusIndex(order.status);

                const completed = index <= currentIndex;

                return (
                  <div
                    className={`tracking-step ${completed ? "completed" : ""}`}
                    key={status}
                  >
                    <div className="tracking-dot">{completed ? "✓" : ""}</div>

                    <div className="tracking-step-content">
                      <strong>{status}</strong>

                      {index === currentIndex && <span>Current status</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="tracking-details">
              <div className="tracking-card">
                <p className="eyebrow">DELIVERY DETAILS</p>

                <p>
                  <strong>{order.customer.name}</strong>
                </p>

                <p>{order.customer.phone}</p>

                <p>{order.customer.email}</p>

                <p>
                  {order.customer.address}, {order.customer.city} -{" "}
                  {order.customer.pinCode}
                </p>
              </div>

              <div className="tracking-card">
                <p className="eyebrow">ORDER SUMMARY</p>

                {order.items.map((item) => (
                  <div className="tracking-item" key={item.productId}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>× {item.quantity}</span>
                    </div>

                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                ))}

                <div className="summary-divider" />

                <div className="summary-total">
                  <span>Total</span>
                  <strong>₹{order.totalAmount}</strong>
                </div>
              </div>
            </div>

            <Link to="/products" className="shop-button tracking-shop-button">
              Continue Shopping
            </Link>
          </section>
        )}
      </section>
    </main>
  );
}

export default TrackOrder;
