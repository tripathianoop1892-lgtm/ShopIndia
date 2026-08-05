import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    // Customer Information
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    // Shop Information
    shopId: {
      type: String,
      required: true,
      trim: true,
    },

    // Prescription File
    image: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["image", "pdf"],
      default: "image",
    },

    // Prescription Status
    status: {
      type: String,
      enum: ["Pending", "Verified", "Rejected", "Completed"],
      default: "Pending",
    },

    // Shopkeeper Remarks
    remarks: {
      type: String,
      default: "",
      trim: true,
    },

    // Verification Details
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    // Soft Delete
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;