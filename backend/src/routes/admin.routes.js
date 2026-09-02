import express from "express";
import {
  getCustomers,
  getDistributors,
  getMedicine,
  getOrders,
  getShopkeeper,
  getCategorySummary,
  getDashboardReport,
  getSalesReport,
  createManagedUser,
  updateManagedUser,
  deleteManagedUser,
  getPlatformSettings,
  getPublicPlatformSettings,
  updatePlatformSettings,
} from "../controllers/admin.controller.js";

import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Admin Routes
router.get("/customers", checkAuth, checkRole("admin"), getCustomers);
router.get("/shopkeepers", checkAuth, checkRole("admin"), getShopkeeper);
router.get("/distributors", checkAuth, checkRole("admin"), getDistributors);
router.get("/medicines", checkAuth, checkRole("admin"), getMedicine);
router.get("/orders", checkAuth, checkRole("admin"), getOrders);
router.get("/categories", checkAuth, checkRole("admin"), getCategorySummary);
router.get("/reports/dashboard", checkAuth, checkRole("admin"), getDashboardReport);
router.get("/reports/sales", checkAuth, checkRole("admin"), getSalesReport);
router.post("/users", checkAuth, checkRole("admin"), createManagedUser);
router.patch("/users/:id", checkAuth, checkRole("admin"), updateManagedUser);
router.delete("/users/:id", checkAuth, checkRole("admin"), deleteManagedUser);
router.get("/platform-settings", getPublicPlatformSettings);
router.get("/settings", checkAuth, checkRole("admin"), getPlatformSettings);
router.put("/settings", checkAuth, checkRole("admin"), updatePlatformSettings);

export default router;
