import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Text,
} from "react-native";

import styles from "./OtpScreenStyles";

import CustomInput from "../../components/inputs/CustomInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function OtpScreen({ navigation, route }) {

  const email = route?.params?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {

    if (!otp.trim()) {
      alert("Please enter OTP");
      return;
    }

    if (!newPassword.trim()) {
      alert("Please enter new password");
      return;
    }

    if (!confirmPassword.trim()) {
      alert("Please confirm password");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      /*
      const payload = {
        email,
        otp,
        password: newPassword,
      };

      const res = await verifyOtp(payload);

      if (res.success) {
        alert("Password changed successfully");
        navigation.replace("Login");
      } else {
        alert(res.message);
      }
      */

      console.log({
        email,
        otp,
        password: newPassword,
      });

      alert("Password Reset Successfully");

      navigation.replace("Login");

    } catch (error) {

      console.log(error);
      alert("OTP Verification Failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          <Image
            source={require("../../assets/omsanjeevani.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            OTP Verification
          </Text>

          <Text style={styles.subtitle}>
            Enter the OTP sent to your registered email and create a new password.
          </Text>

          <CustomInput
            label="OTP"
            placeholder="Enter OTP"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />

          <CustomInput
            label="New Password"
            placeholder="Enter New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <CustomInput
            label="Confirm Password"
            placeholder="Confirm New Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <PrimaryButton
            title="Verify OTP"
            loading={loading}
            onPress={handleVerifyOtp}
          />

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}