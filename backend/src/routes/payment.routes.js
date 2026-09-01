import express from "express";
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../controllers/payment.controller.js";

const router = express.Router();
router.post("/razorpay/order", checkAuth, checkRole("customer", "shopkeeper"), createRazorpayOrder);
router.post("/razorpay/verify", checkAuth, checkRole("customer", "shopkeeper"), verifyRazorpayPayment);
export default router;
