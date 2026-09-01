import Prescription from "../models/Prescription.js";
import User from "../models/user.js";
import { notifyUser } from "../services/notification.service.js";
import path from "path";

// ======================================================
// Upload Prescription
// ======================================================
export const uploadPrescription = async (req, res) => {
  try {
    const { customerId, customerName, shopId } = req.body;

    if (!customerId || !customerName || !shopId) {
      return res.status(400).json({
        success: false,
        message: "Customer ID, Customer Name and Shop ID are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Prescription file is required.",
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
      status: "Pending",
    });

    const shopkeeper = await User.findOne({ shopId, role: "shopkeeper" }).select("_id");
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
    const previousStatus = prescription.status;

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
    const canAccess = req.user.role === "admin" || String(prescription.customerId) === String(req.user._id) || (req.user.role === "shopkeeper" && prescription.shopId === req.user.shopId);
    if (!canAccess) return res.status(403).json({ success: false, message: "You are not authorized to open this file." });
    return res.sendFile(path.resolve("uploads", "prescriptions", prescription.image));
  } catch {
    return res.status(500).json({ success: false, message: "Unable to open prescription file." });
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
      verifiedBy,
    } = req.body;

    const prescription = await Prescription.findById(req.params.id);

    if (!prescription || prescription.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    if (status) prescription.status = status;

    if (remarks !== undefined)
      prescription.remarks = remarks;

    if (verifiedBy)
      prescription.verifiedBy = verifiedBy;

    prescription.verifiedAt = new Date();

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
