import coupons from "../models/coupons.js";
import Medicine from "../models/medicine.js";
import Order from "../models/Order.js";
import user from "../models/user.js";

export const getCustomers = async(req, res) =>{
    try{
        const customers = await user.find({role:"customer"}).select("-password");
        return res.json(customers);
    } catch(err){
        return res.status(500).json({message: "error featching customer"})
    }
}

export const getShopkeeper = async(req, res) =>{
    try{
        const shopkeeper = await user.find({role:"shopkeeper"}).select("-password");
        return res.json(shopkeeper);
    } catch(err){
        return res.status(500).json({message: "error featching shopkeeper"})
    }
}
export const getDistributors = async(req, res) =>{
    try{
        const distributors = await user.find({role:"distributor"}).select("-password");
        return res.json(distributors);
    } catch(err){
        return res.status(500).json({message: "error featching distributors"})
    }
}

    export const getMedicine = async(req, res) =>{
        try{
            const medicines = await Medicine.find().populate("ownerId", "name");
            return res.json(medicines);
        } catch(err){
            return res.status(500).json({message: "error featching medicines"})
        }
    }

      export const getOrders = async(req, res) =>{
        try{
            const orders = await Order.find({});
            return res.json(orders);
        } catch(err){
            return res.status(500).json({message: "error featching orders"})
        }
    }
        export const getCategorySummary = async(req, res) =>{
        try{
            const categorySummary = await Medicine.aggregate([
                {
                    $group: {
                        _id: {
                            $cond: [
                                { $eq: ["$type", ""] },
                                "Uncategorized",
                                { $ifNull: ["$type", "Uncategorized"] }
                            ]
                        },
                        totalMedicine: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: "$_id",
                        totalMedicine: 1
                    }
                },
                {
                    $sort: { category: 1 }
                }
            ]);

            return res.json(categorySummary);
        } catch(err){
            console.error(err);
            return res.status(500).json({message: "error featching category summary"})
        }
    }

// ==============================
// Dashboard Summary
// ==============================
export const getDashboardReport = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const [
      totalOrders,
      pendingOrders,
      approvedOrders,
      deliveredOrders,
      rejectedOrders,

      totalCustomers,
      totalShopkeepers,
      totalDistributors,

      totalMedicines,

      totalCoupons,

      todayRevenue,
      monthRevenue,
      totalRevenue,

      lowStock,
      outOfStock,
      expiredMedicines,
      expiringSoon,
    ] = await Promise.all([
      Order.countDocuments(),

      Order.countDocuments({ status: "Pending" }),
      Order.countDocuments({ status: "Approved" }),
      Order.countDocuments({ status: "Delivered" }),
      Order.countDocuments({ status: "Rejected" }),

      user.countDocuments({ role: "customer" }),
      user.countDocuments({ role: "shopkeeper" }),
      user.countDocuments({ role: "distributor" }),

      Medicine.countDocuments(),

      coupons.countDocuments(),

      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: today },
          },
        },
        {
          $group: {
            _id: null,
            revenue: { $sum: "$finalAmount" },
          },
        },
      ]),

      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: monthStart },
          },
        },
        {
          $group: {
            _id: null,
            revenue: { $sum: "$finalAmount" },
          },
        },
      ]),

      Order.aggregate([
        {
          $group: {
            _id: null,
            revenue: { $sum: "$finalAmount" },
          },
        },
      ]),

      Medicine.countDocuments({
        stock: { $gt: 0, $lte: 10 },
      }),

      Medicine.countDocuments({
        stock: 0,
      }),

      Medicine.countDocuments({
        expiry: { $lt: new Date() },
      }),

      Medicine.countDocuments({
        expiry: {
          $gte: new Date(),
          $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        revenue: {
          today: todayRevenue[0]?.revenue || 0,
          month: monthRevenue[0]?.revenue || 0,
          total: totalRevenue[0]?.revenue || 0,
        },

        orders: {
          total: totalOrders,
          pending: pendingOrders,
          approved: approvedOrders,
          delivered: deliveredOrders,
          rejected: rejectedOrders,
        },

        users: {
          customers: totalCustomers,
          shopkeepers: totalShopkeepers,
          distributors: totalDistributors,
        },

        medicines: {
          total: totalMedicines,
          lowStock,
          outOfStock,
          expired: expiredMedicines,
          expiringSoon,
        },

        coupons: {
          total: totalCoupons,
        },
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load report.",
    });
  }
};

// ==============================
// Daily Sales Report
// ==============================
export const getSalesReport = async (req, res) => {
  try {
    const sales = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$createdAt",
            },
          },

          orders: {
            $sum: 1,
          },

          revenue: {
            $sum: "$finalAmount",
          },

          discount: {
            $sum: "$discountAmount",
          },
        },
      },

      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    const report = sales.map((item) => ({
      date: item._id,
      orders: item.orders,
      revenue: item.revenue,
      discount: item.discount,
      netRevenue: item.revenue - item.discount,
      status: "Completed",
    }));

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch sales report.",
    });
  }
};