import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    receiverRole: {
      type: String,
      enum: ["customer", "shopkeeper", "distributor", "all"],
      default: "all",
    },
    status: { type: String, enum: ["Sent", "Draft"], default: "Sent" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
