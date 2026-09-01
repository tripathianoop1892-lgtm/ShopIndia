import Medicine from "../models/medicine.js";

// =======================
// ➕ ADD MEDICINE
// =======================
export const addMedicine = async (req, res) => {
  try {
    const user = req.user;
    // 🔐 Only distributor and shopkeeper can add medicines
if (user.role !== "distributor" && user.role !== "shopkeeper") {
  return res.status(403).json({
    success: false,
    message: "You are not allowed to add medicines",
  });
}

    const {
      name,
      batch,
      mrp,
      price,       // Frontend fallback field
      offerPrice,  // Frontend calculated field
      expiry,
      mfd,
      stock,
    } = req.body;

    // 💰 UNIFICATION FACTOR: Determine the actual target transaction cost
    const listingPrice = Number(offerPrice || price || 0);

    if (Number(stock) < 0) {
      return res.status(400).json({ success: false, message: "Stock cannot be negative" });
    }

    if (Number(mrp) < 0) {
      return res.status(400).json({ success: false, message: "MRP cannot be negative" });
    }

    if (listingPrice > Number(mrp)) {
      return res.status(400).json({ success: false, message: "Selling price cannot exceed MRP" });
    }

    if (mfd && expiry) {
      const mfdDate = new Date(mfd);
      const expDate = new Date(expiry);
      if (expDate <= mfdDate) {
        return res.status(400).json({ success: false, message: "Expiry date must be after manufacturing date" });
      }
    }

    const existingMedicine = await Medicine.findOne({
      ownerId: user._id,
      name: name.trim(),
      batch: batch.trim(),
    });

    if (existingMedicine) {
      return res.status(409).json({ success: false, message: "Medicine with same name and batch already exists" });
    }

    const medicineData = {
      ...req.body,
      ownerId: user._id,
      ownerRole: user.role,
      name: name.trim(),
      batch: batch.trim(),
      mfd: mfd ? new Date(mfd) : null,
      expiry: new Date(expiry)
    };

    // 🚀 STRICT PRICING DISPATCH TIERS
    if (user.role === "distributor") {
      medicineData.price = listingPrice;
      medicineData.wholesalePrice = listingPrice; // Offer price for shopkeeper to buy
      medicineData.retailPrice = 0;               // Isolated zero for distributor
    } else if (user.role === "shopkeeper") {
      medicineData.shopId = user.shopId;
      medicineData.mrp = Number(mrp || 0);
      medicineData.retailPrice = listingPrice;    // Offer price to sell to customers
      medicineData.price = 0;                     // Reset untracked categories
      medicineData.wholesalePrice = 0; 
    }

    const med = await Medicine.create(medicineData);

    return res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      data: med,
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "Medicine with same name and batch already exists" });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// =======================
// 📄 GET MEDICINES
// =======================
export const getMedicines = async (req, res) => {
  try {
    const user = req.user;
    const { distributorId } = req.query;
    
    let query = {};

    if (user.role === "distributor") {
      query = { ownerId: user._id, ownerRole: "distributor" };
    }
    else if (user.role === "shopkeeper") {
      const { source } = req.query;
      if (source === "my-retail-stock") {
        query = { shopId: user.shopId, ownerRole: "shopkeeper" };
      } else if (distributorId) {
        query = { ownerId: distributorId, ownerRole: "distributor" };
      } else {
        query = { ownerRole: "distributor" };
      }
    }
    else if (user.role === "customer") {
      if (!user.shopId) {
        return res.status(400).json({ message: "No active shop bound to account ❌" });
      }
      query = { shopId: user.shopId, ownerRole: "shopkeeper" };
    }

    const meds = await Medicine.find(query)
      .populate("ownerId", "name email") 
      .sort({ name: 1 });
      
    return res.json(meds);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching stock ❌" });
  }
};

