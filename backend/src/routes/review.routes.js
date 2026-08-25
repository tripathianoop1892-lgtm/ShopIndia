import express from "express";
import { getAdminReviews, updateReviewStatus, deleteReview, submitReview, getMyReviews } from "../controllers/review.controller.js";
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Admin Only Routes
router.get("/admin", checkAuth, checkRole("admin"), getAdminReviews);
router.patch("/:id/status", checkAuth, checkRole("admin"), updateReviewStatus);
router.delete("/:id", checkAuth, checkRole("admin"), deleteReview);

// Polymorphic Review Submission (Handles both Medicines and Users)
router.post("/", checkAuth, submitReview); 

// Sellers fetching their own reviews
router.get("/me", checkAuth, checkRole("shopkeeper", "distributor"), getMyReviews);

export default router;