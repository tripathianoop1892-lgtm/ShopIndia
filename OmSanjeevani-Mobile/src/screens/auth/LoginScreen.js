import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./LoginScreenStyles";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

// API
import { loginUser } from "../../services/api";

export default function LoginScreen({ navigation }) {
  // ==========================================
  // Form State
  // ==========================================

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // Form Change
  // ==========================================

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ==========================================
  // Login
  // ==========================================

  const handleLogin = async () => {
    // ----------------------------------------
    // Email Validation
    // ----------------------------------------

    if (!form.email.trim()) {
      Alert.alert(
        "Login Required",
        "Please enter your email."
      );
      return;
    }

    // ----------------------------------------
    // Password Validation
    // ----------------------------------------

    if (!form.password.trim()) {
      Alert.alert(
        "Login Required",
        "Please enter your password."
      );
      return;
    }

    try {
      setLoading(true);

      // ======================================
      // Login Payload
      // ======================================

      const payload = {
        email: form.email.trim(),
        password: form.password,
      };

      // ======================================
      // API Login
      // ======================================

      const res = await loginUser(payload);

      console.log(
        "LOGIN RESPONSE:",
        res
      );

      // ======================================
      // Login Failed
      // ======================================

      if (!res?.success) {
        Alert.alert(
          "Login Failed",
          res?.message ||
            "Invalid email or password."
        );

        return;
      }

      // ======================================
      // User Data
      // ======================================
      await AsyncStorage.setItem(
  "token",
  res.token
);

await AsyncStorage.setItem(
  "user",
  JSON.stringify(res.user)
);
      const user = res.user;

      if (!user) {
        Alert.alert(
          "Login Error",
          "User information was not received from server."
        );

        return;
      }

      // ======================================
      // Debug User Data
      // ======================================

      console.log(
        "LOGIN USER:",
        user
      );

      console.log(
        "LOGIN SHOP ID:",
        user.shopId
      );

      // ======================================
      // Role
      // ======================================

      const role =
        user.role?.toLowerCase();

      console.log(
        "USER ROLE:",
        role
      );

      // ======================================
      // Role Based Navigation
      // ======================================

      switch (role) {
        // ------------------------------------
        // Customer
        // ------------------------------------

        case "customer":
          navigation.replace(
            "CustomerHome",
            {
              shopId: user.shopId,
            }
          );
          break;

        // ------------------------------------
        // Shopkeeper
        // ------------------------------------

        case "shopkeeper":
          navigation.replace(
            "ShopkeeperHome"
          );
          break;

        // ------------------------------------
        // Distributor
        // ------------------------------------

        case "distributor":
          navigation.replace(
            "DistributorHome"
          );
          break;

        // ------------------------------------
        // Admin
        // ------------------------------------

        case "admin":
          Alert.alert(
            "Admin Login",
            "Admin mobile dashboard is not connected yet."
          );
          break;

        // ------------------------------------
        // Unknown Role
        // ------------------------------------

        default:
          Alert.alert(
            "Login Error",
            "Invalid user role received from server."
          );
          break;
      }
    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      Alert.alert(
        "Login Error",
        "Unable to login. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={
            styles.scrollContainer
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ==================================
              Logo
          =================================== */}

          <Image
            source={require(
              "../../assets/omsanjeevani.png"
            )}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* ==================================
              Heading
          =================================== */}

          <Text style={styles.title}>
            Welcome Back
          </Text>

          <Text style={styles.subtitle}>
            Login to continue with Om Sanjeevani
          </Text>

          {/* ==================================
              Email
          =================================== */}

          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={form.email}
            onChangeText={(text) =>
              handleChange(
                "email",
                text
              )
            }
          />

          {/* ==================================
              Password
          =================================== */}

          <Text style={styles.label}>
            Password
          </Text>

          <View
            style={
              styles.passwordContainer
            }
          >
            <TextInput
              style={
                styles.passwordInput
              }
              placeholder="Enter Password"
              placeholderTextColor="#888"
              secureTextEntry={
                !showPassword
              }
              autoCapitalize="none"
              autoCorrect={false}
              value={form.password}
              onChangeText={(text) =>
                handleChange(
                  "password",
                  text
                )
              }
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={
                styles.eyeButton
              }
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-off"
                    : "eye"
                }
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* ==================================
              Forgot Password
          =================================== */}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "ForgotPassword"
              )
            }
          >
            <Text
              style={
                styles.forgotPassword
              }
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* ==================================
              Login Button
          =================================== */}

          <PrimaryButton
            title="Login"
            loading={loading}
            onPress={handleLogin}
          />

          {/* ==================================
              Register
          =================================== */}

          <View
            style={styles.footer}
          >
            <Text
              style={
                styles.footerText
              }
            >
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  "Register"
                )
              }
            >
              <Text
                style={
                  styles.registerText
                }
              >
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}