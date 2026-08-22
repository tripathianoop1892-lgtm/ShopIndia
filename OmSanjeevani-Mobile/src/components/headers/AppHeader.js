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

  showBackButton = false,

  onMenuPress,
  onNotificationPress,
  onProfilePress,
  onBackPress,
}) {
  return (
    <View style={styles.container}>

      {/* Left Section */}
      <View style={styles.leftSection}>

        {/* BACK OR MENU BUTTON */}
        {showBackButton ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onBackPress}
          >
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color="#2E7D32"
            />
          </TouchableOpacity>
        ) : (
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
        )}

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

  {/* Profile */}
  {showProfile && (
    <TouchableOpacity
      style={styles.iconButton}
      onPress={onProfilePress}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}
    >
      <Ionicons
        name="person-circle-outline"
        size={30}
        color="#2E7D32"
      />
    </TouchableOpacity>
  )}

  {/* Notification */}
  {showNotification && (
    <TouchableOpacity
      style={styles.iconButton}
      onPress={onNotificationPress}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}
    >
      <Ionicons
        name="notifications-outline"
        size={24}
        color="#2E7D32"
      />
    </TouchableOpacity>
  )}

</View>
    </View>
  );
}