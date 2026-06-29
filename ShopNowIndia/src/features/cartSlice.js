import { createSlice } from "@reduxjs/toolkit";

const initialState = {
<<<<<<< HEAD
  cartItems: [],
=======
  items: [],
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
<<<<<<< HEAD
  reducers: {
    // Synchronize your local Redux state with items retrieved from the DB
    setCartItems: (state, action) => {
      state.cartItems = Array.isArray(action.payload) ? action.payload : [];
    },
    // Locally clear out data instances upon checkout fulfillment
    clearCartState: (state) => {
      state.cartItems = [];
    }
  },
});

export const { setCartItems, clearCartState } = cartSlice.actions;
=======

  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
export default cartSlice.reducer;