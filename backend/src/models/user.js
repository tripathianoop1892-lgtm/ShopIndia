import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    // 📱 Mobile Number
    mobile: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "shopkeeper", "distributor", "admin"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    shopId: {
      type: String,
      default: null, // Populated via register for shopkeepers
    },
    selectedShopId: {
  type: String,
  default: null,
      },
    // 🏪 Shop Name
    shopName: {
  type: String,
  trim: true,
  default: "",
},
    companyName: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    warehouseAddress: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    district: { type: String, trim: true, default: "" },
    state: { type: String, trim: true, default: "" },
    pincode: { type: String, trim: true, default: "" },
    // New parameters for Wholesaler B2B analytics
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    settings: {
      emailAlerts: { type: Boolean, default: true },
      orderUpdates: { type: Boolean, default: true },
      lowStockWarning: { type: Boolean, default: true },
      autoRefreshCatalog: { type: Boolean, default: true },
      defaultMarkup: { type: Number, default: 15 },
      minimumB2BOrder: { type: Number, default: 1500 },
      autoApproveReorders: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
