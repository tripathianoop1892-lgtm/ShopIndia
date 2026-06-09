import express from "express";

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

export default router;