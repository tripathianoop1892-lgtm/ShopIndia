import React from "react";
import { View, Text } from "react-native";

import CustomInput from "../inputs/CustomInput";
import styles from "./ShopkeeperFieldsStyles";

export default function ShopkeeperFields({
  form,
  handleChange,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Shopkeeper Details
      </Text>

      <CustomInput
        label="Shop Name"
        placeholder="Enter Shop Name"
        value={form.shopName}
        onChangeText={(text) => handleChange("shopName", text)}
      />

      <CustomInput
        label="GST Number"
        placeholder="Enter GST Number"
        autoCapitalize="characters"
        value={form.gstNumber}
        onChangeText={(text) => handleChange("gstNumber", text)}
      />

      <CustomInput
        label="Drug License Number"
        placeholder="Enter Drug License Number"
        autoCapitalize="characters"
        value={form.drugLicense}
        onChangeText={(text) => handleChange("drugLicense", text)}
      />

    </View>
  );
}