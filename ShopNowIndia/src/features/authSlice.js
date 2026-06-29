import { createSlice } from "@reduxjs/toolkit";

const initialState = {
<<<<<<< HEAD
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.shopId) {
        localStorage.setItem("shopId", user.shopId);
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.clear();
=======
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    },
  },
});

<<<<<<< HEAD
export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
=======
export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
