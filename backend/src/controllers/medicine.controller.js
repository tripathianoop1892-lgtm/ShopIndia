import Medicine from "../models/medicine.js";

// =======================
// ➕ ADD MEDICINE
// =======================
export const addMedicine = async (req, res) => {
  try {
    const user = req.user;
    console.log(req.body);

    const med = await Medicine.create({
      ...req.body,

      // 🔥 FINAL FIX
      ownerId: user._id.toString(),
      ownerRole: user.role,
    });

    res.json({
      success: true,
      message: "Medicine added ✅",
      data: med,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Error ❌",
    });
  }
};

// =======================
// 📄 GET MEDICINES
// =======================
export const getMedicines = async (req, res) => {
  try {
    const user = req.user;

    let meds = [];

    // 🔥 Distributor
    if (user.role === "distributor") {
      meds = await Medicine.find({
        ownerId: user._id.toString(),
      });
    }

    // 🔥 Shopkeeper
    else if (user.role === "shopkeeper") {

  meds = await Medicine.find({
    $or: [
      { ownerRole: "distributor" },
      { ownerRole: "shopkeeper" },
    ],
  });
}

    // 🔥 Customer
    else if (user.role === "customer") {
      meds = await Medicine.find({
        ownerRole: "shopkeeper",
      });
    }

    res.json(meds);

  } catch (err) {
    res.status(500).json({
      message: "Error ❌",
    });
  }
};

// =======================
// ❌ DELETE
// =======================
export const deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted ✅",
    });

  } catch (err) {
    res.status(500).json({
      message: "Error ❌",
    });
  }
};

// =======================
// ✏️ UPDATE
// =======================
export const updateMedicine = async (req, res) => {
  try {
    const med = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Updated ✅",
      data: med,
    });

  } catch (err) {
    res.status(500).json({
      message: "Error ❌",
    });
  }
};