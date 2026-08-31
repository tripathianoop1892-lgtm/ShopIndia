import mongoose from "mongoose";

const paymentIntentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  razorpayOrderId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true, min: 1 },
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["created", "paid", "consumed"], default: "created" },
  razorpayPaymentId: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("PaymentIntent", paymentIntentSchema);
