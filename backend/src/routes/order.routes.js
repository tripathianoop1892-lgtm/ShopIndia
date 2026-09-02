import express from "express";
import {
  createOrder,
  getOrders,
} from "../controllers/order.controller.js";

import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 📦 CREATE ORDER (Customer / Shopkeeper)
router.post(
  "/",
  checkAuth,
  checkRole("customer", "shopkeeper"),
  createOrder
);

// 📄 GET ALL ORDERS (Logged in users)
router.get(
  "/",
  checkAuth,
  getOrders
);

// 🔄 UPDATE STATUS (ONLY DISTRIBUTOR)
export default router;
