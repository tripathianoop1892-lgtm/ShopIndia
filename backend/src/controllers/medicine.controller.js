import Medicine from "../models/medicine.js";

// =======================
// ➕ ADD MEDICINE
// =======================
export const addMedicine = async (req, res) => {
  try {
    const user = req.user;

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
      expiry: new Date(expiry),
      price: listingPrice, // Sync general fallback field for backwards compatibility
    };

    // 🚀 ROLE-SPECIFIC PRICING DISPATCH
    if (user.role === "distributor") {
      medicineData.wholesalePrice = listingPrice;
      medicineData.retailPrice = Number(mrp || 0); // Default retail tier to MRP max boundary
    } else if (user.role === "shopkeeper") {
      medicineData.shopId = user.shopId;
      medicineData.retailPrice = listingPrice;
      // wholesalePrice would have been set when purchased from distributor
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
    const med = await Medicine.findById(req.params.id);
    if (!med) return res.status(404).json({ message: "Medicine not found" });
    
    await Medicine.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Deleted successfully ✅" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting item ❌" });
  }
};

export const updateMedicine = async (
  req,
  res
) => {
  try {

    const medicine =
      await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    const duplicate =
      await Medicine.findOne({
        _id: { $ne: req.params.id },
        ownerId: medicine.ownerId,
        name: req.body.name?.trim(),
        batch: req.body.batch?.trim(),
      });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message:
          "Medicine with same name and batch already exists",
      });
    }

    const updated =
      await Medicine.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    return res.json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Error updating item",
    });
  }
};