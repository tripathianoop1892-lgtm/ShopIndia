import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./EditProfileScreenStyles";

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // LOAD USER DATA
  // ==========================================

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");

      if (userData) {
        const user = JSON.parse(userData);

        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setShopName(user.shopName || "");
        setAddress(user.address || "");
      }
    } catch (error) {
      console.log("Load Profile Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Required", "Please enter your email.");
      return;
    }

    setSaving(true);

    try {
      const oldUserData = await AsyncStorage.getItem("user");

      const oldUser = oldUserData
        ? JSON.parse(oldUserData)
        : {};

      const updatedUser = {
        ...oldUser,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        shopName: shopName.trim(),
        address: address.trim(),
      };

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      Alert.alert(
        "Success",
        "Profile updated successfully.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      console.log("Save Profile Error:", error);

      Alert.alert(
        "Error",
        "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#008C3A"
        />

        <Text style={styles.loadingText}>
          Loading profile...
        </Text>
      </View>
    );
  }

  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      {/* ======================================
          HEADER
      ======================================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#222222"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Edit Profile
        </Text>

        <View style={styles.headerRight} />
      </View>

      {/* ======================================
          FORM
      ======================================= */}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* PROFILE ICON */}

        <View style={styles.profileIconContainer}>
          <View style={styles.profileIcon}>
            <Ionicons
              name="person"
              size={42}
              color="#008C3A"
            />
          </View>

          <Text style={styles.profileTitle}>
            Personal Information
          </Text>

          <Text style={styles.profileSubtitle}>
            Update your shopkeeper profile details
          </Text>
        </View>

        {/* NAME */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Full Name
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#777777"
            />

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#999999"
            />
          </View>
        </View>

        {/* EMAIL */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Email
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#777777"
            />

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              placeholderTextColor="#999999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* PHONE */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Phone Number
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="call-outline"
              size={20}
              color="#777777"
            />

            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              placeholderTextColor="#999999"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>

        {/* SHOP NAME */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Shop Name
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="storefront-outline"
              size={20}
              color="#777777"
            />

            <TextInput
              style={styles.input}
              value={shopName}
              onChangeText={setShopName}
              placeholder="Enter shop name"
              placeholderTextColor="#999999"
            />
          </View>
        </View>

        {/* ADDRESS */}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Shop Address
          </Text>

          <View
            style={[
              styles.inputContainer,
              styles.addressContainer,
            ]}
          >
            <Ionicons
              name="location-outline"
              size={20}
              color="#777777"
              style={styles.addressIcon}
            />

            <TextInput
              style={[
                styles.input,
                styles.addressInput,
              ]}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter shop address"
              placeholderTextColor="#999999"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* SAVE BUTTON */}

        <TouchableOpacity
          style={[
            styles.saveButton,
            saving && styles.disabledButton,
          ]}
          activeOpacity={0.8}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
            />
          ) : (
            <>
              <Ionicons
                name="checkmark-circle-outline"
                size={21}
                color="#FFFFFF"
              />

              <Text style={styles.saveButtonText}>
                Save Changes
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* CANCEL */}

        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}