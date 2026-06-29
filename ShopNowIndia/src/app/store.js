import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
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
=======

import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
