import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`,
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data.product);
      } catch (error) {
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <div className="status-message">Loading product...</div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="page">
        <div className="status-message error">
          {error || "Product not found."}
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <main className="page">
      <Link to="/products" className="back-link">
        ← Back to products
      </Link>

      <section className="product-details">
        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-content">
          <p className="product-category">{product.category}</p>

          <h1>{product.name}</h1>

          <p className="details-price">₹{product.price}</p>

          <p className="details-description">{product.description}</p>

          <p className="details-stock">
            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of stock"}
          </p>

          <button
            className="details-cart-button"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
