import React from "react";
import { useCart } from "../context/CartContext";
import "./CartSidebar.css";

export default function CartSidebar() {
  const {
    items,
    totalCount,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQty
  } = useCart();

  if (totalCount === 0) return null;

  return (
    <>
      {!isCartOpen && (
        <button
          className="cart-tab"
          onClick={() => setIsCartOpen(true)}
          aria-label="Show cart"
        >
          <span className="cart-tab-count">{totalCount}</span>
          Cart
        </button>
      )}

      {isCartOpen && (
        <aside className="cart-panel" aria-label="Shopping cart">
          <div className="cart-panel-header">
            <h4>Your cart ({totalCount})</h4>
            <button
              className="cart-close"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
            >
              ×
            </button>
          </div>

          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">${item.price.toFixed(2)}</span>
                  <div className="cart-qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                </div>
                <button
                  className="cart-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-panel-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="btn-primary cart-checkout">Checkout</button>
          </div>
        </aside>
      )}
    </>
  );
}
