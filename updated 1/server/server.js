const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("GreenMart API is running.");
});

app.listen(PORT, () => {
  console.log(`GreenMart server listening on port ${PORT}`);
});
