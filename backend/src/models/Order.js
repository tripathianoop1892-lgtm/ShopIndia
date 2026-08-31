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
    subtotal: {
    type: Number,
    required: true,
    },

   deliveryCharge: {
   type: Number,
   required: true,
   },

   platformFee: {
   type: Number,
   required: true,
   },
    couponCode:{
      type: String,
      default:"",

    },
    discountAmount:{
      type: Number,
      required:true,
    },
    finalAmount:{
      type: Number,
      default:0,
    },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    paymentMethod: { type: String, default: "Razorpay" },
    paymentId: { type: String, default: "" },

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
