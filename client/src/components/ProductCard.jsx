import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>

      <div className="product-card-content">
        <p className="product-category">{product.category}</p>

        <Link to={`/products/${product._id}`} className="product-name">
          {product.name}
        </Link>

        <div className="product-bottom">
          <span className="product-price">₹{product.price}</span>

          <span className="product-stock">{product.stock} left</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
