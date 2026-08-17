import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./SearchBarStyles";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search medicines...",
  onSearch,
  onFilter,
}) {
  return (
    <View style={styles.container}>
      
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={22}
          color="#757575"
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
      </View>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={onFilter}
        activeOpacity={0.8}
      >
        <Ionicons
          name="options-outline"
          size={22}
          color="#FFFFFF"
        />
      </TouchableOpacity>

    </View>
  );
}