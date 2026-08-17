import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./SettingsScreenStyles";


// ==========================================
// SETTINGS SCREEN
// ==========================================

export default function SettingsScreen({
  navigation,
}) {

  const [notifications, setNotifications] =
    useState(true);

  const [orderAlerts, setOrderAlerts] =
    useState(true);

  const [prescriptionAlerts, setPrescriptionAlerts] =
    useState(true);


  // ==========================================
  // SETTING ROW
  // ==========================================

  const SettingRow = ({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
  }) => {
    return (
      <View style={styles.settingRow}>

        <View style={styles.settingIcon}>
          <Ionicons
            name={icon}
            size={23}
            color="#008C3A"
          />
        </View>

        <View style={styles.settingInfo}>

          <Text style={styles.settingTitle}>
            {title}
          </Text>

          <Text style={styles.settingSubtitle}>
            {subtitle}
          </Text>

        </View>

        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: "#D5D5D5",
            true: "#A8DDB9",
          }}
          thumbColor={
            value ? "#008C3A" : "#F4F4F4"
          }
        />

      </View>
    );
  };


  // ==========================================
  // ACTION ROW
  // ==========================================

  const ActionRow = ({
    icon,
    title,
    subtitle,
    onPress,
  }) => {
    return (
      <TouchableOpacity
        style={styles.actionRow}
        activeOpacity={0.7}
        onPress={onPress}
      >

        <View style={styles.settingIcon}>
          <Ionicons
            name={icon}
            size={23}
            color="#008C3A"
          />
        </View>

        <View style={styles.settingInfo}>

          <Text style={styles.settingTitle}>
            {title}
          </Text>

          <Text style={styles.settingSubtitle}>
            {subtitle}
          </Text>

        </View>

        <Ionicons
          name="chevron-forward-outline"
          size={21}
          color="#999999"
        />

      </TouchableOpacity>
    );
  };


  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Ionicons
            name="menu-outline"
            size={28}
            color="#008C3A"
          />
        </TouchableOpacity>


        <View style={styles.headerTitleContainer}>

          <Text style={styles.headerTitle}>
            Settings
          </Text>

          <Text style={styles.headerSubtitle}>
            Manage your preferences
          </Text>

        </View>

      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >

        {/* NOTIFICATIONS */}

        <Text style={styles.sectionTitle}>
          Notifications
        </Text>

        <View style={styles.sectionCard}>

          <SettingRow
            icon="notifications-outline"
            title="Notifications"
            subtitle="Receive app notifications"
            value={notifications}
            onValueChange={setNotifications}
          />

          <View style={styles.divider} />

          <SettingRow
            icon="cube-outline"
            title="Order Alerts"
            subtitle="Get alerts for new orders"
            value={orderAlerts}
            onValueChange={setOrderAlerts}
          />

          <View style={styles.divider} />

          <SettingRow
            icon="document-text-outline"
            title="Prescription Alerts"
            subtitle="Get alerts for prescriptions"
            value={prescriptionAlerts}
            onValueChange={
              setPrescriptionAlerts
            }
          />

        </View>


        {/* ACCOUNT */}

        <Text style={styles.sectionTitle}>
          Account
        </Text>

        <View style={styles.sectionCard}>

          <ActionRow
            icon="person-outline"
            title="Edit Profile"
            subtitle="Update shopkeeper profile"
            onPress={() => {
              navigation.navigate(
                "ShopkeeperEditProfile"
              );
            }}
          />

          <View style={styles.divider} />

          <ActionRow
            icon="lock-closed-outline"
            title="Change Password"
            subtitle="Update your account password"
            onPress={() => {
              Alert.alert(
                "Change Password",
                "Password change option will be connected here."
              );
            }}
          />

        </View>


        {/* APP */}

        <Text style={styles.sectionTitle}>
          App
        </Text>

        <View style={styles.sectionCard}>

          <ActionRow
            icon="information-circle-outline"
            title="About Om Sanjeevani"
            subtitle="Application information"
            onPress={() => {
              Alert.alert(
                "Om Sanjeevani",
                "Pharmacy Marketplace"
              );
            }}
          />

          <View style={styles.divider} />

          <ActionRow
            icon="shield-checkmark-outline"
            title="Privacy & Security"
            subtitle="Privacy and security information"
            onPress={() => {
              Alert.alert(
                "Privacy & Security",
                "Your account and application data are protected."
              );
            }}
          />

        </View>


        <Text style={styles.version}>
          Om Sanjeevani • Shopkeeper
        </Text>

      </ScrollView>

    </View>
  );
}