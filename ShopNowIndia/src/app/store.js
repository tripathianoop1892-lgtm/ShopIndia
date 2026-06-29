import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Repaired auth slice that tracks user sessions instead of a cart array
    cart: cartReducer, // Dedicated cart slice to track client baskets
  },
});

// 👈 CRITICAL FIX: Add this default export so main.jsx can find it!
export default store;