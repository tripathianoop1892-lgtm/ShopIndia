import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./LogoutScreenStyles";

export default function LogoutScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout from Om Sanjeevani?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => navigation.goBack(),
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              // Remove authentication data
              await AsyncStorage.multiRemove([
                "token",
                "user",
              ]);

              // Reset navigation completely
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "Login",
                  },
                ],
              });

            } catch (error) {
              console.error(
                "LOGOUT ERROR:",
                error
              );

              Alert.alert(
                "Logout Error",
                "Unable to logout. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <View style={styles.iconContainer}>
          <Ionicons
            name="log-out-outline"
            size={64}
            color="#D32F2F"
          />
        </View>

        <Text style={styles.title}>
          Logout
        </Text>

        <Text style={styles.message}>
          Are you sure you want to logout from your account?
        </Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.logoutButtonText}>
            Logout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}