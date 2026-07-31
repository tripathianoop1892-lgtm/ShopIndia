const express = require("express");
const router = express.Router();

const {
  addBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  getActiveBanners,
} = require("../controllers/banner.controller");

// ==========================
// Banner Routes
// ==========================

// Add Banner
router.post("/", addBanner);

// Get All Banners (Admin)
router.get("/", getAllBanners);

// Get Active Banners (Customer)
router.get("/active", getActiveBanners);

// Get Banner By ID
router.get("/:id", getBannerById);

// Update Banner
router.put("/:id", updateBanner);

// Delete Banner
router.delete("/:id", deleteBanner);

module.exports = router;