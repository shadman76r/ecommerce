import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-mark">G</span>
            <span className="logo-name">GreenMart</span>
          </div>
          <p>Thoughtfully made goods for home, kitchen and office.</p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <a href="#top">Home &amp; Living</a>
          <a href="#top">Kitchen</a>
          <a href="#top">Office</a>
          <a href="#top">Garden</a>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <a href="#top">Shipping &amp; returns</a>
          <a href="#top">Track an order</a>
          <a href="#top">Contact us</a>
          <a href="#top">FAQ</a>
        </div>

        <div className="footer-col">
          <h4>Stay in touch</h4>
          <p className="footer-sub">Get new arrivals and offers in your inbox.</p>
          <form className="footer-signup" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" aria-label="Email address" />
            <button type="submit" className="btn-primary">Join</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          © {new Date().getFullYear()} GreenMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
