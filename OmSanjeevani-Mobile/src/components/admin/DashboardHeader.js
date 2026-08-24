import React from "react";
import {
  View,
  Text,
} from "react-native";

import styles from "./DashboardHeaderStyles";

const DashboardHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.appName}>
          OmSanjeevni
        </Text>

        <Text style={styles.subtitle}>
          Admin Panel
        </Text>
      </View>
    </View>
  );
};

export default DashboardHeader;