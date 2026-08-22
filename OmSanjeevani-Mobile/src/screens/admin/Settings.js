import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import styles from "./SettingsStyles";

const Settings = () => {
  const [websiteName, setWebsiteName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const [commission, setCommission] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [gst, setGst] = useState("");

  const handleSaveGeneral = () => {
    Alert.alert(
      "Settings",
      "General Settings save API will be connected later."
    );
  };

  const handleSavePlatform = () => {
    Alert.alert(
      "Settings",
      "Platform Settings update API will be connected later."
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Manage your platform settings
        </Text>
      </View>

      {/* GENERAL SETTINGS */}

      <View style={styles.settingCard}>
        <Text style={styles.cardTitle}>
          General Settings
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Website Name
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Omsanjeevni"
            value={websiteName}
            onChangeText={setWebsiteName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Admin Email
          </Text>

          <TextInput
            style={styles.input}
            placeholder="admin@gmail.com"
            value={adminEmail}
            onChangeText={setAdminEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Contact Number
          </Text>

          <TextInput
            style={styles.input}
            placeholder="+91 9876543210"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Address
          </Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter Address"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveGeneral}
        >
          <Text style={styles.saveButtonText}>
            Save Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* PLATFORM SETTINGS */}

      <View style={styles.settingCard}>
        <Text style={styles.cardTitle}>
          Platform Settings
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Platform Commission (%)
          </Text>

          <TextInput
            style={styles.input}
            placeholder="5"
            value={commission}
            onChangeText={setCommission}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Delivery Charge (₹)
          </Text>

          <TextInput
            style={styles.input}
            placeholder="50"
            value={deliveryCharge}
            onChangeText={setDeliveryCharge}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            GST (%)
          </Text>

          <TextInput
            style={styles.input}
            placeholder="18"
            value={gst}
            onChangeText={setGst}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSavePlatform}
        >
          <Text style={styles.saveButtonText}>
            Update Platform
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Settings;