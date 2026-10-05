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

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getPublicCatalog = async (req, res) => {
  try {
    const now = new Date();
    const search = String(req.query.q || "").trim().slice(0, 80);
    const searchFilter = search
      ? {
          $or: ["name", "company", "type", "strength"].map((field) => ({
            [field]: { $regex: escapeRegex(search), $options: "i" },
          })),
        }
      : {};

    const medicines = await Medicine.find({
      $and: [
        {
          ownerRole: "shopkeeper",
          stock: { $gt: 0 },
          expiry: { $gte: now },
        },
        { $or: [{ retailPrice: { $gt: 0 } }, { price: { $gt: 0 } }, { mrp: { $gt: 0 } }] },
        ...(search ? [searchFilter] : []),
      ],
    })
      .select("name company type strength packSize packType image mrp price retailPrice sellingUnit ownerId")
      .populate({ path: "ownerId", select: "name shopName status", match: { status: "Active" } })
      .sort({ name: 1 })
      .limit(100)
      .lean();

    const catalog = medicines
      .filter((medicine) => medicine.ownerId && (medicine.ownerId.shopName?.trim() || medicine.ownerId.name?.trim()))
      .map((medicine) => ({
        id: medicine._id,
        name: medicine.name,
        company: medicine.company,
        type: medicine.type,
        strength: medicine.strength,
        packSize: medicine.packSize,
        packType: medicine.packType,
        sellingUnit: medicine.sellingUnit,
        image: medicine.image,
        mrp: Number(medicine.mrp || 0),
        price: Number(medicine.retailPrice || medicine.price || medicine.mrp || 0),
        currency: "INR",
        sellerName: medicine.ownerId.shopName?.trim() || medicine.ownerId.name.trim(),
      }));

    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    return res.json({ success: true, data: catalog });
  } catch (error) {
    console.error("Public catalog error:", error.message);
    return res.status(500).json({ success: false, message: "Unable to load the public catalog." });
  }
};
