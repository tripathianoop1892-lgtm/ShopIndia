<<<<<<< HEAD
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

=======
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cartRoutes from "./src/routes/cart.routes.js";
// ROUTES
import authRoutes from "./src/routes/auth.routes.js";
import medicineRoutes from "./src/routes/medicine.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
<<<<<<< HEAD
import earningsRoutes from "./src/routes/earnings.routes.js";
=======
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec


// CONFIG
import connectDB from "./src/config/db.js";

dotenv.config();

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// =======================
// DATABASE
// =======================
connectDB();

// =======================
// ROUTES
// =======================

// 🔐 AUTH (FINAL FIX)
app.use("/api/auth", authRoutes);

// 💊 MEDICINES
app.use("/api/medicines", medicineRoutes);

// 📦 ORDERS
app.use("/api/orders", orderRoutes);

// 🛒 CART
<<<<<<< HEAD
app.use("/api/cart", cartRoutes);

// 💰 EARNINGS
app.use("/api/earnings", earningsRoutes);
=======
app.use("/cart", cartRoutes);
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