// =======================
// ❌ DELETE & UPDATE
// =======================
export const deleteMedicine = async (req, res) => {
  try {
    const user = req.user;

    const med = await Medicine.findById(req.params.id);

    if (!med) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    // 🔐 Distributor can delete only their own medicines
    if (user.role === "distributor") {
      if (
        med.ownerRole !== "distributor" ||
        String(med.ownerId) !== String(user._id)
      ) {
        return res.status(403).json({
          success: false,
          message: "You can delete only your own medicines",
        });
      }
    }

    // 🔐 Shopkeeper can delete only their own shop medicines
    else if (user.role === "shopkeeper") {
      if (
        med.ownerRole !== "shopkeeper" ||
        String(med.ownerId) !== String(user._id) ||
        String(med.shopId) !== String(user.shopId)
      ) {
        return res.status(403).json({
          success: false,
          message: "You can delete only your own shop medicines",
        });
      }
    }

    // ❌ Customer/Admin cannot delete medicines
    else {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete medicines",
      });
    }

    await Medicine.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "Deleted successfully ✅",
    });

  } catch (err) {
    console.error("DELETE MEDICINE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Error deleting medicine ❌",
    });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const user = req.user;

    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    // 🔐 Distributor can update only their own medicines
    if (user.role === "distributor") {
      if (
        medicine.ownerRole !== "distributor" ||
        String(medicine.ownerId) !== String(user._id)
      ) {
        return res.status(403).json({
          success: false,
          message: "You can update only your own medicines",
        });
      }
    }

    // 🔐 Shopkeeper can update only their own shop medicines
    else if (user.role === "shopkeeper") {
      if (
        medicine.ownerRole !== "shopkeeper" ||
        String(medicine.ownerId) !== String(user._id) ||
        String(medicine.shopId) !== String(user.shopId)
      ) {
        return res.status(403).json({
          success: false,
          message: "You can update only your own shop medicines",
        });
      }
    }

    // ❌ Customer/Admin cannot update medicines
    else {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update medicines",
      });
    }

    // =========================
    // 🔍 DUPLICATE CHECK
    // =========================

    const newName =
      req.body.name !== undefined
        ? req.body.name.trim()
        : medicine.name;

    const newBatch =
      req.body.batch !== undefined
        ? req.body.batch.trim()
        : medicine.batch;

    const duplicate = await Medicine.findOne({
      _id: { $ne: medicine._id },
      ownerId: medicine.ownerId,
      ownerRole: medicine.ownerRole,
      name: newName,
      batch: newBatch,
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Medicine with same name and batch already exists",
      });
    }

    // =========================
    // 🛡️ ALLOWED FIELDS ONLY
    // =========================

    const allowedFields = [
      "name",
      "batch",
      "mrp",
      "price",
      "offerPrice",
      "wholesalePrice",
      "retailPrice",
      "expiry",
      "mfd",
      "stock",
      "company",
      "type",
      "strength",
      "packSize",
      "packType",
      "sellingUnit",
      "individualSaleAllowed",
      "image",
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    // ❌ Never allow frontend to change ownership
    delete updateData.ownerId;
    delete updateData.ownerRole;
    delete updateData.shopId;

    if (updateData.name !== undefined) {
      updateData.name = updateData.name.trim();
    }

    if (updateData.batch !== undefined) {
      updateData.batch = updateData.batch.trim();
    }

    // =========================
    // 📅 DATE VALIDATION
    // =========================

    const finalMfd =
      updateData.mfd !== undefined
        ? updateData.mfd
        : medicine.mfd;

    const finalExpiry =
      updateData.expiry !== undefined
        ? updateData.expiry
        : medicine.expiry;

    if (finalMfd && finalExpiry) {
      const mfdDate = new Date(finalMfd);
      const expiryDate = new Date(finalExpiry);

      if (expiryDate <= mfdDate) {
        return res.status(400).json({
          success: false,
          message: "Expiry date must be after manufacturing date",
        });
      }
    }

    // =========================
    // 💰 PRICE VALIDATION
    // =========================

    const finalMrp =
      updateData.mrp !== undefined
        ? Number(updateData.mrp)
        : Number(medicine.mrp || 0);

    const finalPrice =
      updateData.price !== undefined
        ? Number(updateData.price)
        : Number(medicine.price || 0);

    const finalOfferPrice =
      updateData.offerPrice !== undefined
        ? Number(updateData.offerPrice)
        : Number(medicine.offerPrice || 0);

    if (finalMrp < 0) {
      return res.status(400).json({
        success: false,
        message: "MRP cannot be negative",
      });
    }

    if (finalPrice < 0 || finalOfferPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    const sellingPrice =
      finalOfferPrice > 0
        ? finalOfferPrice
        : finalPrice;

    if (sellingPrice > finalMrp) {
      return res.status(400).json({
        success: false,
        message: "Selling price cannot exceed MRP",
      });
    }

    // =========================
    // 📦 STOCK VALIDATION
    // =========================

    if (
      updateData.stock !== undefined &&
      Number(updateData.stock) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    const updated = await Medicine.findByIdAndUpdate(
      medicine._id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.json({
      success: true,
      message: "Updated successfully ✅",
      data: updated,
    });

  } catch (err) {
    console.error("UPDATE MEDICINE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Error updating medicine ❌",
    });
  }
};
