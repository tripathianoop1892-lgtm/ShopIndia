import "dotenv/config";

import express from "express";
import cors from "cors";

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
import reviewRoutes from "./src/routes/review.routes.js"
import notificationRoutes from "./src/routes/notification.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import publicRoutes from "./src/routes/public.routes.js";
// CONFIG
import connectDB from "./src/config/db.js";



const app = express();

// Respect the original HTTPS protocol when deployed behind a reverse proxy.
app.set("trust proxy", 1);

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

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
app.use("/api/admin/notifications", notificationRoutes);
app.use("/api/payments", paymentRoutes);

// 📄 PRESCRIPTIONS
app.use("/api/prescriptions", prescriptionRoutes);

// 🎧 SUPPORT
app.use("/api/support", supportRoutes);

app.use("/api/reviews",reviewRoutes)
app.use("/api/public", publicRoutes);

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
  }
};

startServer();
