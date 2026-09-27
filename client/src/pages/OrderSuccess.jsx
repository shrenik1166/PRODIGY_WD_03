import { Link, useParams } from "react-router-dom";

function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <main className="page">
      <section className="order-success">
        <div className="success-icon">✓</div>

        <p className="eyebrow">ORDER CONFIRMED</p>

        <h1>Your order has been placed!</h1>

        <p className="success-message">
          Thank you for shopping with NexaCart. Your order has been successfully
          received.
        </p>

        <div className="order-id-box">
          <span>Order ID</span>
          <strong>{orderId}</strong>
        </div>

        <div className="success-actions">
          <Link to="/products" className="shop-button">
            Continue Shopping
          </Link>

          <Link to="/" className="continue-shopping">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default OrderSuccess;
