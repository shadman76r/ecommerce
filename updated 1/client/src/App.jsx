import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import AllProductsPage from "./pages/AllProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import {
  fallbackProducts,
  fallbackCategories,
  fallbackComments
} from "./data/products";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function App() {
  const [products, setProducts] = useState(fallbackProducts);
  const [categories, setCategories] = useState(fallbackCategories);
  const [comments, setComments] = useState(fallbackComments);
  const [search, setSearch] = useState("");

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setProducts)
      .catch(() => setProducts(fallbackProducts));

    fetch(`${API_BASE}/categories`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setCategories)
      .catch(() => setCategories(fallbackCategories));

    fetch(`${API_BASE}/comments`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setComments)
      .catch(() => setComments(fallbackComments));
  }, []);

  return (
    <CartProvider>
      <div id="top">
        <Header search={search} setSearch={setSearch} products={products} />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                products={products}
                categories={categories}
                comments={comments}
              />
            }
          />
          <Route
            path="/category/:categoryId"
            element={<CategoryPage products={products} categories={categories} />}
          />
          <Route
            path="/products"
            element={<AllProductsPage products={products} categories={categories} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetailPage products={products} categories={categories} />}
          />
        </Routes>

        <Footer />
        <CartSidebar />
      </div>
    </CartProvider>
  );
}
