import Medicine from "../models/medicine.js";
import User from "../models/user.js";

export const getHomepageStats = async (_req, res) => {
  try {
    const now = new Date();
    const [activeMedicines, activeDistributors, activeShopkeepers] = await Promise.all([
      Medicine.countDocuments({ stock: { $gt: 0 }, expiry: { $gte: now } }),
      User.countDocuments({ role: "distributor", status: "Active" }),
      User.countDocuments({ role: "shopkeeper", status: "Active" }),
    ]);

    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    return res.json({
      success: true,
      data: { activeMedicines, activeDistributors, activeShopkeepers },
    });
  } catch (error) {
    console.error("Homepage stats error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to load homepage statistics.",
    });
  }
};
