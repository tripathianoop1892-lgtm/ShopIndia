import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

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

      <Text style={styles.label}>Industry Type</Text>
      <View style={styles.industryOptions}>
        {["Chemist", "Hospital", "Doctors"].map((option) => {
          const selected = form.industryType === option;
          return (
            <TouchableOpacity
              key={option}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              style={[styles.industryOption, selected && styles.industryOptionSelected]}
              onPress={() => handleChange("industryType", option)}
            >
              <Text style={[styles.industryOptionText, selected && styles.industryOptionTextSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

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
