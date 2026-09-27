import React from "react";
import ProductCard from "./ProductCard";
import "./TopSelling.css";

export default function TopSelling({ products }) {
  return (
    <section className="section top-selling">
      <div className="container">
        <div className="section-heading">
          <div>
            <h2>Top selling right now</h2>
            <p>The four pieces customers keep coming back for</p>
          </div>
        </div>
        <div className="top-selling-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
