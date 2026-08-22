import React from "react";
import {
  View,
  Text,
} from "react-native";

import styles from "./ReportCardStyles";

const ReportCard = ({
  title,
  value,
  subtitle,
  color = "#2563eb",
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          borderLeftColor: color,
        },
      ]}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Text
        style={[
          styles.value,
          {
            color,
          },
        ]}
      >
        {value}
      </Text>

      {subtitle ? (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

export default ReportCard;