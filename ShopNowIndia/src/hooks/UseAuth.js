import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  // 🔄 LOAD USER ON REFRESH
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // 🔐 LOGIN
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token); // 🔥 IMPORTANT
    setUser(userData);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // 🔥 IMPORTANT
    setUser(null);
  };

  // 👤 ROLE CHECK
  const isDistributor = user?.role === "distributor";
  const isShopkeeper = user?.role === "shopkeeper";
  const isCustomer = user?.role === "customer";
  const isAdmin = user?.role === "admin"; // 🔥 ADD

  return {
    user,
    login,
    logout,
    isDistributor,
    isShopkeeper,
    isCustomer,
    isAdmin,
  };
};

export default useAuth;