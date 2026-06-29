import express from "express";
import {
  addMedicine,
  getMedicines,
  deleteMedicine,
  updateMedicine,
} from "../controllers/medicine.controller.js";
<<<<<<< HEAD
import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";
import User from "../models/user.js"; // Import user model securely

const router = express.Router();

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
router.post("/", checkAuth, checkRole("shopkeeper", "distributor"), addMedicine);
router.get("/medicine-list", checkAuth, getMedicines);
router.delete("/:id", checkAuth, checkRole("shopkeeper", "distributor"), deleteMedicine);
router.put("/:id", checkAuth, checkRole("shopkeeper", "distributor"), updateMedicine);
=======

import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// =======================
// ➕ ADD MEDICINE
// =======================
router.post(
  "/",
  checkAuth,

  // 🔥 FIX
  checkRole("shopkeeper", "distributor"),

  addMedicine
);

// =======================
// 📄 GET MEDICINES
// =======================
router.get(
  "/medicine-list",
  checkAuth,
  getMedicines
);

// =======================
// ❌ DELETE
// =======================
router.delete(
  "/:id",
  checkAuth,

  // 🔥 FIX
  checkRole("shopkeeper", "distributor"),

  deleteMedicine
);

// =======================
// ✏️ UPDATE
// =======================
router.put(
  "/:id",
  checkAuth,

  // 🔥 FIX
  checkRole("shopkeeper", "distributor"),

  updateMedicine
);
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

export default router;