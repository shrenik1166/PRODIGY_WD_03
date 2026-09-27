import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <Link to="/" className="logo" aria-label="NexaCart home">
        <img src="/nexacart-mark.svg" alt="" className="logo-mark" />
        <span>NexaCart</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/track-order">Track Order</Link>
        <Link to="/cart" className="cart-button">
          Cart <span className="cart-count">{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
