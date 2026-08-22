import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./EditProfileScreenStyles";
import AppHeader from "../../components/headers/AppHeader";

export default function EditProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    companyName: "",
    warehouseAddress: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedUser =
        (await AsyncStorage.getItem("user")) ||
        (await AsyncStorage.getItem("userData"));

      if (storedUser) {
        const user = JSON.parse(storedUser);

        setForm({
          name: user?.name || "",
          email: user?.email || "",
          mobile: user?.mobile || "",
          companyName: user?.companyName || "",
          warehouseAddress: user?.warehouseAddress || "",
          address: user?.address || "",
          city: user?.city || "",
          district: user?.district || "",
          state: user?.state || "",
          pincode: user?.pincode || "",
        });
      }
    } catch (error) {
      console.log("PROFILE LOAD ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async () => {
    if (!form.name.trim()) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }

    if (!form.mobile.trim()) {
      Alert.alert("Required", "Please enter your mobile number.");
      return;
    }

    if (!form.companyName.trim()) {
      Alert.alert(
        "Required",
        "Please enter your company name."
      );
      return;
    }

    try {
      setSaving(true);

      const existingUser =
        (await AsyncStorage.getItem("user")) ||
        (await AsyncStorage.getItem("userData"));

      const parsedUser = existingUser
        ? JSON.parse(existingUser)
        : {};

      const updatedUser = {
        ...parsedUser,
        ...form,
      };

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(updatedUser)
      );

      Alert.alert(
        "Success",
        "Profile updated successfully."
      );
    } catch (error) {
      console.log("PROFILE SAVE ERROR:", error);

      Alert.alert(
        "Error",
        "Unable to update profile. Please try again."
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
      <SafeAreaView style={styles.container}>
        <AppHeader
          title="Edit Profile"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#2E7D32"
          />

          <Text style={styles.loadingText}>
            Loading profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Edit Profile"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ======================================
            PROFILE HEADER
        ======================================= */}

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons
              name="person-outline"
              size={40}
              color="#2E7D32"
            />
          </View>

          <Text style={styles.profileTitle}>
            Distributor Profile
          </Text>

          <Text style={styles.profileSubtitle}>
            Update your business and contact details
          </Text>
        </View>

        {/* ======================================
            PERSONAL INFORMATION
        ======================================= */}

        <Text style={styles.sectionTitle}>
          Personal Information
        </Text>

        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Full Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              placeholderTextColor="#999999"
              value={form.name}
              onChangeText={(value) =>
                handleChange("name", value)
              }
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Email Address
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.readOnlyInput,
              ]}
              value={form.email}
              editable={false}
            />
          </View>

          <View style={styles.formGroupLast}>
            <Text style={styles.label}>
              Mobile Number
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              placeholderTextColor="#999999"
              value={form.mobile}
              keyboardType="phone-pad"
              maxLength={10}
              onChangeText={(value) =>
                handleChange("mobile", value)
              }
            />
          </View>
        </View>

        {/* ======================================
            BUSINESS INFORMATION
        ======================================= */}

        <Text style={styles.sectionTitle}>
          Business Information
        </Text>

        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Company Name
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter company name"
              placeholderTextColor="#999999"
              value={form.companyName}
              onChangeText={(value) =>
                handleChange("companyName", value)
              }
            />
          </View>

          <View style={styles.formGroupLast}>
            <Text style={styles.label}>
              Warehouse Address
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.textArea,
              ]}
              placeholder="Enter warehouse address"
              placeholderTextColor="#999999"
              value={form.warehouseAddress}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              onChangeText={(value) =>
                handleChange(
                  "warehouseAddress",
                  value
                )
              }
            />
          </View>
        </View>

        {/* ======================================
            ADDRESS INFORMATION
        ======================================= */}

        <Text style={styles.sectionTitle}>
          Address Information
        </Text>

        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Address
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.textArea,
              ]}
              placeholder="Enter address"
              placeholderTextColor="#999999"
              value={form.address}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              onChangeText={(value) =>
                handleChange("address", value)
              }
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              City
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter city"
              placeholderTextColor="#999999"
              value={form.city}
              onChangeText={(value) =>
                handleChange("city", value)
              }
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              District
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter district"
              placeholderTextColor="#999999"
              value={form.district}
              onChangeText={(value) =>
                handleChange("district", value)
              }
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              State
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter state"
              placeholderTextColor="#999999"
              value={form.state}
              onChangeText={(value) =>
                handleChange("state", value)
              }
            />
          </View>

          <View style={styles.formGroupLast}>
            <Text style={styles.label}>
              Pincode
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter pincode"
              placeholderTextColor="#999999"
              value={form.pincode}
              keyboardType="number-pad"
              maxLength={6}
              onChangeText={(value) =>
                handleChange("pincode", value)
              }
            />
          </View>
        </View>

        {/* ======================================
            SAVE BUTTON
        ======================================= */}

        <TouchableOpacity
          style={[
            styles.saveButton,
            saving && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons
                name="save-outline"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.saveButtonText}>
                Save Changes
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}