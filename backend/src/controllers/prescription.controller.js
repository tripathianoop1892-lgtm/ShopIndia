import Prescription from "../models/prescription.js";
import User from "../models/user.js";
import { notifyUser } from "../services/notification.service.js";
import { readPrescriptionWithAI } from "../services/prescription-ai.service.js";
import fs from "fs";
import path from "path";

const prescriptionFilePath = (filename) =>
  path.resolve("uploads", "prescriptions", filename);

const removeUploadedFile = async (file) => {
  if (!file?.filename) return;

  try {
    await fs.promises.unlink(prescriptionFilePath(file.filename));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn("Unable to remove uploaded prescription:", error.message);
    }
  }
};

const hasValidFileSignature = async (file) => {
  const handle = await fs.promises.open(file.path, "r");

  try {
    const buffer = Buffer.alloc(8);
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
    const signature = buffer.subarray(0, bytesRead);

    if (file.mimetype === "image/jpeg") {
      return signature.length >= 3 &&
        signature[0] === 0xff &&
        signature[1] === 0xd8 &&
        signature[2] === 0xff;
    }

    if (file.mimetype === "image/png") {
      return signature.length >= 8 &&
        signature.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    }

    if (file.mimetype === "application/pdf") {
      return signature.subarray(0, 5).toString("ascii") === "%PDF-";
    }

    return false;
  } finally {
    await handle.close();
  }
};

const canAccessPrescription = (user, prescription) => {
  if (user.role === "admin") return true;

  if (user.role === "customer") {
    return String(prescription.customerId) === String(user._id);
  }

  return user.role === "shopkeeper" &&
    String(prescription.shopId) === String(user.shopId);
};

const inferMimeType = (prescription) => {
  if (prescription.mimeType) return prescription.mimeType;
  if (prescription.fileType === "pdf") return "application/pdf";
  return path.extname(prescription.image).toLowerCase() === ".png"
    ? "image/png"
    : "image/jpeg";
};


