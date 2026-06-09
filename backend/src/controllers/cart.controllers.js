import Cart from "../models/cart.models.js";

// =======================
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
  }
};

// =======================
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
  }
};

// =======================
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
  }
};