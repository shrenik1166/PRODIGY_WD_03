import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder";
import "./App.css";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">NEXACART • EVERYDAY SHOPPING</p>

          <h1>
            Good things,
            <span>at your doorstep.</span>
          </h1>

          <p className="hero-description">
            Everyday groceries, drinks, snacks and home essentials — carefully
            brought together in one simple online store.
          </p>

          <div className="hero-actions">
            <a href="/products" className="shop-button">
              Explore the store <span>→</span>
            </a>
            <a href="/track-order" className="hero-secondary">
              Track an order
            </a>
          </div>

          <div className="hero-highlights">
            <div>
              <strong>08+</strong>
              <span>Everyday products</span>
            </div>
            <div>
              <strong>Easy</strong>
              <span>Simple checkout</span>
            </div>
            <div>
              <strong>Fast</strong>
              <span>Order tracking</span>
            </div>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit hero-orbit-one"></div>
          <div className="hero-orbit hero-orbit-two"></div>
          <div className="hero-card hero-card-main">
            <span className="hero-card-label">TODAY'S PICK</span>
            <div className="hero-basket">
              <span>🛍️</span>
            </div>
            <strong>Fresh everyday finds</strong>
            <small>Ready when you are</small>
          </div>
          <div className="hero-floating hero-floating-top">FRESH</div>
          <div className="hero-floating hero-floating-bottom">SHOP EASY</div>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app-shell">
          <Navbar />

          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/order-success/:orderId"
                element={<OrderSuccess />}
              />
              <Route path="/track-order" element={<TrackOrder />} />
            </Routes>
          </div>

          <footer>
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/nexacart-mark.svg" alt="" />
                <strong>NexaCart</strong>
              </div>
              <p>Everyday shopping, made pleasantly simple.</p>
            </div>
            <div className="footer-meta">
              <span>Shop • Track • Enjoy</span>
              <span>© 2026 NexaCart</span>
            </div>
          </footer>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
