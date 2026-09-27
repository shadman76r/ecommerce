import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./CategorySection.css";

const AUTO_ROTATE_MS = 2000;

export default function CategorySection({ categories }) {
  const [page, setPage] = useState(0); // 0 = cards 1-2, 1 = cards 3-4
  const [isPaused, setIsPaused] = useState(false);
  const pageCount = Math.ceil(categories.length / 2);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (p) => setPage((p + pageCount) % pageCount),
    [pageCount]
  );

  // Auto-advance every 5s. Manual navigation (arrows/dots/hover) resets
  // the timer so it doesn't jump right after the user just clicked.
  useEffect(() => {
    if (pageCount <= 1 || isPaused) return undefined;

    timerRef.current = setInterval(() => {
      setPage((prev) => (prev + 1) % pageCount);
    }, AUTO_ROTATE_MS);

    return () => clearInterval(timerRef.current);
  }, [pageCount, isPaused, page]);

  const goToManual = (p) => {
    goTo(p);
  };

  return (
    <section className="section category-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <h2>Shop by category</h2>
            <p>Browse two at a time, or step through the full set</p>
          </div>
          <div className="carousel-controls">
            <button className="arrow-btn" onClick={() => goToManual(page - 1)} aria-label="Previous categories">
              ‹
            </button>
            <button className="arrow-btn" onClick={() => goToManual(page + 1)} aria-label="Next categories">
              ›
            </button>
          </div>
        </div>

        <div
          className="category-viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="category-track"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div className="category-slide" key={pageIndex}>
                {categories.slice(pageIndex * 2, pageIndex * 2 + 2).map((cat) => (
                  <Link key={cat.id} to={`/category/${cat.id}`} className="category-card">
                    <img src={cat.image} alt={cat.name} />
                    <div className="category-card-overlay" />
                    <div className="category-card-label">
                      <span>{cat.name}</span>
                      <span className="category-card-cta">Shop now →</span>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              className={`dot ${i === page ? "active" : ""}`}
              onClick={() => goToManual(i)}
              aria-label={`Go to category page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
