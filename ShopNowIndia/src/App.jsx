import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Existing pages
import MedicineList from "./pages/medicine-list/MedicineList.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Shopkeeper from "./pages/dashboard/Shopkeeper.jsx";
import Distributor from "./pages/dashboard/Distributor.jsx";
//home
import Home from "./pages/home/home.jsx";
// 🔐 AUTH
import Login from "./pages/auth/Login.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";

// 🔥 CUSTOMER
import CustomerLayout from "./layouts/CustomerLayout.jsx";
import Customer from "./pages/customer/Customer.jsx";
import CustomerMedicineList from "./pages/customer/CustomerMedicineList.jsx";
import CustomerOrders from "./pages/customer/CustomerOrders.jsx";
// About
import About from "./pages/about/about.jsx";

//features
import Features from "./pages/features/features.jsx";

// policy 
import Policy from "./pages/policy/policy.jsx"

// terms
import Terms from "./pages/terms/terms.jsx"

// 🔥 DISTRIBUTOR LAYOUT + PAGES
import DistributorLayout from "./layouts/DistributorLayout.jsx";
import AddMedicine from "./pages/distributor/AddMedicine.jsx";
// 👉 बाकी pages बाद में add कर सकते हो

import "./App.css";

const App = () => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 AUTH */}
        <Route path="/" element={<Home/>} />
        <Route path="/terms" element={<Terms/>} />
        <Route path="/policy" element={<Policy/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/features" element={<Features/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        {/* 🔥 CUSTOMER */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<Customer />} />
          <Route path="medicines" element={<CustomerMedicineList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<CustomerOrders />} />
        </Route>

        {/* 🏪 SHOPKEEPER */}
        <Route path="/shopkeeper" element={<Shopkeeper />} />

        {/* 🚚 DISTRIBUTOR (🔥 FIXED) */}
        <Route path="/distributor" element={<DistributorLayout />}>

          {/* Dashboard */}
          <Route index element={<Distributor />} />


          {/* Sidebar links */}
          <Route path="add-medicine" element={<AddMedicine />} />
          <Route path="medicines" element={<MedicineList />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;