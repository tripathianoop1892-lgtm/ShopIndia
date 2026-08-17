import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView, 
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

import styles from "./CustomerDrawerNavigatorStyles";

// ==========================================
// CUSTOMER SCREENS
// ==========================================

import CustomerHomeScreen from "../screens/customer/CustomerHomeScreen";
import MedicineList from "../screens/customer/MedicineList";
import CartScreen from "../screens/customer/CartScreen";
import WishlistScreen from "../screens/customer/WishlistScreen";
import OrdersScreen from "../screens/customer/OrdersScreen";
import NotificationScreen from "../screens/customer/NotificationScreen";
import ProfileScreen from "../screens/customer/ProfileScreen";
import CustomerPrescription from "../screens/customer/CustomerPrescription";
import SettingsScreen from "../screens/customer/SettingsScreen";

// ==========================================
// DRAWER
// ==========================================

const Drawer = createDrawerNavigator();

// ==========================================
// CUSTOM DRAWER CONTENT
// ==========================================

function CustomDrawerContent(props) {
  const { navigation } = props;

  // ========================================
  // MENU ITEM
  // ========================================

  const MenuItem = ({
    icon,
    label,
    screen,
    iconColor = "#008C3A",
  }) => {
    return (
      <TouchableOpacity
        style={styles.menuItem}
        activeOpacity={0.7}
   onPress={() => {
  navigation.navigate(screen);
  navigation.closeDrawer();
}}
      >
        <Ionicons
          name={icon}
          size={23}
          color={iconColor}
          style={styles.menuIcon}
        />

        <Text style={styles.menuText}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  // ========================================
  // SIGN OUT
  // ========================================

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            navigation.getParent()?.reset({
              index: 0,
              routes: [
                {
                  name: "Login",
                },
              ],
            });
          },
        },
      ]
    );
  };

  // ========================================
  // DRAWER UI
  // ========================================

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* ==================================
          LOGO HEADER
      =================================== */}

      <View style={styles.drawerHeader}>
        <Image
          source={require("../assets/omsanjeevani.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.menuTitle}>
          Customer Menu
        </Text>

        <Text style={styles.menuSubtitle}>
          Om Sanjeevani
        </Text>
      </View>

      {/* ==================================
          MAIN MENU
      =================================== */}

      <View style={styles.menuContainer}>

        {/* Dashboard */}

        <MenuItem
          icon="home-outline"
          label="Dashboard"
          screen="CustomerDashboard"
        />

        {/* Medicines */}

        <MenuItem
          icon="medical-outline"
          label="Medicines"
          screen="MedicineList"
        />

        {/* Prescription */}

        <MenuItem
          icon="document-text-outline"
          label="Upload Prescription"
          screen="CustomerPrescription"
        />

        {/* Cart */}

        <MenuItem
          icon="cart-outline"
          label="Cart"
          screen="Cart"
        />

        {/* Wishlist */}

        <MenuItem
          icon="heart-outline"
          label="Wishlist"
          screen="Wishlist"
        />

        {/* Orders */}

        <MenuItem
          icon="cube-outline"
          label="Orders"
          screen="Orders"
        />

        {/* Notifications */}

        <MenuItem
          icon="notifications-outline"
          label="Notifications"
          screen="Notifications"
        />

        {/* Profile */}

        <MenuItem
          icon="person-outline"
          label="Profile"
          screen="Profile"
        />

        {/* Settings */}

        <MenuItem
          icon="settings-outline"
          label="Settings"
          screen="Settings"
        />

      </View>

      {/* ==================================
          BOTTOM SECTION
      =================================== */}

      <View style={styles.bottomContainer}>

        {/* Sign Out */}

        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
          onPress={handleSignOut}
        >
          <Ionicons
            name="log-out-outline"
            size={23}
            color="#E53935"
            style={styles.menuIcon}
          />

          <Text style={styles.signOutText}>
            Sign Out
          </Text>
        </TouchableOpacity>

      </View>
    </DrawerContentScrollView>
  );
}

// ==========================================
// CUSTOMER DRAWER NAVIGATOR
// ==========================================

export default function CustomerDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
        drawerType: "front",
        swipeEnabled: true,
      }}
    >

      {/* ==================================
          DASHBOARD
      =================================== */}

      <Drawer.Screen
        name="CustomerDashboard"
        component={CustomerHomeScreen}
      />

      {/* ==================================
          MEDICINES
      =================================== */}

      <Drawer.Screen
        name="MedicineList"
        component={MedicineList}
      />

      {/* ==================================
          PRESCRIPTION
      =================================== */}

      <Drawer.Screen
        name="CustomerPrescription"
        component={CustomerPrescription}
      />

      {/* ==================================
          CART
      =================================== */}

      <Drawer.Screen
        name="Cart"
        component={CartScreen}
      />

      {/* ==================================
          WISHLIST
      =================================== */}

      <Drawer.Screen
        name="Wishlist"
        component={WishlistScreen}
      />

      {/* ==================================
          ORDERS
      =================================== */}

      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
      />

      {/* ==================================
          NOTIFICATIONS
      =================================== */}

      <Drawer.Screen
        name="Notifications"
        component={NotificationScreen}
      />

      {/* ==================================
          PROFILE
      =================================== */}

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
      />

      {/* ==================================
          SETTINGS
      =================================== */}

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />

    </Drawer.Navigator>
  );
}