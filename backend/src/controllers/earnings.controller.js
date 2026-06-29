import Order from "../models/Order.js";

// =======================
// 💰 GET DISTRIBUTOR EARNINGS
// =======================
export const getEarnings = async (req, res) => {
  try {
    const user = req.user;

    // Only Distributors can view earnings
    if (user.role !== "distributor") {
      return res.status(403).json({
        success: false,
        message: "Only distributors can view earnings",
      });
    }

    // Get all APPROVED B2B orders where this distributor is the seller
    const orders = await Order.find({
      sellerId: user._id,
      orderType: "B2B",
      status: "Approved"
    }).sort({ createdAt: -1 });

    // Calculate total earnings from approved orders
    const total = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    return res.json({
      success: true,
      total: total,
      orders: orders,
      count: orders.length
    });
  } catch (err) {
    console.error("EARNINGS FETCH ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching earnings",
    });
  }
};
