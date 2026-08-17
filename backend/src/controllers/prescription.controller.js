import Prescription from "../models/Prescription.js";

// ======================================================
// Upload Prescription
// ======================================================
export const uploadPrescription = async (req, res) => {
  try {
    

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
    const customerId = req.user._id;
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