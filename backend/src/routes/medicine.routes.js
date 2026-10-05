import express from "express";
import {
  addMedicine,
  getMedicines,
  deleteMedicine,
  updateMedicine,
} from "../controllers/medicine.controller.js";
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";
import { uploadMedicineImage } from "../middlewares/medicine-image.middleware.js";
import { medicineImageDirectory } from "../services/medicine-image.service.js";
import User from "../models/user.js"; // Import user model securely
import Review from "../models/review.js";

const router = express.Router();

router.use(
  "/images",
  express.static(medicineImageDirectory, {
    dotfiles: "deny",
    index: false,
    maxAge: "7d",
  })
);

// 👉 New Wholesaler Registry Filter Route (Placed BEFORE parameterized routes like /:id)
router.get("/distributors", checkAuth, async (req, res) => {
  try {
    const distributors = await User.find({ role: "distributor", status: "Active" })
      .select("name companyName email role")
      .lean();
    const reviewStats = await Review.aggregate([
      { $match: { targetModel: "User", status: "Approved", targetId: { $in: distributors.map((item) => item._id) } } },
      { $group: { _id: "$targetId", rating: { $avg: "$rating" }, reviewsCount: { $sum: 1 } } },
    ]);
    const statsById = new Map(reviewStats.map((item) => [String(item._id), item]));
    const response = distributors.map((item) => {
      const stats = statsById.get(String(item._id));
      return {
        ...item,
        rating: stats ? Number(stats.rating.toFixed(1)) : 0,
        reviewsCount: stats?.reviewsCount || 0,
      };
    }).sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
    return res.json(response);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching distributors ❌" });
  }
});

// Base CRUD mappings
router.post(
  "/",
  checkAuth,
  checkRole("shopkeeper", "distributor"),
  uploadMedicineImage,
  addMedicine
);
router.get("/medicine-list", checkAuth, getMedicines);
router.delete("/:id", checkAuth, checkRole("shopkeeper", "distributor"), deleteMedicine);
router.put(
  "/:id",
  checkAuth,
  checkRole("shopkeeper", "distributor"),
  uploadMedicineImage,
  updateMedicine
);

export default router;
