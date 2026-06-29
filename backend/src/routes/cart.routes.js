import express from "express";
<<<<<<< HEAD
import { addToCart, getCart, removeCartItem } from "../controllers/cart.controllers.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth check globally to protect the persistent multi-user cart instances
router.use(checkAuth);

router.post("/add", addToCart);
router.get("/", getCart);
router.delete("/:name", removeCartItem);
=======

const router = express.Router();

// Temporary cart storage
let cart = [];

// =======================
// ➕ ADD TO CART
// =======================
router.post("/add", (req, res) => {

  const item = req.body;

  // check existing item
  const existing = cart.find(
    (c) => c.name === item.name
  );

  if (existing) {

    existing.quantity =
      (existing.quantity || 1) + 1;

  } else {

    cart.push({
      ...item,
      quantity: 1,
    });
  }

  res.json({
    success: true,
    message: "Added To Cart ✅",
    cart,
  });
});

// =======================
// 📄 GET CART
// =======================
router.get("/", (req, res) => {

  res.json({
    success: true,
    cart,
  });
});

// =======================
// ❌ REMOVE ITEM
// =======================
router.delete("/:name", (req, res) => {

  cart = cart.filter(
    (item) =>
      item.name !== req.params.name
  );

  res.json({
    success: true,
    cart,
  });
});

// =======================
// 🧹 CLEAR CART
// =======================
router.delete("/", (req, res) => {

  cart = [];

  res.json({
    success: true,
    message: "Cart Cleared ✅",
  });
});
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

export default router;