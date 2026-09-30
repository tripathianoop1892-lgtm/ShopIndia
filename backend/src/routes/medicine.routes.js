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
    const distributors = await User.find({ role: "distributor" })
      .select("name email rating reviewsCount")
      .sort({ rating: -1 }); 
    return res.json(distributors);
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
