import Order from "../models/Order.js";
import Medicine from "../models/medicine.js";
import User from "../models/user.js";
import coupons from "../models/coupons.js";
import CouponUsage from "../models/couponUsage.js";
export const createOrder = async (req, res) => {
  try {
    const user = req.user;

    const {
      items,
      sellerId,
      subtotal,
      deliveryCharge,
      platformFee,
      couponCode,
    } = req.body;

    // ==========================================
    // 1. CART VALIDATION
    // ==========================================

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty ❌",
      });
    }

    // ==========================================
    // 2. STOCK VALIDATION
    // ==========================================

    for (let item of items) {
      const targetMed = await Medicine.findById(item.medicineId);

      if (!targetMed) {
        return res.status(404).json({
          success: false,
          message: `Medicine ${item.name} not found ❌`,
        });
      }

      if (targetMed.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.name} ❌`,
        });
      }
    }

    // ==========================================
    // 3. AMOUNT VALUES
    // ==========================================

    const orderSubtotal = Number(subtotal || 0);
    const orderDeliveryCharge = Number(deliveryCharge || 0);
    const orderPlatformFee = Number(platformFee || 0);

    let discountAmount = 0;
    let appliedCoutonCode = "";
    let coupon = null;

    // ==========================================
    // 4. COUPON
    // ==========================================

    if (couponCode && couponCode.trim()) {
      const normalizeCode = couponCode.trim().toUpperCase();

      coupon = await coupons.findOne({
        code: normalizeCode,
      });

      if (!coupon) {
        return res.status(404).json({
          success: false,
          message: "Coupon Not Found",
        });
      }

      if (coupon.status !== "active") {
        return res.status(400).json({
          success: false,
          message: "Coupon is inactive",
        });
      }

      if (
        coupon.expiryDate &&
        new Date(coupon.expiryDate) < new Date()
      ) {
        return res.status(400).json({
          success: false,
          message: "Coupon has expired",
        });
      }

      // Minimum order check
      if (
        orderSubtotal <
        Number(coupon.miniorder || 0)
      ) {
        return res.status(400).json({
          success: false,
          message: `Minimum order amount is ₹${Number(
            coupon.miniorder || 0
          )}`,
        });
      }

      // ==========================================
      // COUPON USER USAGE
      // ==========================================

      const usage =
        await CouponUsage.countDocuments({
          couponId: coupon._id,
          userId: user._id,
        });

      if (
        coupon.maxUsagePerUser &&
        usage >= coupon.maxUsagePerUser
      ) {
        return res.status(400).json({
          success: false,
          message:
            "You have already used this coupon.",
        });
      }

      // ==========================================
      // TOTAL COUPON USAGE
      // ==========================================

      if (
        coupon.maxTotalUsage &&
        coupon.usedCount >= coupon.maxTotalUsage
      ) {
        return res.status(400).json({
          success: false,
          message: "Coupon Usage limit reached",
        });
      }

      // ==========================================
      // DISCOUNT CALCULATION
      // ==========================================

      if (
        coupon.discountType === "Percentage"
      ) {
        discountAmount =
          (orderSubtotal *
            Number(coupon.discountValue)) /
          100;
      } else {
        discountAmount = Number(
          coupon.discountValue
        );
      }

      // Discount cannot be greater than subtotal
      discountAmount = Math.min(
        discountAmount,
        orderSubtotal
      );

      appliedCoutonCode = coupon.code;
    }

    // ==========================================
    // 5. FINAL AMOUNT
    // ==========================================

    const finalAmount = Math.max(
      orderSubtotal -
        discountAmount +
        orderDeliveryCharge +
        orderPlatformFee,
      0
    );

    // ==========================================
    // 6. REDUCE STOCK
    // ==========================================

    for (let item of items) {
      await Medicine.findByIdAndUpdate(
        item.medicineId,
        {
          $inc: {
            stock: -Number(item.quantity),
          },
        }
      );
    }

    // ==========================================
    // 7. ORDER TYPE
    // ==========================================

    const orderType =
      user.role === "shopkeeper"
        ? "B2B"
        : "B2C";

    // ==========================================
    // 8. ORDER DATA
    // ==========================================

    const orderData = {
      orderType,

      buyerId: user._id,

      sellerId: sellerId,

      items: items.map((i) => ({
        medicineId: i.medicineId,
        name: i.name,
        quantity: Number(i.quantity),
        price: Number(i.price),
      })),

      // Original order amount before coupon
      totalAmount: Number(
        (
          orderSubtotal +
          orderDeliveryCharge +
          orderPlatformFee
        ).toFixed(2)
      ),

      subtotal: Number(
        orderSubtotal.toFixed(2)
      ),

      deliveryCharge: Number(
        orderDeliveryCharge.toFixed(2)
      ),

      platformFee: Number(
        orderPlatformFee.toFixed(2)
      ),

      couponCode: appliedCoutonCode,

      discountAmount: Number(
        discountAmount.toFixed(2)
      ),

      // Final amount customer has to pay
      finalAmount: Number(
        finalAmount.toFixed(2)
      ),

      status: "Pending",
    };

    // ==========================================
    // 9. CUSTOMER / SHOPKEEPER DETAILS
    // ==========================================

    if (user.role === "shopkeeper") {
      orderData.shopkeeperName =
        user.name;

      orderData.shopId =
        user.shopId;
    } else {
      orderData.customerName =
        user.name;

      orderData.shopId =
        user.shopId;
    }

    // ==========================================
    // 10. CREATE ORDER
    // ==========================================

    const order =
      await Order.create(orderData);

    // ==========================================
    // 11. SAVE COUPON USAGE
    // ==========================================

    if (coupon) {
      await CouponUsage.create({
        couponId: coupon._id,
        userId: user._id,
        orderId: order._id,
      });

      coupon.usedCount += 1;

      await coupon.save();
    }

    // ==========================================
    // 12. RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,

      message:
        "Order placed successfully ✅",

      data: order,

      discountApplied: {
        couponCode:
          appliedCoutonCode,

        discountAmount: Number(
          discountAmount.toFixed(2)
        ),

        finalAmount: Number(
          finalAmount.toFixed(2)
        ),
      },
    });
  } catch (err) {
    console.error(
      "ORDER CREATION ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal Server Order processing failure ❌",
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const user = req.user;
    let query = {};

    if (user.role === "distributor") {
      query = { sellerId: user._id, orderType: "B2B" };
    } else if (user.role === "shopkeeper") {
      const { view } = req.query;
      if (view === "b2b-purchases") {
        query = { buyerId: user._id, orderType: "B2B" };
      } else {
        query = { sellerId: user._id, orderType: "B2C" };
      }
    } else if (user.role === "customer") {
      query = { buyerId: user._id, orderType: "B2C" };
    }

    const orders = await Order.find(query)
      .populate("sellerId", "name email")
      .populate("buyerId", "name email")
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    return res.status(500).json({ message: "Error fetching orders list" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = req.user;
    
    const currentOrder = await Order.findById(req.params.id);
    if (!currentOrder) return res.status(404).json({ message: "Order records match failure" });

    if (user.role === "shopkeeper" && currentOrder.orderType !== "B2C") {
      return res.status(403).json({ 
        success: false, 
        message: "Access Denied: Shopkeepers can only manage B2C retail orders." 
      });
    }
    if (user.role === "shopkeeper" && String(currentOrder.sellerId) !== String(user._id)) {
      return res.status(403).json({ 
        success: false, 
        message: "Access Denied: You are not authorized to manage this specific store's orders." 
      });
    }

    if (status === "Rejected" && currentOrder.status === "Pending") {
      for (let item of currentOrder.items) {
        await Medicine.findByIdAndUpdate(item.medicineId, {
          $inc: { stock: item.quantity }
        });
      }
    }

    // APPROVAL LOGIC MODIFIED TO MATCH EXACT TIERS
    if (currentOrder.orderType === "B2B" && status === "Approved" && currentOrder.status !== "Approved") {
      const shopkeeperUser = await User.findById(currentOrder.buyerId);
      
      for (let item of currentOrder.items) {
        let existingRetailStock = await Medicine.findOne({
          name: item.name,
          shopId: shopkeeperUser.shopId,
          ownerRole: "shopkeeper"
        });
        
        if (existingRetailStock) {
          existingRetailStock.stock += item.quantity;
          await existingRetailStock.save();
        } else {
          const masterDistributorMed = await Medicine.findById(item.medicineId);
          await Medicine.create({
            name: item.name,
            company: masterDistributorMed?.company || "N/A",
            type: masterDistributorMed?.type || "Tablet",
            strength: masterDistributorMed?.strength || "",
            packSize: masterDistributorMed?.packSize || 10,
            packType: masterDistributorMed?.packType || "Strip",
            image: masterDistributorMed?.image || "",
            stock: item.quantity,
            expiry: masterDistributorMed?.expiry,
            
            // 🎯 FIXED PRICING CONFIGURATION FOR PROCUREMENT
            mrp: masterDistributorMed?.mrp || item.price,
            wholesalePrice: item.price, // Track baseline purchase cost snapshot
            retailPrice: masterDistributorMed?.mrp || (item.price * 1.2), // Offer price to sell to customers
            price: 0, 
            
            ownerId: shopkeeperUser._id,
            ownerRole: "shopkeeper",
            shopId: shopkeeperUser.shopId
          });
        }
      }
    }

    currentOrder.status = status;
    await currentOrder.save();
    return res.json({ success: true, message: `Order marked as ${status}`, data: currentOrder });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error changing order tracking pipeline status" });
  }
};