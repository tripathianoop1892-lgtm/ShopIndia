import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

import styles from "./PrimaryButtonStyles";

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={loading || disabled}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#FFFFFF"
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}