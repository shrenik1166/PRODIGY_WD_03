const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

// Health routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NexaCart API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is healthy",
  });
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Handle unknown API routes
app.use("/api/*splat", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`NexaCart server running on http://localhost:${PORT}`);
});
