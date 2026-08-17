import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Image,
} from "react-native";

import styles from "./RegisterScreenStyles";

import CustomInput from "../../components/inputs/CustomInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import RoleSelector from "../../components/auth/RoleSelector";
import AddressForm from "../../components/auth/AddressForm";
import ShopkeeperFields from "../../components/auth/ShopkeeperFields";
import DistributorFields from "../../components/auth/DistributorFields";
import ShopSelector from "../../components/auth/ShopSelector";

import { registerUser } from "../../services/api";

export default function RegisterScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",

    role: "customer",

    state: "",
    district: "",
    city: "",
    pincode: "",
    address: "",

    shopId: "",
    shopName: "",

    gstNumber: "",
    drugLicense: "",

    companyName: "",
    warehouseAddress: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRegister = async () => {
    if (!form.name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!form.mobile.trim()) {
      alert("Please enter mobile number");
      return;
    }

    if (!form.email.trim()) {
      alert("Please enter email");
      return;
    }

    if (!form.password.trim()) {
      alert("Please enter password");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    // Customer ke liye Medical Shop compulsory
    if (form.role === "customer" && !form.shopId) {
      alert("Please select your medical shop");
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser(form);

      console.log("REGISTER RESPONSE:", res);

      if (res?.success) {
        alert("Registration Successful ✅");
        navigation.replace("Login");
      } else {
        alert(res?.message || "Registration failed");
      }
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Image
            source={require("../../assets/omsanjeevani.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Register to continue with Om Sanjeevani
          </Text>

          {/* Full Name */}
          <CustomInput
            label="Full Name"
            placeholder="Enter Full Name"
            value={form.name}
            onChangeText={(text) =>
              handleChange("name", text)
            }
          />

          {/* Mobile */}
          <CustomInput
            label="Mobile Number"
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={form.mobile}
            onChangeText={(text) =>
              handleChange("mobile", text)
            }
          />

          {/* Email */}
          <CustomInput
            label="Email"
            placeholder="Enter Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(text) =>
              handleChange("email", text)
            }
          />

          {/* Password */}
          <CustomInput
            label="Password"
            placeholder="Enter Password"
            secureTextEntry
            value={form.password}
            onChangeText={(text) =>
              handleChange("password", text)
            }
          />

          {/* Confirm Password */}
          <CustomInput
            label="Confirm Password"
            placeholder="Confirm Password"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(text) =>
              handleChange("confirmPassword", text)
            }
          />

          {/* Role */}
          <RoleSelector
            value={form.role}
            onChange={(role) =>
              handleChange("role", role)
            }
          />

          {/* Address */}
          <AddressForm
            form={form}
            handleChange={handleChange}
          />

          {/* ================================= */}
          {/* MEDICAL SHOP - CUSTOMER ONLY */}
          {/* ================================= */}

          {form.role === "customer" && (
            <ShopSelector
              form={form}
              handleChange={handleChange}
            />
          )}

          {/* ================================= */}
          {/* SHOPKEEPER FIELDS */}
          {/* ================================= */}

          {form.role === "shopkeeper" && (
            <ShopkeeperFields
              form={form}
              handleChange={handleChange}
            />
          )}

          {/* ================================= */}
          {/* DISTRIBUTOR FIELDS */}
          {/* ================================= */}

          {form.role === "distributor" && (
            <DistributorFields
              form={form}
              handleChange={handleChange}
            />
          )}

          {/* Create Account */}
          <PrimaryButton
            title="Create Account"
            loading={loading}
            onPress={handleRegister}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>

            <Text
              style={styles.loginText}
              onPress={() =>
                navigation.navigate("Login")
              }
            >
              Login
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}