import mongoose from "mongoose";

const otpVerificationSchema = new mongoose.Schema({
  contact: { type: String, required: true, index: true },
  channel: { type: String, enum: ["email", "mobile"], required: true },
  purpose: { type: String, enum: ["registration", "password-reset"], default: "registration", required: true },
  codeHash: { type: String, required: true },
  attempts: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
}, { timestamps: true });

export default mongoose.model("OtpVerification", otpVerificationSchema);
