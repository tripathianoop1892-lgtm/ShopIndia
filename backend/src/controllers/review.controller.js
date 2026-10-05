import Order from "../models/Order.js";
import Review from "../models/review.js";
import Medicine from "../models/medicine.js";
import User from "../models/user.js";
import mongoose from "mongoose";

const recalculateReviewSummary = async (targetId, targetModel) => {
  const stats = await Review.aggregate([
    {
      $match: {
        targetId: new mongoose.Types.ObjectId(targetId),
        targetModel,
        status: "Approved",
      },
    },
    {
      $group: {
        _id: "$targetId",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  const rating = stats.length ? Number(stats[0].avgRating.toFixed(1)) : 0;
  const reviewsCount = stats.length ? stats[0].count : 0;
  const Target = targetModel === "Medicine" ? Medicine : User;
  await Target.findByIdAndUpdate(targetId, { rating, reviewsCount });
};

// Get all reviews for the Admin Panel
export const getAdminReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("reviewerId", "name role")
      .populate("targetId", "name companyName")
      .sort({ createdAt: -1 });
      
    return res.json({ success: true, data: reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};

// Update review status (Approve/Reject)
export const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid review status" });
    }
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    await recalculateReviewSummary(review.targetId, review.targetModel);
    return res.json({ success: true, message: `Review ${status}`, data: review });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Status update failed" });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    await recalculateReviewSummary(review.targetId, review.targetModel);
    return res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Deletion failed" });
  }
};

// ==========================================
// 1. Submit Review & Recalculate Averages
// ==========================================
export const submitReview = async (req, res) => {
  try {
    const { targetId, targetModel, rating, reviewText } = req.body;
    const reviewerId = req.user._id;

    if (!mongoose.isValidObjectId(targetId) || !["Medicine", "User"].includes(targetModel) || !Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5 || !reviewText?.trim()) {
      return res.status(400).json({ success: false, message: "Provide a valid review target, rating, and comment." });
    }

    // Prevent duplicate reviews from the same user for the same target
    const existingReview = await Review.findOne({ reviewerId, targetId });
    if (existingReview) {
      return res.status(400).json({ success: false, message: "You have already reviewed this item." });
    }

    // Save the review
    await Review.create({
      reviewerId,
      targetId,
      targetModel,
      rating: Number(rating),
      reviewText: reviewText.trim(),
    });

    return res.status(201).json({ success: true, message: "Review submitted for moderation." });
  } catch (error) {
    console.error("REVIEW SUBMIT ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to submit review." });
  }
};

// ==========================================
// 2. Fetch Entity's Received Reviews
// ==========================================
export const getMyReviews = async (req, res) => {
  try {
    const userId = req.user._id;
    // Find all reviews where the logged-in user is the target
    const reviews = await Review.find({ targetId: userId })
      .populate("reviewerId", "name role")
      .sort({ createdAt: -1 });

    console.log("Fetched Reviews for User:", userId, reviews.length);

    return res.json({ success: true, data: reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch reviews." });
  }
};
