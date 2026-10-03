import express from "express";
import {
  getAvailableCoupons,
  validateCoupon,
} from "../controllers/coupons.controllers.js";
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(checkAuth, checkRole("customer", "shopkeeper"));
router.get("/", getAvailableCoupons);
router.post("/validate", validateCoupon);

export default router;
