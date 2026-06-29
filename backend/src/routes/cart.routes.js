import express from "express";
import { addToCart, getCart, removeCartItem } from "../controllers/cart.controllers.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth check globally to protect the persistent multi-user cart instances
router.use(checkAuth);

router.post("/add", addToCart);
router.get("/", getCart);
router.delete("/:name", removeCartItem);

export default router;