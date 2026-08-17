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

// ======================================================
// Upload Prescription
// POST /api/prescriptions/upload
// ======================================================

router.post(
  "/upload",
  checkAuth,
  upload.single("prescription"),
  uploadPrescription
);

// ======================================================
// Customer Prescription List
// GET /api/prescriptions/customer
// ======================================================

router.get(
  "/customer",
  checkAuth,
  getCustomerPrescriptions
);

// ======================================================
// Shopkeeper Prescription List
// GET /api/prescriptions/shopkeeper/:shopId
// ======================================================

router.get(
  "/shopkeeper/:shopId",
  checkAuth,
  getShopkeeperPrescriptions
);

// ======================================================
// Get Single Prescription
// GET /api/prescriptions/:id
// ======================================================

router.get(
  "/:id",
  checkAuth,
  getPrescriptionById
);

// ======================================================
// Verify / Reject / Complete Prescription
// PATCH /api/prescriptions/:id/status
// ======================================================

router.patch(
  "/:id/status",
  checkAuth,
  updatePrescriptionStatus
);

// ======================================================
// Soft Delete Prescription
// DELETE /api/prescriptions/:id
// ======================================================

router.delete(
  "/:id",
  checkAuth,
  deletePrescription
);

// ======================================================
// Restore Deleted Prescription
// PATCH /api/prescriptions/:id/restore
// ======================================================

router.patch(
  "/:id/restore",
  checkAuth,
  restorePrescription
);

export default router;