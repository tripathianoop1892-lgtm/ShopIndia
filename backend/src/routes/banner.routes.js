//const express = require("express"); //
//const router = express.Router();    //
import express from "express";

import {
  addBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  getActiveBanners,
} from "../controllers/banner.controller.js";
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add Banner
router.post("/", checkAuth, checkRole("admin"), addBanner);

// Get All Banners
router.get("/", checkAuth, checkRole("admin"), getAllBanners);

// Get Active Banners
router.get("/active", getActiveBanners);

// Get Banner By ID
router.get("/:id", checkAuth, checkRole("admin"), getBannerById);

// Update Banner
router.put("/:id", checkAuth, checkRole("admin"), updateBanner);

// Delete Banner
router.delete("/:id", checkAuth, checkRole("admin"), deleteBanner);

export default router;

