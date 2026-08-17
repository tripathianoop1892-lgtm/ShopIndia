import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./AppHeaderStyles";

export default function AppHeader({
  title = "Om Sanjeevani",
  userName = "",
  showNotification = true,
  showProfile = true,
  onMenuPress,
  onNotificationPress,
  onProfilePress,
}) {
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
  <TouchableOpacity
    style={styles.iconButton}
    onPress={onMenuPress}
  >
    <Ionicons
      name="menu-outline"
      size={28}
      color="#2E7D32"
    />
  </TouchableOpacity>

  <Image
          source={require("../../assets/omsanjeevani.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          {userName ? (
            <Text style={styles.userName}>
              Welcome, {userName}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {showNotification && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onNotificationPress}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#2E7D32"
            />
          </TouchableOpacity>
        )}

        {showProfile && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onProfilePress}
          >
            <Ionicons
              name="person-circle-outline"
              size={34}
              color="#2E7D32"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}