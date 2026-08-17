import React from "react";
import { View, Text } from "react-native";

import CustomInput from "../inputs/CustomInput";
import styles from "./AddressFormStyles";

export default function AddressForm({
  form,
  handleChange,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Address Details
      </Text>

      <CustomInput
        label="State"
        placeholder="Enter State"
        value={form.state}
        onChangeText={(text) => handleChange("state", text)}
      />

      <CustomInput
        label="District"
        placeholder="Enter District"
        value={form.district}
        onChangeText={(text) => handleChange("district", text)}
      />

      <CustomInput
        label="City"
        placeholder="Enter City"
        value={form.city}
        onChangeText={(text) => handleChange("city", text)}
      />

      <CustomInput
        label="Pincode"
        placeholder="Enter Pincode"
        keyboardType="number-pad"
        maxLength={6}
        value={form.pincode}
        onChangeText={(text) => handleChange("pincode", text)}
      />

      <CustomInput
        label="Full Address"
        placeholder="Enter Full Address"
        multiline
        numberOfLines={4}
        value={form.address}
        onChangeText={(text) => handleChange("address", text)}
      />

    </View>
  );
}