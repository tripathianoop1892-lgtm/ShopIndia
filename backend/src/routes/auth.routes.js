import express from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  searchShops,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.get("/shops", searchShops);

export default router;