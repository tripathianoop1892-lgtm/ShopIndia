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
<<<<<<< HEAD
  checkRole("distributor", "shopkeeper"),
=======
  checkRole("distributor"),
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  updateOrderStatus
);

export default router;