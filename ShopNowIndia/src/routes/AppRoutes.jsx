import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Auth Components
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";
import Features from "../pages/features/Features";
import Terms from "../pages/terms/Terms";
import Policy from "../pages/policy/Policy";

// Layout Wrappers
import ShopkeeperLayout from "../components/Layout/ShopkeeperLayout";
import DistributorLayout from "../components/Layout/DistributorLayout";
import CustomerLayout from "../components/Layout/CustomerLayout";

// Shopkeeper Segment Pages
import ShopkeeperDashboard from "../pages/dashboard/Shopkeeper";
import ShopkeeperMedicineList from "../pages/medicine-list/Shopkeeper";
import ShopkeeperOrder from "../pages/order/Shopkeeper";
import ShopkeeperEarnings from "../pages/earnings/Shopkeeper";
import AddMedicineShopkeeper from "../features/add-medicine/Shopkeeper";

// Distributor Segment Pages
import DistributorDashboard from "../pages/dashboard/Distributor";
import DistributorMedicineList from "../pages/medicine-list/Distributor";
import DistributorOrder from "../pages/order/Distributor";
import DistributorEarnings from "../pages/earnings/Distributor";
import DistributorLowStock from "../pages/low-Stock/Distributor";
import DistributorExpiring from "../pages/expiring/Distributor";
import AddMedicineDistributor from "../features/add-medicine/Distributor";

// Customer Segment Pages
import CustomerDashboard from "../pages/dashboard/Customer";
import CustomerMedicineList from "../pages/medicine-list/Customer";
import CustomerOrder from "../pages/order/Customer";
import Cart from "../components/Card/Card";
import Profile from "../pages/profile/Profile";
import Settings from "../pages/settings/Settings";

const router = createBrowserRouter([
  // ==========================================
  // 🔐 OPEN / PUBLIC AUTHENTICATION ROUTES
  // ==========================================
  { path: "/", element: <Home/> },
  {path:"/contact", element:<Contact/>},
  {path:"/terms", element:<Terms/>},
  {path:"/policy", element:<Policy/>},
  {path:"/about", element:<About/>},
  {path:"/features", element:<Features/>},
  { path: "/login", element: <Login/> },
  { path: "/register", element: <Register /> },
  { path: "/forgot", element: <ForgotPassword /> },

  // ==========================================
  // 🏪 SHOPKEEPER NESTED WORKSPACE PANEL 
  // ==========================================
  {
    path: "/shopkeeper",
    element: <ShopkeeperLayout />,
    children: [
      { index: true, element: <ShopkeeperDashboard /> }, // Maps directly to: /shopkeeper
      { path: "medicine-list", element: <ShopkeeperMedicineList /> }, // Maps directly to: /shopkeeper/medicine-list
      { path: "add-medicine", element: <AddMedicineShopkeeper /> }, // Maps directly to: /shopkeeper/add-medicine
      { path: "orders", element: <ShopkeeperOrder /> }, // Maps directly to: /shopkeeper/orders
      { path: "earnings", element: <ShopkeeperEarnings /> }, // Maps directly to: /shopkeeper/earnings
      { path: "cart", element: <Cart /> },
      { path: "profile", element: <Profile /> }, // Maps directly to: /shopkeeper/profile
      { path: "settings", element: <Settings /> } // Maps directly to: /shopkeeper/settings
    ],
  },

  // ==========================================
  // 🚚 DISTRIBUTOR NESTED WHOLESALE WORKSPACE
  // ==========================================
  {
    path: "/distributor",
    element: <DistributorLayout />,
    children: [
      { index: true, element: <DistributorDashboard /> }, // Maps directly to: /distributor
      { path: "medicine-list", element: <DistributorMedicineList /> }, // Maps directly to: /distributor/medicine-list
      { path: "add-medicine", element: <AddMedicineDistributor /> }, // Maps directly to: /distributor/add-medicine
      { path: "orders", element: <DistributorOrder /> }, // Maps directly to: /distributor/orders
      { path: "earnings", element: <DistributorEarnings /> }, // Maps directly to: /distributor/earnings
      { path: "low-stock", element: <DistributorLowStock /> }, // Maps directly to: /distributor/low-stock
      { path: "expiring", element: <DistributorExpiring /> }, // Maps directly to: /distributor/expiring
      { path: "profile", element: <Profile /> }, // Maps directly to: /distributor/profile
      { path: "settings", element: <Settings /> } // Maps directly to: /distributor/settings
    ],
  },

  // ==========================================
  // 🛍️ CUSTOMER RETAIL STORE PANEL SHOPPING
  // ==========================================
  {
    path: "/customer",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <CustomerDashboard /> }, // Maps directly to: /customer
      { path: "medicines", element: <CustomerMedicineList /> }, // Maps directly to: /customer/medicines
      { path: "orders", element: <CustomerOrder /> }, // Maps directly to: /customer/orders
      { path: "cart", element: <Cart />},
      { path: "profile", element: <Profile /> }, // Maps directly to: /customer/profile
      { path: "settings", element: <Settings /> } // Maps directly to: /customer/settings
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;