import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        medicineId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          default: "",
        },
        price: {
          type: Number,
          default: 0,
        },
        image: {
          type: String,
          default: "",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        // 🚚 CRITICAL FIX: Track the item seller/distributor node to separate B2B routing
        sellerId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;