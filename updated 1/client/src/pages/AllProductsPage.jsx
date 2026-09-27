import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./CategoryPage.css";

const RATING_OPTIONS = [
  { label: "Any rating", value: 0 },
  { label: "3★ & up", value: 3 },
  { label: "4★ & up", value: 4 },
  { label: "4.5★ & up", value: 4.5 }
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating-desc" }
];

export default function AllProductsPage({ products, categories }) {
  const categoryNames = useMemo(
    () => categories.map((c) => c.name),
    [categories]
  );

  const maxPossiblePrice = useMemo(() => {
    if (products.length === 0) return 100;
    return Math.ceil(Math.max(...products.map((p) => p.price)));
  }, [products]);

  const [activeCategory, setActiveCategory] = useState(null);
  const [maxPrice, setMaxPrice] = useState(maxPossiblePrice);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");

  // Keep the price slider's ceiling in sync if the product list changes.
  useEffect(() => {
    setMaxPrice(maxPossiblePrice);
  }, [maxPossiblePrice]);

  const filteredProducts = useMemo(() => {
    let result = products
      .filter((p) => !activeCategory || p.category === activeCategory)
      .filter((p) => p.price <= maxPrice)
      .filter((p) => p.rating >= minRating);

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating-desc") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, activeCategory, maxPrice, minRating, sortBy]);

  const hasActiveFilters =
    activeCategory || maxPrice < maxPossiblePrice || minRating > 0 || sortBy !== "featured";

  const clearFilters = () => {
    setActiveCategory(null);
    setMaxPrice(maxPossiblePrice);
    setMinRating(0);
    setSortBy("featured");
  };

  return (
    <section className="section category-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>All products</span>
        </nav>

        <div className="category-page-heading">
          <h1>All products</h1>
          <p>{filteredProducts.length} product(s)</p>
        </div>

        {categoryNames.length > 1 && (
          <div className="subcategory-pills">
            <button
              className={`pill${!activeCategory ? " active" : ""}`}
              onClick={() => setActiveCategory(null)}
            >
              All
            </button>
            {categoryNames.map((name) => (
              <button
                key={name}
                className={`pill${activeCategory === name ? " active" : ""}`}
                onClick={() => setActiveCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        <div className="category-page-body">
          <div className="category-page-products">
            {filteredProducts.length > 0 ? (
              <div className="top-selling-grid">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No products match these filters. Try widening your price or rating range.</p>
              </div>
            )}
          </div>

          <aside className="filter-panel">
            <div className="filter-panel-header">
              <h3>Filters</h3>
              {hasActiveFilters && (
                <button className="filter-clear" onClick={clearFilters}>
                  Clear all
                </button>
              )}
            </div>

            <div className="filter-group">
              <label className="filter-label" htmlFor="sort-select">
                Sort by
              </label>
              <select
                id="sort-select"
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label" htmlFor="price-range">
                Price: <strong>${maxPrice}</strong> or less
              </label>
              <input
                id="price-range"
                type="range"
                min={0}
                max={maxPossiblePrice}
                step={1}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="filter-slider"
              />
              <div className="filter-range-scale">
                <span>$0</span>
                <span>${maxPossiblePrice}</span>
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Rating</span>
              <div className="filter-radio-list">
                {RATING_OPTIONS.map((opt) => (
                  <label key={opt.value} className="filter-radio">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === opt.value}
                      onChange={() => setMinRating(opt.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