// ======================================================
// Upload Prescription
// ======================================================
export const uploadPrescription = async (req, res) => {
  try {
    const customerId = req.user._id;
    const customerName = req.user.name;
    const shopId = req.user.shopId;

    if (!customerId || !customerName || !shopId) {
      await removeUploadedFile(req.file);
      return res.status(400).json({
        success: false,
        message: "Your account must be connected to a medical shop before uploading.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Prescription file is required.",
      });
    }

    if (!(await hasValidFileSignature(req.file))) {
      await removeUploadedFile(req.file);
      return res.status(400).json({
        success: false,
        message: "The uploaded file is not a valid JPG, PNG, or PDF prescription.",
      });
    }

    const shopkeeper = await User.findOne({ shopId, role: "shopkeeper" }).select("_id");

    if (!shopkeeper) {
      await removeUploadedFile(req.file);
      return res.status(400).json({
        success: false,
        message: "The selected medical shop is unavailable.",
      });
    }

    const fileType =
      req.file.mimetype === "application/pdf" ? "pdf" : "image";

    const prescription = await Prescription.create({
      customerId,
      customerName,
      shopId,
      image: req.file.filename,
      fileType,
      mimeType: req.file.mimetype,
      status: "Pending",
    });

    await notifyUser({
      recipientId: shopkeeper?._id,
      title: "New prescription uploaded",
      message: `${customerName} uploaded a prescription for review.`,
    });

    return res.status(201).json({
      success: true,
      message: "Prescription uploaded successfully.",
      prescription,
    });

  } catch (error) {
    console.error("Upload Prescription Error:", error);
    await removeUploadedFile(req.file);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================================
// Get Customer Prescriptions
// ======================================================
export const getCustomerPrescriptions = async (req, res) => {
  try {
    if (req.user.role !== "admin" && String(req.user._id) !== req.params.customerId) {
      return res.status(403).json({ success: false, message: "You are not authorized to view these prescriptions." });
    }
    const prescriptions = await Prescription.find({
      customerId: req.params.customerId,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================================
// Get Shopkeeper Prescriptions
// ======================================================
export const getShopkeeperPrescriptions = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";
    const isAssignedShopkeeper = req.user.role === "shopkeeper" &&
      String(req.user.shopId) === String(req.params.shopId);

    if (!isAdmin && !isAssignedShopkeeper) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view these prescriptions.",
      });
    }

    const prescriptions = await Prescription.find({
      shopId: req.params.shopId,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================================
// Get Single Prescription
// ======================================================
export const getPrescriptionById = async (req, res) => {
  try {

    const prescription = await Prescription.findById(req.params.id);

    if (!prescription || prescription.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    if (!canAccessPrescription(req.user, prescription)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this prescription.",
      });
    }

    return res.status(200).json({
      success: true,
      prescription,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPrescriptionFile = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription || prescription.isDeleted) return res.status(404).json({ success: false, message: "Prescription not found." });
    if (!canAccessPrescription(req.user, prescription)) return res.status(403).json({ success: false, message: "You are not authorized to open this file." });
    return res.sendFile(prescriptionFilePath(prescription.image));
  } catch {
    return res.status(500).json({ success: false, message: "Unable to open prescription file." });
  }
};

// ======================================================
// Read Prescription using AI
// POST /api/prescriptions/:id/read
// ======================================================
export const readPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription || prescription.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    // ==================================================
    // Authorization
    // ==================================================
    if (!canAccessPrescription(req.user, prescription)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to read this prescription.",
      });
    }

    // ==================================================
    // Prescription file path
    // ==================================================
    if (!prescription.image) {
      return res.status(400).json({
        success: false,
        message: "Prescription file is missing.",
      });
    }

    if (prescription.extracted && req.query.force !== "true") {
      return res.status(200).json({
        success: true,
        message: "Prescription read successfully.",
        extracted: prescription.extracted,
        cached: true,
      });
    }

    const filePath = prescriptionFilePath(prescription.image);

    // ==================================================
    // MIME type
    // ==================================================
    const mimeType = inferMimeType(prescription);

    // ==================================================
    // AI Reading
    // ==================================================
    const extracted = await readPrescriptionWithAI({
      filePath,
      mimeType,
    });

    prescription.extracted = extracted;
    prescription.readAt = new Date();
    await prescription.save();

    return res.status(200).json({
      success: true,
      message: "Prescription read successfully.",
      extracted,
    });
  } catch (error) {
    console.error("Read Prescription Error:", error);

    const isConfigurationError =
      error.message === "GEMINI_API_KEY is not configured.";

    return res.status(isConfigurationError ? 503 : 500).json({
      success: false,
      message: isConfigurationError
        ? "Prescription reading is temporarily unavailable."
        : "Prescription could not be read. Please check the original prescription.",
    });
  }
};

// ======================================================
// Verify / Reject / Complete Prescription
// ======================================================
export const updatePrescriptionStatus = async (req, res) => {
  try {

    const {
      status,
      remarks,
    } = req.body;

    const allowedStatuses = ["Pending", "Verified", "Rejected", "Completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "A valid prescription status is required.",
      });
    }

    const prescription = await Prescription.findById(req.params.id);

    if (!prescription || prescription.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    const canUpdate = req.user.role === "admin" ||
      (req.user.role === "shopkeeper" &&
        String(prescription.shopId) === String(req.user.shopId));

    if (!canUpdate) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this prescription.",
      });
    }

    const previousStatus = prescription.status;
    prescription.status = status;

    if (remarks !== undefined)
      prescription.remarks = remarks;

    prescription.verifiedBy = req.user._id;
    prescription.verifiedAt = status === "Pending" ? null : new Date();

    await prescription.save();

    if (status && status !== previousStatus) {
      await notifyUser({
        recipientId: prescription.customerId,
        title: "Prescription status updated",
        message: `Your prescription is now ${prescription.status}.${prescription.remarks ? ` Note: ${prescription.remarks}` : ""}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Prescription updated successfully.",
      prescription,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================================
// Soft Delete Prescription
// ======================================================
export const deletePrescription = async (req, res) => {
  try {

    const prescription = await Prescription.findById(req.params.id);

    if (!prescription || prescription.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    const canDelete = req.user.role === "admin" ||
      (req.user.role === "customer" &&
        String(prescription.customerId) === String(req.user._id));

    if (!canDelete) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this prescription.",
      });
    }

    prescription.isDeleted = true;

    await prescription.save();

    return res.status(200).json({
      success: true,
      message: "Prescription deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================================
// Restore Deleted Prescription (Optional)
// ======================================================
export const restorePrescription = async (req, res) => {
  try {

    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    const canRestore = req.user.role === "admin" ||
      (req.user.role === "customer" &&
        String(prescription.customerId) === String(req.user._id));

    if (!canRestore) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to restore this prescription.",
      });
    }

    prescription.isDeleted = false;

    await prescription.save();

    return res.status(200).json({
      success: true,
      message: "Prescription restored successfully.",
      prescription,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
