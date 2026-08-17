import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./SettingsScreenStyles";

// ==========================================
// STORAGE KEY
// ==========================================

const SETTINGS_KEY = "@omsanjeevani_customer_settings";

// ==========================================
// SETTINGS SCREEN
// ==========================================

export default function SettingsScreen({ navigation }) {
  // ========================================
  // SETTINGS STATE
  // ========================================

  const [notifications, setNotifications] =
    useState(true);

  const [orderUpdates, setOrderUpdates] =
    useState(true);

  const [promotionalNotifications, setPromotionalNotifications] =
    useState(true);

  const [sound, setSound] =
    useState(true);

  // ========================================
  // LOAD SETTINGS
  // ========================================

  useEffect(() => {
    loadSettings();
  }, []);

  // ========================================
  // LOAD SAVED SETTINGS
  // ========================================

  const loadSettings = async () => {
    try {
      const savedSettings =
        await AsyncStorage.getItem(SETTINGS_KEY);

      if (!savedSettings) {
        return;
      }

      const settings =
        JSON.parse(savedSettings);

      setNotifications(
        settings.notifications ?? true
      );

      setOrderUpdates(
        settings.orderUpdates ?? true
      );

      setPromotionalNotifications(
        settings.promotionalNotifications ?? true
      );

      setSound(
        settings.sound ?? true
      );
    } catch (error) {
      console.error(
        "Load Settings Error:",
        error
      );
    }
  };

  // ========================================
  // SAVE SETTINGS
  // ========================================

  const saveSettings = async (
    updatedSettings
  ) => {
    try {
      await AsyncStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(updatedSettings)
      );
    } catch (error) {
      console.error(
        "Save Settings Error:",
        error
      );
    }
  };

  // ========================================
  // NOTIFICATIONS
  // ========================================

  const handleNotificationsChange = (
    value
  ) => {
    setNotifications(value);

    saveSettings({
      notifications: value,
      orderUpdates,
      promotionalNotifications,
      sound,
    });
  };

  // ========================================
  // ORDER UPDATES
  // ========================================

  const handleOrderUpdatesChange = (
    value
  ) => {
    setOrderUpdates(value);

    saveSettings({
      notifications,
      orderUpdates: value,
      promotionalNotifications,
      sound,
    });
  };

  // ========================================
  // PROMOTIONAL NOTIFICATIONS
  // ========================================

  const handlePromotionalChange = (
    value
  ) => {
    setPromotionalNotifications(value);

    saveSettings({
      notifications,
      orderUpdates,
      promotionalNotifications: value,
      sound,
    });
  };

  // ========================================
  // SOUND
  // ========================================

  const handleSoundChange = (value) => {
    setSound(value);

    saveSettings({
      notifications,
      orderUpdates,
      promotionalNotifications,
      sound: value,
    });
  };

  // ========================================
  // RESET SETTINGS
  // ========================================

  const handleResetSettings = () => {
    Alert.alert(
      "Reset Settings",
      "Are you sure you want to restore all settings to default?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",

          onPress: async () => {
            try {
              const defaultSettings = {
                notifications: true,
                orderUpdates: true,
                promotionalNotifications: true,
                sound: true,
              };

              await AsyncStorage.setItem(
                SETTINGS_KEY,
                JSON.stringify(
                  defaultSettings
                )
              );

              setNotifications(true);
              setOrderUpdates(true);
              setPromotionalNotifications(
                true
              );
              setSound(true);

              Alert.alert(
                "Settings Reset",
                "All settings have been restored to default."
              );
            } catch (error) {
              console.error(
                "Reset Settings Error:",
                error
              );

              Alert.alert(
                "Error",
                "Unable to reset settings."
              );
            }
          },
        },
      ]
    );
  };

  // ========================================
  // SETTING ROW
  // ========================================

  const SettingRow = ({
    icon,
    iconColor,
    title,
    subtitle,
    value,
    onValueChange,
  }) => {
    return (
      <View style={styles.settingRow}>
        {/* Icon */}

        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                `${iconColor}15`,
            },
          ]}
        >
          <Ionicons
            name={icon}
            size={22}
            color={iconColor}
          />
        </View>

        {/* Text */}

        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>
            {title}
          </Text>

          <Text style={styles.settingSubtitle}>
            {subtitle}
          </Text>
        </View>

        {/* Switch */}

        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: "#D5D5D5",
            true: "#9AD7AF",
          }}
          thumbColor={
            value
              ? "#008A35"
              : "#F4F4F4"
          }
        />
      </View>
    );
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {/* ==================================
            HEADER
        =================================== */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#222222"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Settings
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* ==================================
            NOTIFICATIONS
        =================================== */}

        <Text style={styles.sectionTitle}>
          Notifications
        </Text>

        <View style={styles.card}>
          <SettingRow
            icon="notifications-outline"
            iconColor="#008A35"
            title="Notifications"
            subtitle="Receive notifications from Om Sanjeevani"
            value={notifications}
            onValueChange={
              handleNotificationsChange
            }
          />

          <View style={styles.divider} />

          <SettingRow
            icon="cube-outline"
            iconColor="#1976D2"
            title="Order Updates"
            subtitle="Get updates about your orders"
            value={orderUpdates}
            onValueChange={
              handleOrderUpdatesChange
            }
          />

          <View style={styles.divider} />

          <SettingRow
            icon="pricetag-outline"
            iconColor="#8E24AA"
            title="Promotional Notifications"
            subtitle="Offers, discounts and new updates"
            value={
              promotionalNotifications
            }
            onValueChange={
              handlePromotionalChange
            }
          />

          <View style={styles.divider} />

          <SettingRow
            icon="volume-high-outline"
            iconColor="#F57C00"
            title="Notification Sound"
            subtitle="Play sound for notifications"
            value={sound}
            onValueChange={
              handleSoundChange
            }
          />
        </View>

        {/* ==================================
            ACCOUNT
        =================================== */}

        <Text style={styles.sectionTitle}>
          Account
        </Text>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.actionRow}
            activeOpacity={0.7}
            onPress={() => {
              Alert.alert(
                "Change Password",
                "Password change option will be connected here."
              );
            }}
          >
            <View
              style={[
                styles.iconContainer,
                styles.blueIcon,
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color="#1976D2"
              />
            </View>

            <View style={styles.settingInfo}>
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

        {/* ==================================
            APP INFORMATION
        =================================== */}

        <Text style={styles.sectionTitle}>
          App Information
        </Text>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <View
              style={[
                styles.iconContainer,
                styles.greenIcon,
              ]}
            >
              <Ionicons
                name="information-circle-outline"
                size={22}
                color="#008A35"
              />
            </View>

            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                App Version
              </Text>

              <Text style={styles.settingSubtitle}>
                Om Sanjeevani Mobile
              </Text>
            </View>

            <Text style={styles.versionText}>
              v1.0.0
            </Text>
          </View>
        </View>

        {/* ==================================
            RESET SETTINGS
        =================================== */}

        <TouchableOpacity
          style={styles.resetButton}
          activeOpacity={0.8}
          onPress={handleResetSettings}
        >
          <Ionicons
            name="refresh-outline"
            size={21}
            color="#D32F2F"
          />

          <Text style={styles.resetText}>
            Reset Settings
          </Text>
        </TouchableOpacity>

        {/* ==================================
            FOOTER
        =================================== */}

        <Text style={styles.footerText}>
          Om Sanjeevani Healthcare
        </Text>

        <Text style={styles.footerSubText}>
          CARE • HEAL • REVIVE
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}