import Order from "../models/Order.js";
import Medicine from "../models/medicine.js";
import User from "../models/user.js";

// ========================================================
// 📦 CREATE MULTI-ITEM ARRAY ORDER (Kept intact for context)
// ========================================================
export const createOrder = async (req, res) => {
  try {
    const user = req.user; 
    const { items, sellerId, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Your cart is empty ❌" });
    }

    for (let item of items) {
      const targetMed = await Medicine.findById(item.medicineId);
      if (!targetMed) {
        return res.status(404).json({ success: false, message: `Medicine ${item.name} not found ❌` });
      }
      if (targetMed.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${item.name} ❌` });
      }
    }

    // Deducts stock immediately to hold/reserve the items
    for (let item of items) {
      await Medicine.findByIdAndUpdate(item.medicineId, {
        $inc: { stock: -item.quantity }
      });
    }

    const orderType = user.role === "shopkeeper" ? "B2B" : "B2C";
    
    const orderData = {
      orderType,
      buyerId: user._id,
      sellerId: sellerId,
      items: items.map(i => ({
        medicineId: i.medicineId,
        name: i.name,
        quantity: Number(i.quantity),
        price: Number(i.price)
      })),
      totalAmount: Number(totalAmount),
      status: "Pending"
    };

    if (user.role === "shopkeeper") {
      orderData.shopkeeperName = user.name;
      orderData.shopId = user.shopId;
    } else {
      orderData.customerName = user.name;
      orderData.shopId = user.shopId; 
    }

    const order = await Order.create(orderData);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully ✅",
      data: order
    });
  } catch (err) {
    console.error("ORDER CREATION ERROR:", err);
    return res.status(500).json({ success: false, message: "Internal Server Order processing failure ❌" });
  }
};

// ========================================================
// 📄 GET ALL ORDERS (Kept intact for context)
// ========================================================
export const getOrders = async (req, res) => {
  try {
    const user = req.user;
    let query = {};

    if (user.role === "distributor") {
      // Wholesalers monitor B2B orders sent to them
      query = { sellerId: user._id, orderType: "B2B" };
    } else if (user.role === "shopkeeper") {
      // Shopkeepers look up BOTH: B2B purchases or consumer retail orders matching their shopId
      const { view } = req.query;
      if (view === "b2b-purchases") {
        query = { buyerId: user._id, orderType: "B2B" };
      } else {
        query = { sellerId: user._id, orderType: "B2C" };
      }
    } else if (user.role === "customer") {
      query = { buyerId: user._id, orderType: "B2C" };
    }

    // 🚀 FIX: Automatically populate user references to capture name details across nodes
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

// ========================================================
// 🔄 UPDATE ORDER STATUS & AUTO INVENTORY POPULATION (FIXED!)
// ========================================================
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = req.user; // Captured from checkAuth middleware token[cite: 2]
    
    const currentOrder = await Order.findById(req.params.id);
    if (!currentOrder) return res.status(404).json({ message: "Order records match failure" });

    // 藴鈥 SECURITY GUARD: Prevent role-crossing parameter manipulation
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

    // CRITICAL REVERSAL FIX: If a pending order is REJECTED, restore the stock to the seller[cite: 2]
    if (status === "Rejected" && currentOrder.status === "Pending") {
      for (let item of currentOrder.items) {
        await Medicine.findByIdAndUpdate(item.medicineId, {
          $inc: { stock: item.quantity } // Increment quantities back[cite: 2]
        });
      }
    }

    // APPROVAL LOGIC: If a Distributor APPROVES a Shopkeeper's B2B order[cite: 2]
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
            mrp: masterDistributorMed?.mrp || item.price,
            wholesalePrice: item.price,
            retailPrice: masterDistributorMed?.mrp || (item.price * 1.2), 
            ownerId: shopkeeperUser._id,
            ownerRole: "shopkeeper",
            shopId: shopkeeperUser.shopId
          });
        }
      }
    }

    // Save state changes to the Order document[cite: 2]
    currentOrder.status = status;
    await currentOrder.save();
    return res.json({ success: true, message: `Order marked as ${status}`, data: currentOrder });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error changing order tracking pipeline status" });
  }
};