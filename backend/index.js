import "dotenv/config";

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import mongoose from "mongoose";

import cartRoutes from "./src/routes/cart.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import medicineRoutes from "./src/routes/medicine.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import earningsRoutes from "./src/routes/earnings.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import bannerRoutes from "./src/routes/banner.routes.js";
import couponRoutes from "./src/routes/coupon.routes.js";
import prescriptionRoutes from "./src/routes/prescription.routes.js";
import supportRoutes from "./src/routes/support.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import publicRoutes from "./src/routes/public.routes.js";
import connectDB from "./src/config/db.js";
import {
  getAllowedOrigins,
  validateEnvironment,
} from "./src/config/env.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

const allowedOrigins = getAllowedOrigins();
const corsOptions = {
  origin(origin, callback) {
    const normalizedOrigin = origin?.replace(/\/$/, "");
    if (!origin || allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    const error = new Error("Origin is not allowed by CORS.");
    error.statusCode = 403;
    return callback(error);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"],
  maxAge: 86400,
};

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors(corsOptions));
app.use(express.json({ limit: "100kb" }));

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    const startedAt = Date.now();
    res.on("finish", () => {
      console.log(
        JSON.stringify({
          type: "http_request",
          method: req.method,
          path: req.originalUrl.split("?")[0],
          status: res.statusCode,
          durationMs: Date.now() - startedAt,
        })
      );
    });
    next();
  });
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});

const authenticationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many authentication attempts. Please try again later." },
});

const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many verification requests. Please wait before trying again." },
});

app.get("/api/health/live", (req, res) => {
  res.json({ success: true, status: "live" });
});

app.get("/api/health/ready", (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({
    success: ready,
    status: ready ? "ready" : "not-ready",
  });
});

app.use("/api", apiLimiter);
app.use("/api/auth/login", authenticationLimiter);
app.use("/api/auth/forgot-password", authenticationLimiter);
app.use("/api/auth/register/request-otp", otpLimiter);
app.use("/api/support/public", authenticationLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/earnings", earningsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/coupons", couponRoutes);
app.use("/api/admin/banner", bannerRoutes);
app.use("/api/admin/notifications", notificationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/public", publicRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found." });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  const status = error.statusCode || error.status || 500;
  if (status >= 500) console.error("UNHANDLED REQUEST ERROR:", error);

  return res.status(status).json({
    success: false,
    message: status >= 500 ? "Internal server error." : error.message,
  });
});

let server;

export const startServer = async () => {
  validateEnvironment();
  await connectDB();

  const port = Number(process.env.PORT || 5000);
  const host = process.env.HOST || "127.0.0.1";

  await new Promise((resolve, reject) => {
    server = app.listen(port, host, resolve);
    server.once("error", reject);
  });

  console.log(`Server running on http://${host}:${port}`);
  return server;
};

const shutdown = async (signal) => {
  console.log(`${signal} received; shutting down.`);
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await mongoose.disconnect();
};

const isMainModule =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  startServer().catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
  });

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.once(signal, () => {
      shutdown(signal)
        .then(() => process.exit(0))
        .catch((error) => {
          console.error("Graceful shutdown failed:", error);
          process.exit(1);
        });
    });
  }
}

export { app };
