import Cart from "../models/cart.models.js";

// =======================
<<<<<<< HEAD
// ➕ ADD TO USER PERSISTENT CART
// =======================
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { medicineId, name, company, price, image, quantity, sellerId, ownerId } = req.body;

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
        sellerId: resolvedSellerId,
      });
    }

    await userCart.save();
    return res.status(200).json({ success: true, message: "Item synchronized to cloud cart ✅", cart: userCart.items });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
=======
// ➕ ADD TO CART
// =======================
export const addToCart = async (req, res) => {

  try {

    const existingItem = await Cart.findOne({
      name: req.body.name,
    });

    // already exists
    if (existingItem) {

      existingItem.qty += 1;

      await existingItem.save();

      return res.json({
        success: true,
        message: "Quantity Updated ✅",
      });
    }

    // new item
    const cartItem = new Cart({
      name: req.body.name,
      company: req.body.company,
      price: req.body.price,
      qty: 1,
    });

    await cartItem.save();

    res.status(201).json({
      success: true,
      message: "Item Added ✅",
      cartItem,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  }
};

// =======================
<<<<<<< HEAD
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
=======
// 📄 GET CART
// =======================
export const getCart = async (req, res) => {

  try {

    const cart = await Cart.find();

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  }
};

// =======================
<<<<<<< HEAD
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
=======
// ❌ REMOVE ITEM
// =======================
export const removeCartItem = async (req, res) => {

  try {

    await Cart.findOneAndDelete({
      name: req.params.name,
    });

    const cart = await Cart.find();

    res.json({
      success: true,
      cart,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  }
};