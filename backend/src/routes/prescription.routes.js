import express from "express";
import {
  uploadPrescription,
  getCustomerPrescriptions,
  getShopkeeperPrescriptions,
  getPrescriptionById,
  updatePrescriptionStatus,
  deletePrescription,
  restorePrescription,
} from "../controllers/prescription.controller.js";

import { checkAuth } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/prescription.middleware.js";

const router = express.Router();

// =========================================
// Upload Prescription
// =========================================
router.post(
  "/upload",
  checkAuth,
  upload.single("prescription"),
  uploadPrescription
);

// =========================================
// Customer Prescription List
// =========================================
router.get(
  "/customer/:customerId",
  checkAuth,
  getCustomerPrescriptions
);

// =========================================
// Shopkeeper Prescription List
// =========================================
router.get(
  "/shopkeeper/:shopId",
  checkAuth,
  getShopkeeperPrescriptions
);

// =========================================
// Get Single Prescription
// =========================================
router.get(
  "/:id",
  checkAuth,
  getPrescriptionById
);

// =========================================
// Verify / Reject / Complete Prescription
// =========================================
router.patch(
  "/:id/status",
  checkAuth,
  updatePrescriptionStatus
);

// =========================================
// Soft Delete Prescription
// =========================================
router.delete(
  "/:id",
  checkAuth,
  deletePrescription
);

// =========================================
// Restore Deleted Prescription
// =========================================
router.patch(
  "/:id/restore",
  checkAuth,
  restorePrescription
);

export default router;