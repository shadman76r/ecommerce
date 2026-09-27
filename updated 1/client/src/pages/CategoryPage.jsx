import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

export default function CategoryPage({ products, categories }) {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);

  const categoryProducts = useMemo(
    () => (category ? products.filter((p) => p.category === category.name) : []),
    [products, category]
  );

  const subcategories = useMemo(() => {
    const set = new Set(categoryProducts.map((p) => p.subcategory).filter(Boolean));
    return Array.from(set);
  }, [categoryProducts]);

  const maxPossiblePrice = useMemo(() => {
    if (categoryProducts.length === 0) return 100;
    return Math.ceil(Math.max(...categoryProducts.map((p) => p.price)));
  }, [categoryProducts]);

  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [maxPrice, setMaxPrice] = useState(maxPossiblePrice);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");

  // Reset filters whenever the category (URL param) changes.
  useEffect(() => {
    setActiveSubcategory(null);
    setMaxPrice(maxPossiblePrice);
    setMinRating(0);
    setSortBy("featured");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, maxPossiblePrice]);

  const filteredProducts = useMemo(() => {
    let result = categoryProducts
      .filter((p) => !activeSubcategory || p.subcategory === activeSubcategory)
      .filter((p) => p.price <= maxPrice)
      .filter((p) => p.rating >= minRating);

    if (sortBy === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating-desc") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [categoryProducts, activeSubcategory, maxPrice, minRating, sortBy]);

  const hasActiveFilters =
    activeSubcategory || maxPrice < maxPossiblePrice || minRating > 0 || sortBy !== "featured";

  const clearFilters = () => {
    setActiveSubcategory(null);
    setMaxPrice(maxPossiblePrice);
    setMinRating(0);
    setSortBy("featured");
  };

  if (!category) {
    return (
      <section className="section">
        <div className="container">
          <p>We couldn't find that category.</p>
          <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: 12 }}>
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section category-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{category.name}</span>
        </nav>

        <div className="category-page-heading">
          <h1>{category.name}</h1>
          <p>{filteredProducts.length} product(s)</p>
        </div>

        {subcategories.length > 1 && (
          <div className="subcategory-pills">
            <button
              className={`pill${!activeSubcategory ? " active" : ""}`}
              onClick={() => setActiveSubcategory(null)}
            >
              All
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                className={`pill${activeSubcategory === sub ? " active" : ""}`}
                onClick={() => setActiveSubcategory(sub)}
              >
                {sub}
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
