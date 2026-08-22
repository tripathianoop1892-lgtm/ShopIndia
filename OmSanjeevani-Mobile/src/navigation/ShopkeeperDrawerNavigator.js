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


import styles from "./ShopkeeperDrawerNavigatorStyles";

// ==========================================
// SHOPKEEPER SCREENS
// ==========================================

import DashboardScreen from "../screens/shopkeeper/DashboardScreen";
import AddMedicineScreen from "../screens/shopkeeper/AddMedicineScreen";
import MedicineListScreen from "../screens/shopkeeper/MedicineListScreen";
import OrdersScreen from "../screens/shopkeeper/OrdersScreen";
import OrdersDetailsScreen from "../screens/shopkeeper/OrdersDetailsScreen";
import PrescriptionScreen from "../screens/shopkeeper/PrescriptionScreen";
import EarningsScreen from "../screens/shopkeeper/EarningsScreen";
import ProfileScreen from "../screens/shopkeeper/ProfileScreen";
import EditProfileScreen from "../screens/shopkeeper/EditProfileScreen";
import SettingsScreen from "../screens/shopkeeper/SettingsScreen";
import NotificationScreen from "../screens/shopkeeper/NotificationScreen";
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
    const handlePress = () => {
      navigation.navigate(screen);
      navigation.closeDrawer();
    };

    return (
      <TouchableOpacity
        style={styles.menuItem}
        activeOpacity={0.7}
        onPress={handlePress}
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
          HEADER
      =================================== */}

      <View style={styles.drawerHeader}>

        <Image
          source={require("../assets/omsanjeevani.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.menuTitle}>
          Shopkeeper Menu
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
          screen="ShopkeeperDashboard"
        />

        {/* Medicines */}

        <MenuItem
          icon="medical-outline"
          label="Medicines"
          screen="ShopkeeperMedicines"
        />

        {/* Add Medicine */}

        <MenuItem
          icon="add-circle-outline"
          label="Add Medicine"
          screen="ShopkeeperAddMedicine"
        />

        {/* Orders */}

        <MenuItem
          icon="cube-outline"
          label="Orders"
          screen="ShopkeeperOrders"
        />

        {/* Prescription */}

        <MenuItem
          icon="document-text-outline"
          label="Prescriptions"
          screen="ShopkeeperPrescription"
        />

        {/* Earnings */}

        <MenuItem
          icon="cash-outline"
          label="Earnings"
          screen="ShopkeeperEarnings"
        />

        {/* Profile */}

        <MenuItem
          icon="person-outline"
          label="Profile"
          screen="ShopkeeperProfile"
        />

        {/* Settings */}

        <MenuItem
          icon="settings-outline"
          label="Settings"
          screen="ShopkeeperSettings"
        />
       
       <MenuItem
  icon="settings-outline"
  label="Settings"
  screen="ShopkeeperSettings"
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
// SHOPKEEPER DRAWER NAVIGATOR
// ==========================================

export default function ShopkeeperDrawerNavigator() {
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
        name="ShopkeeperDashboard"
        component={DashboardScreen}
      />

      {/* ==================================
          MEDICINES
      =================================== */}

      <Drawer.Screen
        name="ShopkeeperMedicines"
        component={MedicineListScreen}
      />

      {/* ==================================
          ADD MEDICINE
      =================================== */}

      <Drawer.Screen
        name="ShopkeeperAddMedicine"
        component={AddMedicineScreen}
      />

      {/* ==================================
          ORDERS
      =================================== */}

      <Drawer.Screen
        name="ShopkeeperOrders"
        component={OrdersScreen}
      />

      {/* ==================================
          ORDER DETAILS
      =================================== */}

      <Drawer.Screen
        name="ShopkeeperOrderDetails"
        component={OrdersDetailsScreen}
      />

      {/* ==================================
          PRESCRIPTION
      =================================== */}

      <Drawer.Screen
        name="ShopkeeperPrescription"
        component={PrescriptionScreen}
      />

      {/* ==================================
          EARNINGS
      =================================== */}

      <Drawer.Screen
        name="ShopkeeperEarnings"
        component={EarningsScreen}
      />

      {/* ==================================
          PROFILE
      =================================== */}

      <Drawer.Screen
        name="ShopkeeperProfile"
        component={ProfileScreen}
      />

      {/* ==================================
          EDIT PROFILE
      =================================== */}

      <Drawer.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />

      {/* ==================================
          SETTINGS
      =================================== */}

      <Drawer.Screen
        name="ShopkeeperSettings"
        component={SettingsScreen}
      />
     
     {/* ==================================
    NOTIFICATION
=================================== */}

<Drawer.Screen
  name="ShopkeeperNotification"
  component={NotificationScreen}
/>

    </Drawer.Navigator>
  );
}