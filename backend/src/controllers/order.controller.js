import mongoose from "mongoose";
import Order from "../models/Order.js";
import Medicine from "../models/medicine.js";
import User from "../models/user.js";
import coupons from "../models/coupons.js";
import CouponUsage from "../models/couponUsage.js";
import { notifyUser } from "../services/notification.service.js";
import PaymentIntent from "../models/paymentIntent.js";

// =======================
// 🛒 CREATE ORDER
// =======================
export const createOrder = async (req, res) => {
  try {
    const user = req.user;

    const {
      items,
      sellerId,
      deliveryCharge,
      platformFee,
      couponCode,
      paymentReference,
    } = req.body;

    // ==========================================
    // 1. USER VALIDATION
    // ==========================================

    if (!user || !user._id || !user.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user ❌",
      });
    }

    // ==========================================
    // 2. CART VALIDATION
    // ==========================================

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty ❌",
      });
    }

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "Seller is required ❌",
      });
    }

    // ==========================================
    // 3. SELLER VALIDATION
    // ==========================================

    const seller = await User.findById(sellerId);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found ❌",
      });
    }

    // ==========================================
    // 4. ORDER TYPE + SELLER ROLE
    // ==========================================

    let orderType = "";

    // SHOPKEEPER → DISTRIBUTOR
    if (user.role === "shopkeeper") {
      orderType = "B2B";

      if (seller.role !== "distributor") {
        return res.status(403).json({
          success: false,
          message: "Shopkeeper can order only from distributor ❌",
        });
      }
    }

    // CUSTOMER → SHOPKEEPER
    else if (user.role === "customer") {
      orderType = "B2C";

      if (seller.role !== "shopkeeper") {
        return res.status(403).json({
          success: false,
          message: "Customer can order only from shopkeeper ❌",
        });
      }

      // Customer must be connected to this shop
      if (
        !user.shopId ||
        !seller.shopId ||
        String(user.shopId) !== String(seller.shopId)
      ) {
        return res.status(403).json({
          success: false,
          message: "This shop is not connected to your account ❌",
        });
      }
    }

    // OTHER ROLES
    else {
      return res.status(403).json({
        success: false,
        message: "This account cannot place an order ❌",
      });
    }

    // ==========================================
    // 5. MEDICINE VALIDATION
    // ==========================================

    const validatedItems = [];
    let calculatedSubtotal = 0;

    for (const item of items) {
      if (!item.medicineId) {
        return res.status(400).json({
          success: false,
          message: "Medicine ID is required ❌",
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid medicine quantity ❌",
        });
      }

      const medicine = await Medicine.findById(item.medicineId);

      if (!medicine) {
        return res.status(404).json({
          success: false,
          message: "Medicine not found ❌",
        });
      }

      // ==========================================
      // B2B MEDICINE OWNERSHIP
      // ==========================================

      if (orderType === "B2B") {
        if (
          medicine.ownerRole !== "distributor" ||
          String(medicine.ownerId) !== String(seller._id)
        ) {
          return res.status(403).json({
            success: false,
            message: `${medicine.name} is not supplied by this distributor ❌`,
          });
        }
      }

      // ==========================================
      // B2C MEDICINE OWNERSHIP
      // ==========================================

      if (orderType === "B2C") {
        if (
          medicine.ownerRole !== "shopkeeper" ||
          String(medicine.ownerId) !== String(seller._id) ||
          String(medicine.shopId) !== String(seller.shopId)
        ) {
          return res.status(403).json({
            success: false,
            message: `${medicine.name} is not available from this shop ❌`,
          });
        }
      }

      // ==========================================
      // STOCK CHECK
      // ==========================================

      if (Number(medicine.stock || 0) < quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${medicine.name} ❌`,
        });
      }

      // ==========================================
      // SERVER SIDE PRICE
      // ==========================================

      let actualPrice = 0;

      if (orderType === "B2B") {
        actualPrice = Number(
          medicine.wholesalePrice || medicine.price || 0
        );
      }

      if (orderType === "B2C") {
        actualPrice = Number(
          medicine.retailPrice ||
          medicine.price ||
          medicine.mrp ||
          0
        );
      }

      if (!Number.isFinite(actualPrice) || actualPrice < 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid price for ${medicine.name} ❌`,
        });
      }

      const itemTotal = actualPrice * quantity;

      calculatedSubtotal += itemTotal;

      validatedItems.push({
        medicineId: medicine._id,
        name: medicine.name,
        quantity,
        price: actualPrice,

        // 📦 Batch snapshot
        batch: medicine.batch || "",

        // 📅 Expiry snapshot
        expiry: medicine.expiry || null,
      });
    }

    // ==========================================
    // 6. SERVER CALCULATED SUBTOTAL
    // ==========================================

    const orderSubtotal = Number(
      calculatedSubtotal.toFixed(2)
    );

    // ==========================================
    // 7. DELIVERY + PLATFORM FEE
    // ==========================================

    const orderDeliveryCharge = Number(
      deliveryCharge || 0
    );

    const orderPlatformFee = Number(
      platformFee || 0
    );

    if (
      !Number.isFinite(orderDeliveryCharge) ||
      orderDeliveryCharge < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery charge ❌",
      });
    }

    if (
      !Number.isFinite(orderPlatformFee) ||
      orderPlatformFee < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid platform fee ❌",
      });
    }

    // ==========================================
    // 8. COUPON
    // ==========================================

    let discountAmount = 0;
    let appliedCouponCode = "";
    let coupon = null;

    if (couponCode && couponCode.trim()) {
      const normalizeCode =
        couponCode.trim().toUpperCase();

      coupon = await coupons.findOne({
        code: normalizeCode,
      });

      if (!coupon) {
        return res.status(404).json({
          success: false,
          message: "Coupon not found ❌",
        });
      }

      if (coupon.status !== "active") {
        return res.status(400).json({
          success: false,
          message: "Coupon is inactive ❌",
        });
      }

      if (
        coupon.expiryDate &&
        new Date(coupon.expiryDate) < new Date()
      ) {
        return res.status(400).json({
          success: false,
          message: "Coupon has expired ❌",
        });
      }

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

      // USER COUPON USAGE
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

      // TOTAL COUPON USAGE
      if (
        coupon.maxTotalUsage &&
        coupon.usedCount >= coupon.maxTotalUsage
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Coupon usage limit reached",
        });
      }

      // DISCOUNT
      if (
        coupon.discountType === "Percentage"
      ) {
        discountAmount =
          (orderSubtotal *
            Number(coupon.discountValue || 0)) /
          100;
      } else {
        discountAmount = Number(
          coupon.discountValue || 0
        );
      }

      discountAmount = Math.min(
        Math.max(discountAmount, 0),
        orderSubtotal
      );

      appliedCouponCode = coupon.code;
    }

    // ==========================================
    // 9. FINAL AMOUNT
    // ==========================================

    const finalAmount = Number(
      Math.max(
        orderSubtotal -
          discountAmount +
          orderDeliveryCharge +
          orderPlatformFee,
        0
      ).toFixed(2)
    );

    // ==========================================
    // 10. PAYMENT VERIFICATION
    // ==========================================

    const payment =
      await PaymentIntent.findOne({
        _id: paymentReference,
        userId: user._id,
        status: "paid",
      });

    if (
      !payment ||
      payment.amount !== Math.round(finalAmount * 100)
    ) {
      return res.status(402).json({
        success: false,
        message:
          "A verified Razorpay payment for the exact order amount is required.",
      });
    }

    // ==========================================
    // 11. ATOMIC STOCK REDUCTION
    // ==========================================

    const reducedStock = [];

    for (const item of validatedItems) {
      const updatedMedicine =
        await Medicine.findOneAndUpdate(
          {
            _id: item.medicineId,
            stock: { $gte: item.quantity },
          },
          {
            $inc: {
              stock: -item.quantity,
            },
          },
          {
            new: true,
          }
        );

      if (!updatedMedicine) {
        // Rollback previously reduced stock
        for (const rollback of reducedStock) {
          await Medicine.findByIdAndUpdate(
            rollback.medicineId,
            {
              $inc: {
                stock: rollback.quantity,
              },
            }
          );
        }

        return res.status(409).json({
          success: false,
          message: `Stock changed while placing ${item.name}. Please try again ❌`,
        });
      }

      reducedStock.push({
        medicineId: item.medicineId,
        quantity: item.quantity,
      });
    }

    // ==========================================
    // 12. ORDER DATA
    // ==========================================

    const orderData = {
      orderType,

      buyerId: user._id,

      sellerId: seller._id,

      items: validatedItems,

      totalAmount: Number(
        (
          orderSubtotal +
          orderDeliveryCharge +
          orderPlatformFee
        ).toFixed(2)
      ),

      subtotal: orderSubtotal,

      deliveryCharge: Number(
        orderDeliveryCharge.toFixed(2)
      ),

      platformFee: Number(
        orderPlatformFee.toFixed(2)
      ),

      couponCode: appliedCouponCode,

      discountAmount: Number(
        discountAmount.toFixed(2)
      ),

      finalAmount,

      status: "Pending",

      paymentStatus: "Paid",

      paymentMethod: "Razorpay",

      paymentId: payment.razorpayPaymentId,
    };

    // ==========================================
    // 13. SHOP / CUSTOMER DETAILS
    // ==========================================

    if (orderType === "B2B") {
      orderData.shopkeeperName = user.name;
      orderData.shopId = user.shopId || null;
    }

    if (orderType === "B2C") {
      orderData.customerName = user.name;
      orderData.shopId = seller.shopId;
    }

    // ==========================================
    // 14. CREATE ORDER
    // ==========================================

    let order;

    try {
      order = await Order.create(orderData);
    } catch (orderError) {
      // Rollback stock if order creation fails
      for (const rollback of reducedStock) {
        await Medicine.findByIdAndUpdate(
          rollback.medicineId,
          {
            $inc: {
              stock: rollback.quantity,
            },
          }
        );
      }

      throw orderError;
    }

    // ==========================================
    // 15. CONSUME PAYMENT
    // ==========================================

    payment.status = "consumed";
    await payment.save();

    // ==========================================
    // 16. NOTIFICATIONS
    // ==========================================

    try {
      await Promise.all([
        notifyUser({
          recipientId: order.buyerId,
          title: "Order placed",
          message: `Your ${order.orderType} order #${String(
            order._id
          )
            .slice(-8)
            .toUpperCase()} has been placed successfully.`,
        }),

        notifyUser({
          recipientId: order.sellerId,
          title: `New ${order.orderType} order`,
          message: `${user.name} placed order #${String(
            order._id
          )
            .slice(-8)
            .toUpperCase()} for ₹${order.finalAmount.toLocaleString(
            "en-IN"
          )}.`,
        }),
      ]);
    } catch (notificationError) {
      console.error(
        "ORDER NOTIFICATION ERROR:",
        notificationError
      );
    }

    // ==========================================
    // 17. SAVE COUPON USAGE
    // ==========================================

    if (coupon) {
      await CouponUsage.create({
        couponId: coupon._id,
        userId: user._id,
        orderId: order._id,
      });

      coupon.usedCount =
        Number(coupon.usedCount || 0) + 1;

      await coupon.save();
    }

    // ==========================================
    // 18. RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,

      message:
        "Order placed successfully ✅",

      data: order,

      discountApplied: {
        couponCode:
          appliedCouponCode,

        discountAmount: Number(
          discountAmount.toFixed(2)
        ),

        finalAmount,
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
        "Internal server order processing failure ❌",
    });
  }
};

