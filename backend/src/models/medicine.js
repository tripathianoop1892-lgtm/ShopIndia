import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      required: true,
    },

    batch: {
      type: String,
      default: "",
    },

    mfd: {
      type: String,
      default: "",
    },

    expiry: {
      type: Date,
      required: false,
       default: new Date("2027-12-31"),
    },

    // 🔥 OWNER INFO
    ownerId: {
      type: String,
    },

    ownerRole: {
      type: String,
    },

    // 🔥 SHOP ID
    shopId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Medicine", medicineSchema);