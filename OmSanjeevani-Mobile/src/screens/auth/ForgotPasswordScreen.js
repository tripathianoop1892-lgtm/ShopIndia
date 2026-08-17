import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Text,
} from "react-native";

import styles from "./ForgotPasswordScreenStyles";

import CustomInput from "../../components/inputs/CustomInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      // ==============================
      // Backend API Integration
      // ==============================

      /*
      const res = await forgotPassword(email);

      if (res.success) {
        navigation.navigate("OtpScreen", {
          email,
        });
      } else {
        alert(res.message);
      }
      */

      console.log(email);

      navigation.navigate("OtpScreen", {
        email,
      });

    } catch (error) {
      console.log(error);
      alert("Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Image
            source={require("../../assets/omsanjeevani.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            Forgot Password
          </Text>

          <Text style={styles.subtitle}>
            Enter your registered email address.
            {"\n"}
            We will send an OTP to reset your password.
          </Text>

          <CustomInput
            label="Email Address"
            placeholder="Enter Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <PrimaryButton
            title="Send OTP"
            loading={loading}
            onPress={handleSendOtp}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}