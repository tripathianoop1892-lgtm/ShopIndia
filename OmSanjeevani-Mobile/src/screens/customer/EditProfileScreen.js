import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import AppHeader from "../../components/headers/AppHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { updateProfile } from "../../services/api";
import styles from "./EditProfileScreenStyles";

export default function EditProfileScreen({ navigation }) {
  const [fullName, setFullName] = useState("Customer Name");
  const [mobile, setMobile] = useState("+91 XXXXXXXXXX");
  const [email, setEmail] = useState("customer@email.com");
  const [shopName, setShopName] = useState("Medical Store");
  const [address, setAddress] = useState("");

 const handleSave = async () => {
  if (!fullName.trim()) {
    Alert.alert("Error", "Please enter your full name");
    return;
  }

  if (!mobile.trim()) {
    Alert.alert("Error", "Please enter your mobile number");
    return;
  }

  if (!email.trim()) {
    Alert.alert("Error", "Please enter your email address");
    return;
  }

  try {
    const response = await updateProfile({
  fullName: fullName.trim(),
  mobile: mobile.trim(),
  email: email.trim(),
  shopName: shopName.trim(),
  address: address.trim(),
});

    console.log("PROFILE UPDATE RESPONSE:", response);

    if (response.success) {
      Alert.alert(
        "Success",
        "Profile updated successfully",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      Alert.alert(
        "Error",
        response.message || "Profile update failed"
      );
    }

  } catch (error) {
    console.error(
      "PROFILE UPDATE ERROR:",
      error
    );

    Alert.alert(
      "Error",
      error.message || "Something went wrong"
    );
  }
};

  return (
    <SafeAreaView style={styles.container}>
      
      <AppHeader
        title="Edit Profile"
        showBackButton
        showNotification={false}
        showProfile={false}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>
            Personal Details
          </Text>

          <Text style={styles.label}>
            Full Name
          </Text>

          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
          />

          <Text style={styles.label}>
            Mobile Number
          </Text>

          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>
            Email Address
          </Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />

        </View>

        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>
            Shop Details
          </Text>

          <Text style={styles.label}>
            Shop Name
          </Text>

          <TextInput
            style={styles.input}
            value={shopName}
            onChangeText={setShopName}
            placeholder="Enter shop name"
          />

          <Text style={styles.label}>
            Address
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.addressInput,
            ]}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
            multiline
          />

        </View>

        <PrimaryButton
          title="Save Changes"
          onPress={handleSave}
        />

      </ScrollView>

    </SafeAreaView>
  );
}