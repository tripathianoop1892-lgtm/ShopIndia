import express from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  searchShops,
  updateProfile,
  requestRegistrationOtp,
  getAccountSettings,
  updateAccountSettings,
} from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/register/request-otp", requestRegistrationOtp);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.get("/shops", searchShops);
router.put("/profile", checkAuth, updateProfile);
router.get("/settings", checkAuth, getAccountSettings);
router.put("/settings", checkAuth, updateAccountSettings);
export default router;
