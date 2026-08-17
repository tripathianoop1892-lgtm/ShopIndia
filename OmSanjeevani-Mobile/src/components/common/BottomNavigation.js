import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import styles from "./BottomNavigationStyles";

export default function BottomNavigation({
  activeTab = "Home",
  onHomePress,
  onWishlistPress,
  onCartPress,
  onOrdersPress,
  onProfilePress,
}) {
  return (
    <View style={styles.container}>

      {/* Home */}

      <TouchableOpacity
        style={styles.item}
        onPress={onHomePress}
      >
        <Ionicons
          name={activeTab === "Home" ? "home" : "home-outline"}
          size={24}
          color={activeTab === "Home" ? "#2E7D32" : "#777777"}
        />

        <Text
          style={[
            styles.label,
            activeTab === "Home" && styles.activeLabel,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Wishlist */}

      <TouchableOpacity
        style={styles.item}
        onPress={onWishlistPress}
      >
        <Ionicons
          name={activeTab === "Wishlist" ? "heart" : "heart-outline"}
          size={24}
          color={activeTab === "Wishlist" ? "#2E7D32" : "#777777"}
        />

        <Text
          style={[
            styles.label,
            activeTab === "Wishlist" && styles.activeLabel,
          ]}
        >
          Wishlist
        </Text>
      </TouchableOpacity>

      {/* Cart */}

      <TouchableOpacity
        style={styles.item}
        onPress={onCartPress}
      >
        <Ionicons
          name={activeTab === "Cart" ? "cart" : "cart-outline"}
          size={24}
          color={activeTab === "Cart" ? "#2E7D32" : "#777777"}
        />

        <Text
          style={[
            styles.label,
            activeTab === "Cart" && styles.activeLabel,
          ]}
        >
          Cart
        </Text>
      </TouchableOpacity>

      {/* Orders */}

      <TouchableOpacity
        style={styles.item}
        onPress={onOrdersPress}
      >
        <Ionicons
          name={activeTab === "Orders" ? "cube" : "cube-outline"}
          size={24}
          color={activeTab === "Orders" ? "#2E7D32" : "#777777"}
        />

        <Text
          style={[
            styles.label,
            activeTab === "Orders" && styles.activeLabel,
          ]}
        >
          Orders
        </Text>
      </TouchableOpacity>

      {/* Profile */}

      <TouchableOpacity
        style={styles.item}
        onPress={onProfilePress}
      >
        <Ionicons
          name={activeTab === "Profile" ? "person" : "person-outline"}
          size={24}
          color={activeTab === "Profile" ? "#2E7D32" : "#777777"}
        />

        <Text
          style={[
            styles.label,
            activeTab === "Profile" && styles.activeLabel,
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>

    </View>
  );
}