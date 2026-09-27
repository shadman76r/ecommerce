import React, { useState, useEffect, useRef, useCallback } from "react";
import "./HeroCarousel.css";

const AUTO_ROTATE_MS = 4000;

// Plain auto-rotating picture carousel — images are display-only,
// not links/buttons.
export default function HeroCarousel({ categories }) {
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = categories.length;
  const timerRef = useRef(null);

  const goTo = useCallback(
    (i) => setSlide((i + slideCount) % slideCount),
    [slideCount]
  );

  useEffect(() => {
    if (slideCount <= 1 || isPaused) return undefined;

    timerRef.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % slideCount);
    }, AUTO_ROTATE_MS);

    return () => clearInterval(timerRef.current);
  }, [slideCount, isPaused, slide]);

  if (slideCount === 0) return null;

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-viewport">
        <div
          className="hero-track"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {categories.map((cat) => (
            <div className="hero-slide" key={cat.id}>
              <img src={cat.image} alt={cat.name} />
            </div>
          ))}
        </div>

        {slideCount > 1 && (
          <>
            <button
              className="hero-arrow hero-arrow-prev"
              onClick={() => goTo(slide - 1)}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              className="hero-arrow hero-arrow-next"
              onClick={() => goTo(slide + 1)}
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}
      </div>

      {slideCount > 1 && (
        <div className="hero-dots">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              className={`dot ${i === slide ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
