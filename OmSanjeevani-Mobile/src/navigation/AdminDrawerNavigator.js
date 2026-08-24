import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AdminDashboard from "../screens/admin/Dashboard";
import Users from "../screens/admin/Users";
import Shopkeepers from "../screens/admin/Shopkeepers";
import Distributors from "../screens/admin/Distributors";
import Medicines from "../screens/admin/Medicines";
import Orders from "../screens/admin/Orders";
import Categories from "../screens/admin/Categories";
import Payments from "../screens/admin/Payments";
import Reports from "../screens/admin/Reports";
import Coupons from "../screens/admin/Coupons/Coupons";
import Banner from "../screens/admin/Banner";
import Reviews from "../screens/admin/Reviews";
import Notifications from "../screens/admin/Notifications";
import Support from "../screens/admin/Support";
import Settings from "../screens/admin/Settings";
import Profile from "../screens/admin/Profile";

import styles from "./AdminDrawerNavigatorStyles";

const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props) => {

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",

          onPress: async () => {
            try {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("user");

              props.navigation.getParent()?.reset({
                index: 0,
                routes: [
                  {
                    name: "Login",
                  },
                ],
              });

            } catch (error) {
              console.error("LOGOUT ERROR:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.drawerContainer}>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.7}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

    </View>
  );
};
const AdminDrawerNavigator = () => {
  return (
    <Drawer.Navigator
  initialRouteName="AdminDashboard"

  drawerContent={(props) => (
    <CustomDrawerContent {...props} />
  )}

  screenOptions={({ navigation }) => ({

        headerShown: true,

        drawerActiveTintColor: "#2E7D32",
        drawerInactiveTintColor: "#555",

        drawerStyle: styles.drawer,

        headerStyle: styles.header,

        headerTintColor: "#FFFFFF",
      headerRight: () => (
  <View style={styles.headerRightContainer}>
    
    <TouchableOpacity
      style={styles.headerIconButton}
      activeOpacity={0.7}
     onPress={() => navigation.navigate("Profile")}
    >
      <Ionicons
        name="person-circle-outline"
        size={32}
        color="#FFFFFF"
      />
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.headerIconButton}
      activeOpacity={0.7}
     onPress={() => navigation.navigate("Notifications")}
    >
      <Ionicons
        name="notifications-outline"
        size={28}
        color="#FFFFFF"
      />
    </TouchableOpacity>

  </View>
),

        drawerLabelStyle: styles.drawerLabel,

        drawerActiveBackgroundColor: "#E8F5E9",

       drawerItemStyle: styles.drawerItem,
})}
    >
      <Drawer.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{ title: "Dashboard" }}
      />

      <Drawer.Screen
        name="Users"
        component={Users}
        options={{ title: "Users" }}
      />

      <Drawer.Screen
        name="Shopkeepers"
        component={Shopkeepers}
        options={{ title: "Shopkeepers" }}
      />

      <Drawer.Screen
        name="Distributors"
        component={Distributors}
        options={{ title: "Distributors" }}
      />

      <Drawer.Screen
        name="Medicines"
        component={Medicines}
        options={{ title: "Medicines" }}
      />

      <Drawer.Screen
        name="Orders"
        component={Orders}
        options={{ title: "Orders" }}
      />

      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={{ title: "Categories" }}
      />

      <Drawer.Screen
        name="Payments"
        component={Payments}
        options={{ title: "Payments" }}
      />

      <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{ title: "Reports" }}
      />

      <Drawer.Screen
        name="Coupons"
        component={Coupons}
        options={{ title: "Coupons" }}
      />

      <Drawer.Screen
        name="Banner"
        component={Banner}
        options={{ title: "Banner" }}
      />

      <Drawer.Screen
        name="Reviews"
        component={Reviews}
        options={{ title: "Reviews" }}
      />

      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: "Notifications" }}
      />

      <Drawer.Screen
        name="Support"
        component={Support}
        options={{ title: "Support" }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings" }}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ title: "My Profile" }}
      />
    </Drawer.Navigator>
  );
};

export default AdminDrawerNavigator;