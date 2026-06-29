import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
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
export default cartSlice.reducer;