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

const router = express.Router();

// Add Banner
router.post("/", addBanner);

// Get All Banners
router.get("/", getAllBanners);

// Get Active Banners
router.get("/active", getActiveBanners);

// Get Banner By ID
router.get("/:id", getBannerById);

// Update Banner
router.put("/:id", updateBanner);

// Delete Banner
router.delete("/:id", deleteBanner);

export default router;


