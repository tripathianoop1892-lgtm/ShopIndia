import mongoose from "mongoose";

const platformSettingsSchema = new mongoose.Schema(
  {
    websiteName: { type: String, default: "OmSanjeevani", trim: true },
    adminEmail: { type: String, default: "", trim: true, lowercase: true },
    contactNumber: { type: String, default: "", trim: true },
    address: { type: String, default: "", trim: true },
    platformCommission: { type: Number, default: 0, min: 0 },
    deliveryCharge: { type: Number, default: 0, min: 0 },
    gst: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("PlatformSettings", platformSettingsSchema);
