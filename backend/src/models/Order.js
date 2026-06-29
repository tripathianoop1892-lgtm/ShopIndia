import mongoose from "mongoose";

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

export default mongoose.model("Order", orderSchema);