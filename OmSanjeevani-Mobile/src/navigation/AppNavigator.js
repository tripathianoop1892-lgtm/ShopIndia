import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import CustomerDrawerNavigator from "./CustomerDrawerNavigator";
import ShopkeeperDrawerNavigator from "./ShopkeeperDrawerNavigator";
import { CartProvider } from "../context/CartContext";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

// ==========================================
// Authentication Screens
// ==========================================

import SplashScreen from "../screens/auth/SplashScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import OtpScreen from "../screens/auth/OtpScreen";

// ==========================================
// Customer Screens
// ==========================================
import MedicineList from "../screens/customer/MedicineList";
import MedicineDetails from "../screens/customer/MedicineDetails";
import CartScreen from "../screens/customer/CartScreen";
import CheckoutScreen from "../screens/customer/CheckoutScreen";
import WishlistScreen from "../screens/customer/WishlistScreen";
import OrdersScreen from "../screens/customer/OrdersScreen";
import OrderDetailsScreen from "../screens/customer/OrderDetailsScreen";

// ==========================================
// Shopkeeper Screens
// ==========================================

import ShopkeeperHomeScreen from "../screens/shopkeeper/ShopkeeperHomeScreen";
import ShopkeeperMedicinesList from "../screens/shopkeeper/MedicineListScreen";
import ShopkeeperAddMedicineScreen from "../screens/shopkeeper/AddMedicineScreen";
import ShopkeeperOrdersScreen from "../screens/shopkeeper/OrdersScreen";
import ShopkeeperOrdersDetailsScreen from "../screens/shopkeeper/OrdersDetailsScreen";

// ==========================================
// Distributor Screens
// ==========================================

import DistributorHomeScreen from "../screens/distributor/DistributorHomeScreen";
import DistributorMedicines from "../screens/distributor/MedicinesList";
import DistributorAddMedicineScreen from "../screens/distributor/AddMedicineScreen";
import DistributorOrdersScreen from "../screens/distributor/OrdersScreen";
import DistributorOrderDetailsScreen from "../screens/distributor/OrderDetailsScreen";

// ==========================================
// Stack Navigator
// ==========================================

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <CartProvider>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >

        {/* ==================================
            AUTHENTICATION
        =================================== */}

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />

        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
        />

        {/* ==================================
            CUSTOMER
        =================================== */}

       <Stack.Screen
  name="CustomerHome"
  component={CustomerDrawerNavigator}
/>

        <Stack.Screen
          name="MedicineList"
          component={MedicineList}
        />

        <Stack.Screen
          name="MedicineDetails"
          component={MedicineDetails}
        />

        <Stack.Screen
          name="Cart"
          component={CartScreen}
        />

        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
        />

        <Stack.Screen
          name="Wishlist"
          component={WishlistScreen}
        />

        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
        />

        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
        />

        {/* ==================================
            SHOPKEEPER
        =================================== */}

        <Stack.Screen
  name="ShopkeeperHome"
  component={ShopkeeperDrawerNavigator}
/>
        <Stack.Screen
          name="ShopkeeperMedicines"
          component={ShopkeeperMedicinesList}
        />

        <Stack.Screen
          name="ShopkeeperAddMedicine"
          component={ShopkeeperAddMedicineScreen}
        />

        <Stack.Screen
          name="ShopkeeperOrders"
          component={ShopkeeperOrdersScreen}
        />

        <Stack.Screen
          name="ShopkeeperOrderDetails"
          component={ShopkeeperOrdersDetailsScreen}
        />

        {/* ==================================
            DISTRIBUTOR
        =================================== */}

        <Stack.Screen
          name="DistributorHome"
          component={DistributorHomeScreen}
        />

        <Stack.Screen
          name="DistributorMedicines"
          component={DistributorMedicines}
        />

        <Stack.Screen
          name="DistributorAddMedicine"
          component={DistributorAddMedicineScreen}
        />

        <Stack.Screen
          name="DistributorOrders"
          component={DistributorOrdersScreen}
        />

        <Stack.Screen
          name="DistributorOrderDetails"
          component={DistributorOrderDetailsScreen}
        />
    
      </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
}