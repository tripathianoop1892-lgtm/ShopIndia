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
      default: "", // Tablet, Syrup, Capsule etc.
    },
    strength: {
      type: String,
      default: "", // e.g. 650mg
    },
    packSize: {
      type: Number,
      default: 10,
    },
    packType: {
      type: String,
      default: "Strip",
    },
    image: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    batch: {
      type: String,
      default: "",
    },
    mfd: {
      type: String, // Kept as String to perfectly match your frontend HTML inputs
      default: "",
    },
    expiry: {
      type: Date,
      required: true,
    },
    // Pricing Tiers
    mrp: {
      type: Number,
      default: 0,
    },
    price: { 
      type: Number, 
      default: 0 
    }, // General fallback fallback field
    wholesalePrice: {
      type: Number,
      default: 0, // Price the Shopkeeper pays to the Distributor
    },
    retailPrice: {
      type: Number,
      default: 0, // Price the Customer pays to the Shopkeeper
    },
    // Ownership Matrix
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerRole: {
      type: String,
      enum: ["distributor", "shopkeeper"],
      required: true,
    },
    // Bound Shop ID (Required for Shopkeeper retail stock isolation)
    shopId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Medicine", medicineSchema);