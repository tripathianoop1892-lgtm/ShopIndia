import React from "react";
import {
  View,
  Text,
} from "react-native";

import styles from "./MetricCardStyles";

const MetricCard = ({
  title,
  value,
  color,
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
            color: color,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

export default MetricCard;