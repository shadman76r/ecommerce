const express = require("express");
const router = express.Router();
const { products, categories, comments } = require("../data/products");

// GET /api/products - all products, optional ?category= and ?subcategory= filters
router.get("/products", (req, res) => {
  const { category, subcategory } = req.query;
  let result = products;
  if (category) {
    result = result.filter((p) => p.category === category);
  }
  if (subcategory) {
    result = result.filter((p) => p.subcategory === subcategory);
  }
  res.json(result);
});

// GET /api/products/top-selling - the four top sellers
router.get("/products/top-selling", (req, res) => {
  res.json(products.filter((p) => p.topSeller).slice(0, 4));
});

// GET /api/products/:id
router.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// GET /api/categories
router.get("/categories", (req, res) => {
  res.json(categories);
});

// GET /api/comments
router.get("/comments", (req, res) => {
  res.json(comments);
});

module.exports = router;
