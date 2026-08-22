import React from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import Dashboard from "../screens/distributor/Dashboard";
import AddMedicineScreen from "../screens/distributor/AddMedicineScreen";
import MedicinesList from "../screens/distributor/MedicinesList";
import OrdersScreen from "../screens/distributor/OrdersScreen";
import EarningsScreen from "../screens/distributor/EarningsScreen";
import LowStockAlertScreen from "../screens/distributor/LowStockAlertScreen";
import ExpiryAlertScreen from "../screens/distributor/ExpiryAlertScreen";
import NotificationScreen from "../screens/distributor/NotificationScreen";
import ProfileScreen from "../screens/distributor/ProfileScreen";
import SettingsScreen from "../screens/distributor/SettingsScreen";
import LogoutScreen from "../screens/distributor/LogoutScreen";
import DistributorDrawerNavigatorStyles from "./DistributorDrawerNavigatorStyles";

import EditProfileScreen from "../screens/distributor/EditProfileScreen";
const Drawer = createDrawerNavigator();

const CustomDrawerLabel = ({ label }) => (
  <Text
    style={
      DistributorDrawerNavigatorStyles.drawerLabel
    }
  >
    {label}
  </Text>
);

export default function DistributorDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#2E7D32",
        drawerInactiveTintColor: "#666666",
        drawerStyle:
          DistributorDrawerNavigatorStyles.drawer,
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerLabel: () => (
            <CustomDrawerLabel label="Dashboard" />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="grid-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="AddMedicine"
        component={AddMedicineScreen}
        options={{
          drawerLabel: () => (
            <CustomDrawerLabel label="Add Medicine" />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="MedicinesList"
        component={MedicinesList}
        options={{
          drawerLabel: () => (
            <CustomDrawerLabel label="Medicine List" />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="medkit-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          drawerLabel: () => (
            <CustomDrawerLabel label="Orders" />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="receipt-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Earnings"
        component={EarningsScreen}
        options={{
          drawerLabel: () => (
            <CustomDrawerLabel label="Earnings" />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="wallet-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="LowStockAlert"
        component={LowStockAlertScreen}
        options={{
          drawerLabel: () => (
            <CustomDrawerLabel label="Low Stock Alert" />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="alert-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="ExpiryAlert"
        component={ExpiryAlertScreen}
        options={{
          drawerLabel: () => (
            <CustomDrawerLabel label="Expiry Alert" />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          drawerLabel: () => (
            <CustomDrawerLabel label="Notifications" />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="notifications-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: () => (
            <CustomDrawerLabel label="My Profile" />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
  name="EditProfile"
  component={EditProfileScreen}
  options={{
    drawerItemStyle: {
      display: "none",
    },
  }}
/>

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: () => (
            <CustomDrawerLabel label="Settings" />
          ),
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
  name="Logout"
  component={LogoutScreen}
  options={{
    drawerLabel: () => (
      <CustomDrawerLabel label="Logout" />
    ),
    drawerIcon: ({ color, size }) => (
      <Ionicons
        name="log-out-outline"
        size={size}
        color={color}
      />
    ),
  }}
/>
    </Drawer.Navigator>
  );
}