// ==========================================
// 📦 GET ORDERS
// ==========================================

export const getOrders = async (req, res) => {
  try {
    const user = req.user;
    let query = {};

    if (user.role === "distributor") {
      query = {
        sellerId: user._id,
        orderType: "B2B",
      };
    } else if (user.role === "shopkeeper") {
      const { view } = req.query;

      if (view === "b2b-purchases") {
        query = {
          buyerId: user._id,
          orderType: "B2B",
        };
      } else {
        query = {
          sellerId: user._id,
          orderType: "B2C",
        };
      }
    } else if (user.role === "customer") {
      query = {
        buyerId: user._id,
        orderType: "B2C",
      };
    }

    const orders = await Order.find(query)
      .populate("sellerId", "name email")
      .populate("buyerId", "name email")
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (err) {
    console.error(
      "GET ORDERS ERROR:",
      err
    );

    return res.status(500).json({
      message:
        "Error fetching orders list",
    });
  }
};

// ==========================================
// 🔄 UPDATE ORDER STATUS
// Transaction Safe Version
// ==========================================

export const updateOrderStatus = async (
  req,
  res
) => {
  const session =
    await mongoose.startSession();

  try {
    const { status } = req.body;
    const user = req.user;

    // ==========================================
    // 1. BASIC VALIDATION
    // ==========================================

    if (!user || !user._id || !user.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user ❌",
      });
    }

    const allowedStatuses = [
      "Pending",
      "Approved",
      "Rejected",
      "Delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status ❌",
      });
    }

    // ==========================================
    // 2. START TRANSACTION
    // ==========================================

    let updatedOrder;
    let previousStatus;

    await session.withTransaction(
      async () => {
        // ==========================================
        // 3. FIND ORDER
        // ==========================================

        const currentOrder =
          await Order.findById(
            req.params.id
          ).session(session);

        if (!currentOrder) {
          const error = new Error(
            "Order not found ❌"
          );

          error.statusCode = 404;

          throw error;
        }

        previousStatus =
          currentOrder.status;

        // ==========================================
        // 4. STATUS TRANSITION SECURITY
        // ==========================================

        if (
          currentOrder.status ===
            "Rejected" ||
          currentOrder.status ===
            "Delivered"
        ) {
          const error = new Error(
            `This order is already ${currentOrder.status} and cannot be changed ❌`
          );

          error.statusCode = 400;

          throw error;
        }

        // Approved → only Delivered
        if (
          currentOrder.status ===
            "Approved" &&
          status !== "Delivered"
        ) {
          const error = new Error(
            "An approved order can only be marked as Delivered ❌"
          );

          error.statusCode = 400;

          throw error;
        }

        // Pending → only Approved / Rejected
        if (
          currentOrder.status ===
            "Pending" &&
          status !== "Approved" &&
          status !== "Rejected"
        ) {
          const error = new Error(
            "Pending order can only be Approved or Rejected ❌"
          );

          error.statusCode = 400;

          throw error;
        }

        // ==========================================
        // 5. ROLE + OWNERSHIP SECURITY
        // ==========================================

        // ------------------------------------------
        // B2B
        // Shopkeeper → Distributor
        // ------------------------------------------

        if (
          currentOrder.orderType ===
          "B2B"
        ) {
          if (
            user.role !==
            "distributor"
          ) {
            const error = new Error(
              "Only the distributor can manage B2B orders ❌"
            );

            error.statusCode = 403;

            throw error;
          }

          if (
            String(
              currentOrder.sellerId
            ) !== String(user._id)
          ) {
            const error = new Error(
              "You are not authorized to manage this B2B order ❌"
            );

            error.statusCode = 403;

            throw error;
          }
        }

        // ------------------------------------------
        // B2C
        // Customer → Shopkeeper
        // ------------------------------------------

        else if (
          currentOrder.orderType ===
          "B2C"
        ) {
          if (
            user.role !==
            "shopkeeper"
          ) {
            const error = new Error(
              "Only the shopkeeper can manage B2C orders ❌"
            );

            error.statusCode = 403;

            throw error;
          }

          if (
            String(
              currentOrder.sellerId
            ) !== String(user._id)
          ) {
            const error = new Error(
              "You are not authorized to manage this shop's order ❌"
            );

            error.statusCode = 403;

            throw error;
          }
        }

        // ==========================================
        // 6. REJECT ORDER
        // ==========================================

        if (
          status === "Rejected" &&
          currentOrder.status ===
            "Pending"
        ) {
          // Stock was reduced at order creation.
          // Restore it on rejection.

          for (const item of currentOrder.items) {
            const restoredMedicine =
              await Medicine.findOneAndUpdate(
                {
                  _id: item.medicineId,
                },
                {
                  $inc: {
                    stock: Number(
                      item.quantity
                    ),
                  },
                },
                {
                  new: true,
                  session,
                }
              );

            if (!restoredMedicine) {
              const error = new Error(
                `Medicine ${item.name} could not be restored ❌`
              );

              error.statusCode = 409;

              throw error;
            }
          }
        }

        // ==========================================
        // 7. APPROVE B2B ORDER
        // Distributor → Shopkeeper
        // ==========================================

        if (
          currentOrder.orderType ===
            "B2B" &&
          status === "Approved" &&
          currentOrder.status ===
            "Pending"
        ) {
          const shopkeeperUser =
            await User.findById(
              currentOrder.buyerId
            ).session(session);

          if (!shopkeeperUser) {
            const error = new Error(
              "Shopkeeper not found ❌"
            );

            error.statusCode = 404;

            throw error;
          }

          if (
            shopkeeperUser.role !==
            "shopkeeper"
          ) {
            const error = new Error(
              "B2B buyer is not a shopkeeper ❌"
            );

            error.statusCode = 400;

            throw error;
          }

          if (!shopkeeperUser.shopId) {
            const error = new Error(
              "Shopkeeper does not have an active shop ❌"
            );

            error.statusCode = 400;

            throw error;
          }

          // ==========================================
          // TRANSFER EACH MEDICINE
          // ==========================================

          for (const item of currentOrder.items) {
            const distributorMedicine =
              await Medicine.findOne({
                _id: item.medicineId,
                ownerId:
                  currentOrder.sellerId,
                ownerRole:
                  "distributor",
              }).session(session);

            if (!distributorMedicine) {
              const error = new Error(
                `${item.name} is not available from this distributor ❌`
              );

              error.statusCode = 404;

              throw error;
            }

            // ==========================================
            // ORDER SNAPSHOT
            // ==========================================

            const batch =
              item.batch ||
              distributorMedicine.batch ||
              "";

            const expiry =
              item.expiry ||
              distributorMedicine.expiry ||
              null;

            // ==========================================
            // FIND SAME MEDICINE + SAME BATCH
            // SAME SHOP + SAME OWNER
            // ==========================================

            const existingRetailStock =
              await Medicine.findOne({
                name: item.name,
                batch: batch,
                shopId:
                  shopkeeperUser.shopId,
                ownerId:
                  shopkeeperUser._id,
                ownerRole:
                  "shopkeeper",
              }).session(session);

            // ==========================================
            // SAME BATCH EXISTS
            // ==========================================

            if (existingRetailStock) {
              existingRetailStock.stock =
                Number(
                  existingRetailStock.stock ||
                    0
                ) +
                Number(item.quantity);

              existingRetailStock.batch =
                batch;

              existingRetailStock.expiry =
                expiry;

              await existingRetailStock.save({
                session,
              });
            }

            // ==========================================
            // NEW BATCH
            // ==========================================

            else {
              const newRetailStock =
                new Medicine({
                  name: item.name,

                  company:
                    distributorMedicine.company ||
                    "",

                  type:
                    distributorMedicine.type ||
                    "",

                  strength:
                    distributorMedicine.strength ||
                    "",

                  packSize:
                    distributorMedicine.packSize ||
                    10,

                  packType:
                    distributorMedicine.packType ||
                    "Strip",

                  sellingUnit:
                    distributorMedicine.sellingUnit ||
                    "pack",

                  individualSaleAllowed:
                    distributorMedicine.individualSaleAllowed ||
                    false,

                  image:
                    distributorMedicine.image ||
                    "",

                  stock:
                    Number(
                      item.quantity
                    ),

                  // 📦 Batch
                  batch: batch,

                  // 📅 Expiry
                  expiry: expiry,

                  // 🏭 Manufacturing date
                  mfd:
                    distributorMedicine.mfd ||
                    "",

                  // 💰 MRP
                  mrp: Number(
                    distributorMedicine.mrp ||
                      0
                  ),

                  // 💰 Shopkeeper purchase price
                  wholesalePrice:
                    Number(
                      item.price || 0
                    ),

                  // 💰 Customer selling price
                  retailPrice:
                    Number(
                      distributorMedicine.mrp ||
                        0
                    ),

                  price: 0,

                  // 👤 Shopkeeper ownership
                  ownerId:
                    shopkeeperUser._id,

                  ownerRole:
                    "shopkeeper",

                  shopId:
                    shopkeeperUser.shopId,
                });

              await newRetailStock.save({
                session,
              });
            }
          }
        }

        // ==========================================
        // 8. UPDATE ORDER STATUS
        // ==========================================

        currentOrder.status = status;

        await currentOrder.save({
          session,
        });

        updatedOrder =
          currentOrder;
      }
    );

    // ==========================================
    // 9. STATUS CHANGE NOTIFICATION
    // ==========================================

    if (
      previousStatus !== status &&
      updatedOrder
    ) {
      try {
        await notifyUser({
          recipientId:
            updatedOrder.buyerId,

          title:
            "Order status updated",

          message: `Order #${String(
            updatedOrder._id
          )
            .slice(-8)
            .toUpperCase()} is now ${status}.`,
        });
      } catch (notificationError) {
        console.error(
          "ORDER STATUS NOTIFICATION ERROR:",
          notificationError
        );
      }
    }

    // ==========================================
    // 10. SUCCESS RESPONSE
    // ==========================================

    return res.json({
      success: true,

      message: `Order marked as ${status} ✅`,

      data: updatedOrder,
    });
  } catch (err) {
    console.error(
      "UPDATE ORDER STATUS ERROR:",
      err
    );

    return res
      .status(err.statusCode || 500)
      .json({
        success: false,

        message:
          err.statusCode
            ? err.message
            : "Error changing order status ❌",
      });
  } finally {
    await session.endSession();
  }
};