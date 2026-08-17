// ==========================================
// Coupon Controller
// ==========================================

import Coupon from "../models/coupons.js";
import CouponUsage from "../models/couponUsage.js";

// ==========================================
// Normalize Status
// ==========================================

const normalizeStatus = (status) => {
  return status === "inactive"
    ? "inactive"
    : "active";
};

// ==========================================
// Get Display Status
// ==========================================

export const getDisplayStatus = (coupon) => {
  if (coupon.status === "inactive") {
    return "Inactive";
  }

  if (
    coupon.expiryDate &&
    new Date(coupon.expiryDate) < new Date()
  ) {
    return "Expired";
  }

  return "Active";
};

// ==========================================
// Validate Coupon
// ==========================================

export const validateCoupon = async (
  req,
  res
) => {
  try {
    const { code, amount } = req.body;

    // ----------------------------------------
    // Coupon Code Validation
    // ----------------------------------------

    if (!code || !code.trim()) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required",
      });
    }

    const subtotal = Number(amount || 0);

    const normalizedCode =
      code.trim().toUpperCase();

    // ----------------------------------------
    // Find Coupon
    // ----------------------------------------

    const coupon =
      await Coupon.findOne({
        code: normalizedCode,
      });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    // ----------------------------------------
    // Status Check
    // ----------------------------------------

    if (coupon.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Coupon is inactive",
      });
    }

    // ----------------------------------------
    // Expiry Check
    // ----------------------------------------

    if (
      coupon.expiryDate &&
      new Date(coupon.expiryDate) < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Coupon has expired",
      });
    }

    // ----------------------------------------
    // Minimum Order Check
    // ----------------------------------------

    if (
      subtotal <
      Number(coupon.minOrder || 0)
    ) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${Number(
          coupon.minOrder || 0
        )}`,
      });
    }

    // ----------------------------------------
    // User Coupon Usage Check
    // ----------------------------------------

    if (req.user?._id) {
      const usage =
        await CouponUsage.countDocuments({
          couponId: coupon._id,
          userId: req.user._id,
        });

      if (
        usage >=
        Number(coupon.maxUsagePerUser || 1)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "You have already used this coupon.",
        });
      }
    }

    // ----------------------------------------
    // Total Usage Check
    // ----------------------------------------

    if (
      coupon.maxTotalUsage &&
      coupon.usedCount >=
        coupon.maxTotalUsage
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Coupon usage limit reached.",
      });
    }

    // ----------------------------------------
    // Calculate Discount
    // ----------------------------------------

    let discountAmount = 0;

    if (
      coupon.discountType === "Percentage"
    ) {
      discountAmount =
        (subtotal *
          Number(coupon.discountValue)) /
        100;
    } else {
      discountAmount =
        Number(coupon.discountValue);
    }

    // Discount cannot exceed subtotal
    discountAmount = Math.min(
      discountAmount,
      subtotal
    );

    const finalAmount = Math.max(
      subtotal - discountAmount,
      0
    );

    // ----------------------------------------
    // Response
    // ----------------------------------------

    return res.json({
      success: true,
      message:
        "Coupon applied successfully",

      data: {
        code: coupon.code,

        discountType:
          coupon.discountType,

        discountValue:
          coupon.discountValue,

        discountAmount: Number(
          discountAmount.toFixed(2)
        ),

        finalAmount: Number(
          finalAmount.toFixed(2)
        ),
      },
    });
  } catch (error) {
    console.error(
      "VALIDATE COUPON ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error validating coupon",
    });
  }
};

// ==========================================
// Get All Coupons
// ==========================================

export const getCoupons = async (
  req,
  res
) => {
  try {
    const coupons =
      await Coupon.find().sort({
        createdAt: -1,
      });

    const data = coupons.map(
      (coupon) => ({
        ...coupon.toObject(),

        displayStatus:
          getDisplayStatus(
            coupon.toObject()
          ),
      })
    );

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "GET COUPONS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error fetching coupons",
    });
  }
};

// ==========================================
// Create Coupon
// ==========================================

export const createCoupon = async (
  req,
  res
) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minOrder,
      expiryDate,
      status,
      maxUsagePerUser,
      maxTotalUsage,
    } = req.body;

    // ----------------------------------------
    // Coupon Code Validation
    // ----------------------------------------

    if (!code || !code.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Coupon code is required",
      });
    }

    // ----------------------------------------
    // Discount Validation
    // ----------------------------------------

    if (
      discountValue === undefined ||
      discountValue === null ||
      discountValue === ""
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Discount value is required",
      });
    }

    // ----------------------------------------
    // Expiry Validation
    // ----------------------------------------

    if (!expiryDate) {
      return res.status(400).json({
        success: false,
        message:
          "Expiry date is required",
      });
    }

    // ----------------------------------------
    // Normalize Code
    // ----------------------------------------

    const normalizedCode =
      code.trim().toUpperCase();

    // ----------------------------------------
    // Duplicate Coupon Check
    // ----------------------------------------

    const existingCoupon =
      await Coupon.findOne({
        code: normalizedCode,
      });

    if (existingCoupon) {
      return res.status(409).json({
        success: false,
        message:
          "Coupon code already exists",
      });
    }

    // ----------------------------------------
    // Create Coupon
    // ----------------------------------------

    const newCoupon =
      await Coupon.create({
        code: normalizedCode,

        discountType,

        discountValue:
          Number(discountValue),

        minOrder:
          Number(minOrder || 0),

        expiryDate:
          new Date(expiryDate),

        status:
          normalizeStatus(status),

        maxUsagePerUser:
          Number(
            maxUsagePerUser || 1
          ),

        maxTotalUsage:
          maxTotalUsage === "" ||
          maxTotalUsage == null
            ? null
            : Number(maxTotalUsage),
      });

    // ----------------------------------------
    // Success
    // ----------------------------------------

    return res.status(201).json({
      success: true,
      message:
        "Coupon created successfully",
      data: newCoupon,
    });
  } catch (error) {
    console.error(
      "CREATE COUPON ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error creating coupon",
    });
  }
};

// ==========================================
// Update Coupon
// ==========================================

export const updateCoupon = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      code,
      discountType,
      discountValue,
      minOrder,
      expiryDate,
      status,
      maxUsagePerUser,
      maxTotalUsage,
    } = req.body;

    // ----------------------------------------
    // Find Coupon
    // ----------------------------------------

    const coupon =
      await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    // ----------------------------------------
    // Update Code
    // ----------------------------------------

    if (code && code.trim()) {
      const normalizedCode =
        code.trim().toUpperCase();

      const duplicate =
        await Coupon.findOne({
          _id: { $ne: id },
          code: normalizedCode,
        });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "Coupon code already exists",
        });
      }

      coupon.code =
        normalizedCode;
    }

    // ----------------------------------------
    // Update Fields
    // ----------------------------------------

    if (discountType) {
      coupon.discountType =
        discountType;
    }

    if (
      discountValue !== undefined
    ) {
      coupon.discountValue =
        Number(discountValue);
    }

    if (
      minOrder !== undefined
    ) {
      coupon.minOrder =
        Number(minOrder || 0);
    }

    if (expiryDate) {
      coupon.expiryDate =
        new Date(expiryDate);
    }

    if (status) {
      coupon.status =
        normalizeStatus(status);
    }

    if (
      maxUsagePerUser !== undefined
    ) {
      coupon.maxUsagePerUser =
        Number(maxUsagePerUser);
    }

    if (
      maxTotalUsage !== undefined
    ) {
      coupon.maxTotalUsage =
        maxTotalUsage === ""
          ? null
          : Number(maxTotalUsage);
    }

    // ----------------------------------------
    // Save
    // ----------------------------------------

    await coupon.save();

    return res.json({
      success: true,
      message:
        "Coupon updated successfully",
      data: coupon,
    });
  } catch (error) {
    console.error(
      "UPDATE COUPON ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error updating coupon",
    });
  }
};

// ==========================================
// Delete Coupon
// ==========================================

export const deleteCoupon = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const coupon =
      await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message:
          "Coupon not found",
      });
    }

    return res.json({
      success: true,
      message:
        "Coupon deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE COUPON ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Error deleting coupon",
    });
  }
};