import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    receiverRole: {
      type: String,
      enum: ["customer", "shopkeeper", "distributor", "all", "individual"],
      default: "all",
    },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    status: { type: String, enum: ["Sent", "Draft"], default: "Sent" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
