import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cartRoutes from "./src/routes/cart.routes.js";
// ROUTES
import authRoutes from "./src/routes/auth.routes.js";
import medicineRoutes from "./src/routes/medicine.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import earningsRoutes from "./src/routes/earnings.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

import bannerRoutes from "./src/routes/banner.routes.js";
import couponRoutes from "./src/routes/coupon.routes.js";

import prescriptionRoutes from "./src/routes/prescription.routes.js";
import supportRoutes from "./src/routes/support.routes.js";

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
app.use("/api/cart", cartRoutes);

// 💰 EARNINGS
app.use("/api/earnings", earningsRoutes);

// Admin//
app.use("/api/admin", adminRoutes);
app.use("/api/admin/coupons", couponRoutes);
app.use("/api/admin/banner", bannerRoutes);

// 📄 PRESCRIPTIONS
app.use("/api/prescriptions", prescriptionRoutes);

// 🎧 SUPPORT
app.use("/api/support", supportRoutes);

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

