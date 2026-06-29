import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
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
router.put(
  "/:id",
  checkAuth,
  checkRole("distributor", "shopkeeper"),
  updateOrderStatus
);

export default router;