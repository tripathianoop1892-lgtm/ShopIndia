import express from "express";
<<<<<<< HEAD
import { loginUser, registerUser, forgotPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
=======
import {
  addMedicine,
  getMedicines,
  deleteMedicine,
  updateMedicine,
} from "../controllers/medicine.controller.js";

import { loginUser } from "../controllers/auth.controller.js";

import { checkAuth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/login",
  loginUser
)

// =======================
// ➕ ADD MEDICINE
// =======================
router.post(
  "/medicines",
  checkAuth,

  // 🔥 FIX
  checkRole("shopkeeper", "distributor"),

  addMedicine
);

// =======================
// 📄 GET MEDICINES
// =======================
router.get(
  "/",
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