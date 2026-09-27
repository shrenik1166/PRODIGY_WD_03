import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const searchTerm = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm),
      );
    }

    if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, search, category, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
  };

  if (loading) {
    return (
      <main className="page">
        <section className="products-page">
          <p className="eyebrow">OUR STORE</p>
          <h1>Loading products...</h1>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <section className="products-page">
          <p className="eyebrow">OUR STORE</p>
          <h1>Unable to load products</h1>
          <p>{error}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="products-page">
        <div className="products-header">
          <div>
            <p className="eyebrow">NEXACART STORE</p>
            <h1>Shop everyday essentials.</h1>
            <p>Browse groceries, beverages, snacks and household essentials.</p>
          </div>
        </div>

        <div className="product-controls">
          <div className="search-box">
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>

          {(search || category !== "All" || sort !== "default") && (
            <button
              type="button"
              className="clear-filters"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}
        </div>

        <div className="products-result-info">
          <span>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </span>

          {search && (
            <span>
              Results for "<strong>{search}</strong>"
            </span>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h2>No products found</h2>
            <p>Try another search or remove your filters.</p>

            <button
              type="button"
              className="shop-button"
              onClick={clearFilters}
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Products;
