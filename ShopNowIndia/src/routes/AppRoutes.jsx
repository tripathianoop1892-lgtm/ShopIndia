<<<<<<< HEAD
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
  
=======
import { createBrowserRouter } from "react-router-dom";

// Components
import Cart from "../components/Card/Card";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Dashboard Pages
import Customer from "../pages/dashboard/Customer.jsx";
import Distributor from "../pages/dashboard/Distributor.jsx";
import Shopkeeper from "../pages/dashboard/Shopkeeper.jsx";

// Medicine List
import DistributorMedicineList from "../pages/medicine-list/Distributor.jsx";
import ShopkeeperMedicineList from "../pages/medicine-list/Shopkeeper.jsx";
import CustomerMedicineList from "../pages/medicine-list/Customer.jsx";

// Add Medicine
import AddMedicineDistributor from "../features/add-medicine/Distributor";
import AddMedicineShopkeeper from "../features/add-medicine/Shopkeeper";

// Orders
import DistributorOrder from "../pages/order/Distributor.jsx";
import ShopkeeperOrder from "../pages/order/Shopkeeper.jsx";
import CustomerOrders from "../pages/order/Customer.jsx";

// Stock
import DistributorStock from "../pages/stock/Distributor.jsx";

// Low Stock
import LowStock from "../pages/low-stock/Distributor.jsx";
import ShopkeeperLowStock from "../pages/low-Stock/Shopkeeper.jsx";

// Expiring
import Expiring from "../pages/expiring/Distributor.jsx";
import ShopkeeperExpiry from "../pages/expiring/Shopkeeper.jsx";

// Earnings
import Earnings from "../pages/earnings/Distributor.jsx";
import ShopkeeperEarnings from "../pages/earnings/Shopkeeper.jsx";

// Layouts
import CustomerLayout from "../components/Layout/CustomerLayout";
import DistributorLayout from "../components/Layout/DistributorLayout";
import ShopkeeperLayout from "../components/Layout/ShopkeeperLayout";
import Home from "../pages/home/home.jsx"
// Contact
import Contact from "../pages/contact/contact.jsx";
import About from "../pages/about/about.jsx";
import Features from "../pages/features/features.jsx";
// terms & policy
import Terms from "../pages/terms/terms.jsx";
import Policy from "../pages/policy/policy.jsx";

const router = createBrowserRouter([
  // 🔐 Auth
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  { path: "/", element: <Home/> },
  {path:"/contact", element:<Contact/>},
  {path:"/terms", element:<Terms/>},
  {path:"/policy", element:<Policy/>},
  {path:"/about", element:<About/>},
  {path:"/features", element:<Features/>},
  { path: "/login", element: <Login/> },
  { path: "/register", element: <Register /> },
  { path: "/forgot", element: <ForgotPassword /> },

<<<<<<< HEAD
  // ==========================================
  // 🏪 SHOPKEEPER NESTED WORKSPACE PANEL 
  // ==========================================
  {
    path: "/shopkeeper",
    element: <ShopkeeperLayout />,
    children: [
      { index: true, element: <ShopkeeperDashboard /> }, // Maps directly to: /shopkeeper
      { path: "medicine-list", element: <ShopkeeperMedicineList /> }, // Maps directly to: /shopkeeper/medicine-list
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
=======
  // 🧑 Customer
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  {
    path: "/customer",
    element: <CustomerLayout />,
    children: [
<<<<<<< HEAD
      { index: true, element: <CustomerDashboard /> }, // Maps directly to: /customer
      { path: "medicines", element: <CustomerMedicineList /> }, // Maps directly to: /customer/medicines
      { path: "orders", element: <CustomerOrder /> }, // Maps directly to: /customer/orders
      { path: "cart", element: <Cart />},
      { path: "profile", element: <Profile /> }, // Maps directly to: /customer/profile
      { path: "settings", element: <Settings /> } // Maps directly to: /customer/settings
    ],
  },

  // Fallback Catch All redirection sequence rule
  { path: "*", element: <Navigate to="/" replace /> },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
=======
      { index: true, element: <Customer /> },
      { path: "medicines", element: <CustomerMedicineList /> },
      { path: "orders", element: <CustomerOrders /> },
      { path: "cart", element: <Cart /> },
    ],
  },

  // 🏪 Shopkeeper (🔥 FIXED)
  {
    path: "/shopkeeper",
    element: <ShopkeeperLayout />,
    children: [
      { index: true, element: <Shopkeeper /> },
      { path: "medicines", element: <ShopkeeperMedicineList /> },
      { path: "add-medicine", element: <AddMedicineShopkeeper /> },
      { path: "orders", element: <ShopkeeperOrder /> },
      { path: "cart", element: <Cart /> },
      { path: "low-stock", element: <ShopkeeperLowStock /> },
      { path: "expiry", element: <ShopkeeperExpiry /> },
      { path: "earnings", element: <ShopkeeperEarnings /> },
    ],
  },

  // 🏭 Distributor
  {
    path: "/distributor",
    element: <DistributorLayout />,
    children: [
      { index: true, element: <Distributor /> },
      { path: "medicines", element: <DistributorMedicineList /> },
      { path: "add-medicine", element: <AddMedicineDistributor /> },
      { path: "orders", element: <DistributorOrder /> },
      { path: "stock", element: <DistributorStock /> },
      { path: "low-stock", element: <LowStock /> },
      { path: "expiring", element: <Expiring /> },
      { path: "earnings", element: <Earnings /> },
    ],
  },
]);

export default router;
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
