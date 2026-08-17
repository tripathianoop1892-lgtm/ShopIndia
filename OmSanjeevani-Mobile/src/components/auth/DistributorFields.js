import React from "react";
import { View, Text } from "react-native";

import CustomInput from "../inputs/CustomInput";
import styles from "./DistributorFieldsStyles";

export default function DistributorFields({
  form,
  handleChange,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Distributor Details
      </Text>

      <CustomInput
        label="Company Name"
        placeholder="Enter Company Name"
        value={form.companyName}
        onChangeText={(text) =>
          handleChange("companyName", text)
        }
      />

      <CustomInput
        label="Warehouse Address"
        placeholder="Enter Warehouse Address"
        multiline
        numberOfLines={4}
        value={form.warehouseAddress}
        onChangeText={(text) =>
          handleChange("warehouseAddress", text)
        }
      />

    </View>
  );
}