import Cart from "../models/cart.models.js";

// =======================
// ➕ ADD TO USER PERSISTENT CART
// =======================
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; 
  const {
  medicineId,
  name,
  company,
  price,
  image,
  quantity,
  sellerId,
  ownerId,
  sellingUnit,
  individualSaleAllowed,
  packSize,
} = req.body;

    // Resolve seller ID dynamically regardless of whether frontend passes it as sellerId or ownerId
    const resolvedSellerId = sellerId || ownerId;

    if (!resolvedSellerId) {
      return res.status(400).json({ success: false, message: "Seller identification is required" });
    }

    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      userCart = new Cart({ userId, items: [] });
    }

    // Match exact item by name AND seller node to distinguish identical products across suppliers
    const itemIndex = userCart.items.findIndex(
      item => item.name === name && item.sellerId === resolvedSellerId
    );

    if (itemIndex > -1) {
      userCart.items[itemIndex].quantity += (Number(quantity) || 1);
    } else {
      userCart.items.push({
        medicineId,
        name,
        company: company || "",
        price: Number(price) || 0,
        image: image || "",
        quantity: Number(quantity) || 1,
        sellingUnit: sellingUnit || "Pack",
        individualSaleAllowed: Boolean(individualSaleAllowed),
        packSize: Number(packSize) || 1,
        sellerId: resolvedSellerId,
      });
    }

    await userCart.save();
    return res.status(200).json({ success: true, message: "Item synchronized to cloud cart ✅", cart: userCart.items });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// =======================
// 📄 GET ACCOUNT CART INSTANCE
// =======================
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const userCart = await Cart.findOne({ userId });

    if (!userCart) {
      return res.status(200).json({ success: true, cart: [] });
    }

    return res.status(200).json({ success: true, cart: userCart.items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// =======================
// ❌ REMOVE SPECIFIC CART LINE ITEM
// =======================
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const userCart = await Cart.findOne({ userId });

    if (userCart) {
      // Decode param safely to handle spaces and specialized characters
      const targetName = decodeURIComponent(req.params.name);
      userCart.items = userCart.items.filter(item => item.name !== targetName);
      
      await userCart.save();
      return res.json({ success: true, cart: userCart.items });
    }
    
    return res.status(404).json({ success: false, message: "Cart profile mapping failure" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};