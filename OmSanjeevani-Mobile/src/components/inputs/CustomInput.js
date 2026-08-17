import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./CustomInputStyles";

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "sentences",
  multiline = false,
  numberOfLines = 1,
  editable = true,
  maxLength,
  style,
  inputStyle,
}) {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={styles.label}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          multiline && styles.multilineContainer,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={hidePassword}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          maxLength={maxLength}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={hidePassword ? "eye-off" : "eye"}
              size={22}
              color="#666666"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}