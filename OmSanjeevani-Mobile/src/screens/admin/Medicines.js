import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import styles from "./MedicinesStyles";
import { getMedicine } from "../../services/api";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);

      const response = await getMedicine();

      setMedicines(response || []);
      setFilteredMedicines(response || []);

      console.log("MEDICINES:", response);
    } catch (err) {
      console.error("Error fetching medicines:", err);

      Alert.alert(
        "Error",
        "Unable to load medicines. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);

    const filtered = medicines.filter((medicine) => {
      const name = medicine.name?.toLowerCase() || "";
      const company = medicine.company?.toLowerCase() || "";
      const category = medicine.packType?.toLowerCase() || "";

      return (
        name.includes(text.toLowerCase()) ||
        company.includes(text.toLowerCase()) ||
        category.includes(text.toLowerCase())
      );
    });

    setFilteredMedicines(filtered);
  };

  const handleAddMedicine = () => {
    Alert.alert(
      "Add Medicine",
      "Add Medicine functionality will be connected next."
    );
  };

  const handleEdit = (medicine) => {
    Alert.alert(
      "Edit Medicine",
      `${medicine.name} edit functionality will be connected next.`
    );
  };

  const handleDelete = (medicine) => {
    Alert.alert(
      "Delete Medicine",
      `Are you sure you want to delete ${medicine.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("DELETE MEDICINE:", medicine);
          },
        },
      ]
    );
  };

  const renderMedicine = ({ item }) => {
    const isAvailable = item.status === "Available";

    return (
      <View style={styles.medicineCard}>
        <View style={styles.cardHeader}>
          <View style={styles.medicineInfo}>
            <Text style={styles.medicineName}>
              {item.name || "N/A"}
            </Text>

            <Text style={styles.company}>
              {item.company || "No Company"}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              isAvailable
                ? styles.availableBadge
                : styles.lowStockBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isAvailable
                  ? styles.availableText
                  : styles.lowStockText,
              ]}
            >
              {item.status || "Unknown"}
            </Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>
              {item.packType || "N/A"}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.price}>
              ₹{item.price || 0}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.label}>Stock</Text>
            <Text style={styles.value}>
              {item.stock || 0}
            </Text>
          </View>
        </View>

        <View style={styles.idContainer}>
          <Text style={styles.idText}>
            ID: {item._id}
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.editButtonText}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item)}
          >
            <Text style={styles.deleteButtonText}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Medicines
          </Text>

          <Text style={styles.subtitle}>
            Manage all medicines
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddMedicine}
        >
          <Text style={styles.addButtonText}>
            + Add
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Medicine..."
        value={search}
        onChangeText={handleSearch}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Loading medicines...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredMedicines}
          renderItem={renderMedicine}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No medicines found
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default Medicines;