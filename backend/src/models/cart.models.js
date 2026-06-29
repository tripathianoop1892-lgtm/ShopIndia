import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
<<<<<<< HEAD
=======

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  {
    userId: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
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
=======

    items: [
      {
        medicineId: String,

        name: String,

        company: String,

        price: Number,

        image: String,

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
        quantity: {
          type: Number,
          default: 1,
        },
<<<<<<< HEAD
        // 🚚 CRITICAL FIX: Track the item seller/distributor node to separate B2B routing
        sellerId: {
          type: String,
          required: true,
        },
      },
    ],
  },
=======
      },
    ],
  },

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
const Cart = mongoose.model("Cart", cartSchema);
=======
const Cart = mongoose.model(
  "Cart",
  cartSchema
);

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
export default Cart;