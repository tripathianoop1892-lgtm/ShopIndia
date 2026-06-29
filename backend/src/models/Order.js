import mongoose from "mongoose";

<<<<<<< HEAD
const orderSchema = new mongoose.Schema(
  {
    orderType: {
      type: String,
      enum: ["B2B", "B2C"], // B2B = Shopkeeper buying from Distributor; B2C = Customer buying from Shopkeeper
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shopkeeperName: {
      type: String,
      default: "",
    },
    customerName: {
      type: String,
      default: "",
    },
    shopId: {
      type: String,
      default: null, // Used to capture context for B2C scoping
    },
    items: [
      {
        medicineId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // Captured snapshot cost at checkout
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
=======
const orderSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
  },

  name: String, // medicine name

  quantity: Number,

  price: Number,

  shopkeeperName: String, // 🔥 ye important hai (frontend me use ho raha hai)

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

export default mongoose.model("Order", orderSchema);