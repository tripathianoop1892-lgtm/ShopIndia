import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./SettingsScreenStyles";
import AppHeader from "../../components/headers/AppHeader";

export default function SettingsScreen({ navigation }) {
  const handleComingSoon = (title) => {
    Alert.alert(
      title,
      "This feature will be available soon."
    );
  };

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
          onPress: () => {
            navigation.reset({
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

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Settings"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ACCOUNT SETTINGS */}

        <Text style={styles.sectionTitle}>
          Account Settings
        </Text>

        <View style={styles.settingsCard}>
          <TouchableOpacity
            style={styles.settingRow}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(
                "EditProfile"
              )
            }
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="person-outline"
                size={21}
                color="#2E7D32"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Edit Profile
              </Text>

              <Text style={styles.settingSubtitle}>
                Update your personal information
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#999999"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            activeOpacity={0.7}
            onPress={() =>
              handleComingSoon(
                "Change Password"
              )
            }
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={21}
                color="#2E7D32"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Change Password
              </Text>

              <Text style={styles.settingSubtitle}>
                Update your account password
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#999999"
            />
          </TouchableOpacity>
        </View>

        {/* APP SETTINGS */}

        <Text style={styles.sectionTitle}>
          App Settings
        </Text>

        <View style={styles.settingsCard}>
          <TouchableOpacity
            style={styles.settingRow}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(
                "Notification"
              )
            }
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="notifications-outline"
                size={21}
                color="#2E7D32"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Notifications
              </Text>

              <Text style={styles.settingSubtitle}>
                Manage notification preferences
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#999999"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            activeOpacity={0.7}
            onPress={() =>
              handleComingSoon("Help & Support")
            }
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="help-circle-outline"
                size={21}
                color="#2E7D32"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                Help & Support
              </Text>

              <Text style={styles.settingSubtitle}>
                Get help with Om Sanjeevani
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#999999"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            activeOpacity={0.7}
            onPress={() =>
              handleComingSoon("About App")
            }
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="information-circle-outline"
                size={21}
                color="#2E7D32"
              />
            </View>

            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>
                About Om Sanjeevani
              </Text>

              <Text style={styles.settingSubtitle}>
                App version and information
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color="#999999"
            />
          </TouchableOpacity>
        </View>

        {/* LOGOUT */}

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#E53935"
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}