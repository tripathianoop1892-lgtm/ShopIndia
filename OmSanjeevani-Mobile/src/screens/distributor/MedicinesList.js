import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./MedicinesListStyles";

import AppHeader from "../../components/headers/AppHeader";

import {
  MedicinesList,
  updateMedicine,
  deleteMedicine,
} from "../../services/api";

export default function MedicineListScreen({
  navigation,
}) {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);

  const [selectedMedicines, setSelectedMedicines] =
    useState([]);

  // ==========================================
  // FETCH MEDICINES
  // ==========================================

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await MedicinesList();

      console.log(
        "MEDICINE API RESPONSE:",
        res
      );

      const medicineData =
        Array.isArray(res?.medicines)
          ? res.medicines
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];

      setMedicines(medicineData);

    } catch (error) {
      console.log(
        "FETCH MEDICINES ERROR:",
        error
      );

      setMedicines([]);

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredData = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    if (!searchText) {
      return medicines;
    }

    return medicines.filter((item) => {
      const name =
        item?.name
          ?.toString()
          .toLowerCase() || "";

      const type =
        item?.type
          ?.toString()
          .toLowerCase() || "";

      return (
        name.includes(searchText) ||
        type.includes(searchText)
      );
    });

  }, [search, medicines]);

  // ==========================================
  // CHANGE MEDICINE FIELD
  // ==========================================

  const handleChange = (
    id,
    field,
    value
  ) => {
    setMedicines((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  // ==========================================
  // SAVE MEDICINE
  // ==========================================

  const handleSave = async (id) => {
    try {
      const medicine =
        medicines.find(
          (item) => item._id === id
        );

      if (!medicine) {
        Alert.alert(
          "Error",
          "Medicine not found."
        );

        return;
      }

      await updateMedicine(
        id,
        medicine
      );

      setEditId(null);

      Alert.alert(
        "Success",
        "Medicine updated successfully."
      );

      fetchData();

    } catch (error) {
      console.log(
        "UPDATE MEDICINE ERROR:",
        error
      );

      Alert.alert(
        "Error",
        error?.message ||
          "Unable to update medicine."
      );
    }
  };

  // ==========================================
  // SELECT MEDICINE
  // ==========================================

  const toggleSelect = (id) => {
    setSelectedMedicines((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) => item !== id
          )
        : [...prev, id]
    );
  };

  // ==========================================
  // DELETE MEDICINE
  // ==========================================

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Medicine",
      "Are you sure you want to delete this medicine?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",

          onPress: async () => {
            try {
              await deleteMedicine(id);

              setSelectedMedicines((prev) =>
                prev.filter(
                  (item) => item !== id
                )
              );

              Alert.alert(
                "Success",
                "Medicine deleted successfully."
              );

              fetchData();

            } catch (error) {
              console.log(
                "DELETE MEDICINE ERROR:",
                error
              );

              Alert.alert(
                "Error",
                error?.message ||
                  "Unable to delete medicine."
              );
            }
          },
        },
      ]
    );
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // RENDER MEDICINE
  // ==========================================

  const renderMedicine = ({ item }) => {
    const isEditing =
      editId === item._id;

    const isSelected =
      selectedMedicines.includes(
        item._id
      );

    const price = Number(
      item.offerPrice ??
      item.price ??
      item.mrp ??
      0
    );

    return (
      <View style={styles.medicineCard}>

        {/* ===============================
            HEADER
        =============================== */}

        <View style={styles.cardHeader}>

          <TouchableOpacity
            style={styles.checkboxButton}
            onPress={() =>
              toggleSelect(item._id)
            }
          >
            <Ionicons
              name={
                isSelected
                  ? "checkbox"
                  : "square-outline"
              }
              size={25}
              color={
                isSelected
                  ? "#2E7D32"
                  : "#999999"
              }
            />
          </TouchableOpacity>

          <View style={styles.nameContainer}>

            <Text
              style={styles.medicineName}
              numberOfLines={2}
            >
              {item.name ||
                "Medicine Name"}
            </Text>

          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              if (isEditing) {
                handleSave(item._id);
              } else {
                setEditId(item._id);
              }
            }}
          >
            <Ionicons
              name={
                isEditing
                  ? "save-outline"
                  : "create-outline"
              }
              size={21}
              color="#FFFFFF"
            />

            <Text style={styles.editButtonText}>
              {isEditing
                ? "Save"
                : "Edit"}
            </Text>
          </TouchableOpacity>

        </View>

        {/* ===============================
            TYPE
        =============================== */}

        <View style={styles.row}>

          <Text style={styles.label}>
            Type
          </Text>

          {isEditing ? (
            <TextInput
              style={styles.input}
              value={item.type || ""}
              placeholder="Medicine Type"
              onChangeText={(value) =>
                handleChange(
                  item._id,
                  "type",
                  value
                )
              }
            />
          ) : (
            <Text style={styles.value}>
              {item.type || "N/A"}
            </Text>
          )}

        </View>

        {/* ===============================
            PRICE
        =============================== */}

        <View style={styles.row}>

          <Text style={styles.label}>
            Price
          </Text>

          {isEditing ? (
            <TextInput
              style={styles.input}
              value={String(
                item.offerPrice ??
                item.price ??
                item.mrp ??
                ""
              )}
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={(value) =>
                handleChange(
                  item._id,
                  "offerPrice",
                  value
                )
              }
            />
          ) : (
            <Text style={styles.price}>
              ₹{price.toFixed(2)}
            </Text>
          )}

        </View>

        {/* ===============================
            STOCK
        =============================== */}

        <View style={styles.row}>

          <Text style={styles.label}>
            Stock
          </Text>

          {isEditing ? (
            <TextInput
              style={styles.input}
              value={
                item.stock !== undefined &&
                item.stock !== null
                  ? String(item.stock)
                  : ""
              }
              placeholder="Stock"
              keyboardType="numeric"
              onChangeText={(value) =>
                handleChange(
                  item._id,
                  "stock",
                  value
                )
              }
            />
          ) : (
            <Text
              style={[
                styles.value,
                Number(item.stock || 0) <= 5 &&
                  styles.lowStockText,
              ]}
            >
              {item.stock ?? 0}
            </Text>
          )}

        </View>

        {/* ===============================
            MFD
        =============================== */}

        <View style={styles.row}>

          <Text style={styles.label}>
            MFD
          </Text>

          {isEditing ? (
            <TextInput
              style={styles.input}
              value={
                item.mfd
                  ? item.mfd.slice(0, 10)
                  : ""
              }
              placeholder="YYYY-MM-DD"
              onChangeText={(value) =>
                handleChange(
                  item._id,
                  "mfd",
                  value
                )
              }
            />
          ) : (
            <Text style={styles.value}>
              {formatDate(item.mfd)}
            </Text>
          )}

        </View>

        {/* ===============================
            EXPIRY
        =============================== */}

        <View style={styles.row}>

          <Text style={styles.label}>
            Expiry
          </Text>

          {isEditing ? (
            <TextInput
              style={styles.input}
              value={
                item.expiry
                  ? item.expiry.slice(0, 10)
                  : ""
              }
              placeholder="YYYY-MM-DD"
              onChangeText={(value) =>
                handleChange(
                  item._id,
                  "expiry",
                  value
                )
              }
            />
          ) : (
            <Text style={styles.expiryText}>
              {formatDate(item.expiry)}
            </Text>
          )}

        </View>

        {/* ===============================
            DELETE
        =============================== */}

        {isSelected && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              handleDelete(item._id)
            }
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color="#FFFFFF"
            />

            <Text
              style={styles.deleteButtonText}
            >
              Delete Medicine
            </Text>

          </TouchableOpacity>
        )}

      </View>
    );
  };

  // ==========================================
  // EMPTY LIST
  // ==========================================

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>

          <ActivityIndicator
            size="large"
            color="#2E7D32"
          />

          <Text style={styles.emptyText}>
            Loading medicines...
          </Text>

        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>

        <Ionicons
          name="medkit-outline"
          size={70}
          color="#CCCCCC"
        />

        <Text style={styles.emptyTitle}>
          No Medicines Found
        </Text>

        <Text style={styles.emptyText}>
          Add medicines to see them here.
        </Text>

      </View>
    );
  };

  // ==========================================
  // MAIN SCREEN
  // ==========================================

  return (
    <SafeAreaView
      style={styles.container}
    >

      <AppHeader
        title="My Medicines"
        showBackButton
        onBackPress={() =>
          navigation.goBack()
        }
      />

      {/* SEARCH */}

      <View style={styles.searchContainer}>

        <Ionicons
          name="search-outline"
          size={22}
          color="#777777"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search medicine or type..."
          value={search}
          onChangeText={setSearch}
        />

        {search.length > 0 && (
          <TouchableOpacity
            onPress={() =>
              setSearch("")
            }
          >
            <Ionicons
              name="close-circle"
              size={21}
              color="#999999"
            />
          </TouchableOpacity>
        )}

      </View>

      {/* MEDICINE LIST */}

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) =>
          item?._id?.toString() ||
          index.toString()
        }
        renderItem={renderMedicine}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          filteredData.length === 0 &&
            styles.emptyList,
        ]}
        ListEmptyComponent={renderEmpty}
        refreshing={loading}
        onRefresh={fetchData}
      />

    </SafeAreaView>
  );
}