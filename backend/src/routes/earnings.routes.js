import express from "express";
import { getEarnings } from "../controllers/earnings.controller.js";
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 💰 GET EARNINGS (Distributor only)
router.get(
  "/",
  checkAuth,
  checkRole("distributor"),
  getEarnings
);

export default router;
