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

const router = createBrowserRouter([
  // 🔐 Auth
  { path: "/", element: <Home/> },
  {path:"/contact", element:<Contact/>},
  {path:"/about", element:<About/>},
  {path:"/features", element:<Features/>},
  { path: "/login", element: <Login/> },
  { path: "/register", element: <Register /> },
  { path: "/forgot", element: <ForgotPassword /> },

  // 🧑 Customer
  {
    path: "/customer",
    element: <CustomerLayout />,
    children: [
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