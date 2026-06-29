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
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
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
    shopId: {
      type: String,
      default: null, // Populated via register for shopkeepers
    },
    // New parameters for Wholesaler B2B analytics
    rating: {
      type: Number,
      default: 4.0, 
    },
    reviewsCount: {
      type: Number,
      default: 1,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);