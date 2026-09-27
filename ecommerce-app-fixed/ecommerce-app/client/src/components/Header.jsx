import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

const MAX_SUGGESTIONS = 6;

export default function Header({ search, setSearch, products = [] }) {
  const { totalCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);

  const suggestions = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter((p) => p.name.toLowerCase().includes(term))
      .slice(0, MAX_SUGGESTIONS);
  }, [products, search]);

  const showDropdown = isOpen && search.trim().length > 0;

  // Close the dropdown on outside click or Escape, without touching
  // anything else on the page (Top Selling etc. never re-renders from this).
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (product) => {
    setIsOpen(false);
    setSearch("");
    navigate(`/product/${product.id}`);
  };

  const handleClear = () => {
    setSearch("");
    setIsOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">G</span>
          <span className="logo-name">GreenMart</span>
        </Link>

        <div className="search-bar" ref={wrapRef}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search for baskets, ceramics, decor..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            aria-label="Search products"
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls="search-suggestions-list"
            aria-autocomplete="list"
            autoComplete="off"
          />
          {search && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

          {showDropdown && (
            <div className="search-suggestions" role="listbox" id="search-suggestions-list">
              {suggestions.length > 0 ? (
                suggestions.map((product) => (
                  <button
                    type="button"
                    key={product.id}
                    className="search-suggestion-item"
                    role="option"
                    aria-selected="false"
                    onClick={() => handleSelect(product)}
                  >
                    <img src={product.image} alt="" />
                    <span className="search-suggestion-text">
                      <span className="search-suggestion-name">{product.name}</span>
                      <span className="search-suggestion-category">{product.category}</span>
                    </span>
                    <span className="search-suggestion-price">${product.price.toFixed(2)}</span>
                  </button>
                ))
              ) : (
                <div className="search-suggestion-empty">
                  No products matched "{search}".
                </div>
              )}
            </div>
          )}
        </div>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4.5 20c1.6-3.4 4.3-5 7.5-5s5.9 1.6 7.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="icon-btn cart-btn"
            aria-label="Open cart"
            onClick={() => setIsCartOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 8h14l-1.4 10.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
