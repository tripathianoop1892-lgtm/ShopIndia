import { useSelector, useDispatch } from "react-redux";
import { setCredentials, logOut } from "../features/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  const login = (userData, tokenData) => {
    dispatch(setCredentials({ user: userData, token: tokenData }));
  };

  const logout = () => {
    dispatch(logOut());
  };

  const isDistributor = user?.role === "distributor";
  const isShopkeeper = user?.role === "shopkeeper";
  const isCustomer = user?.role === "customer";
  const isAdmin = user?.role === "admin";

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    isDistributor,
    isShopkeeper,
    isCustomer,
    isAdmin,
  };
};

export default useAuth;