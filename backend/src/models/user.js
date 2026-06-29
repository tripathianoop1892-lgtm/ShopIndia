import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
<<<<<<< HEAD
=======

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
<<<<<<< HEAD
=======

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
<<<<<<< HEAD
=======

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    role: {
      type: String,
      enum: ["customer", "shopkeeper", "distributor", "admin"],
      default: "customer",
    },
<<<<<<< HEAD
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
=======

    // 🔥 SHOP ID SYSTEM
    shopId: {
      type: String,
      default: null,
    },
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);