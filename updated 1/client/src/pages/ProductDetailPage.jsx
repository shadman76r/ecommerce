import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "./ProductDetailPage.css";

export default function ProductDetailPage({ products, categories }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const product = products.find((p) => String(p.id) === id);

  const category = categories.find((c) => c.name === product?.category);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <p>We couldn't find that product.</p>
          <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: 12 }}>
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section className="section product-detail-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          {category ? (
            <Link to={`/category/${category.id}`}>{product.category}</Link>
          ) : (
            <span>{product.category}</span>
          )}
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </nav>

        <button className="back-link" onClick={() => navigate(-1)}>
          ‹ Back
        </button>

        <div className="product-detail-body">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            {product.subcategory && (
              <span className="product-detail-tag">{product.subcategory}</span>
            )}
            <h1>{product.name}</h1>
            <div className="product-detail-rating">
              <span className="star">★</span> {product.rating}
              <span className="product-detail-category"> · {product.category}</span>
            </div>
            <div className="product-detail-price">${product.price.toFixed(2)}</div>

            {product.description && (
              <p className="product-detail-description">{product.description}</p>
            )}

            <div className="product-detail-actions">
              <div className="qty-stepper">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button className="btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                {justAdded ? "Added ✓" : "Add to cart"}
              </button>
            </div>

            <ul className="product-detail-meta">
              <li>🌿 Sustainably sourced materials</li>
              <li>📦 Ships in plastic-free packaging</li>
              <li>↩️ 30-day easy returns</li>
            </ul>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <div className="section-heading">
              <div>
                <h2>You might also like</h2>
                <p>More from {product.category}</p>
              </div>
            </div>
            <div className="top-selling-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
