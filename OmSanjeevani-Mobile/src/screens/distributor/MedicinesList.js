import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";

import styles from "./MedicinesListStyles";

import AppHeader from "../../components/headers/AppHeader";
import SearchBar from "../../components/common/SearchBar";

import {
  updateMedicine,
  MedicinesList,
  deleteMedicine,
} from "../../services/api";

export default function Medicines({
  navigation,
}) {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editId, setEditId] = useState(null);

  const [selectedMedicines, setSelectedMedicines] =
    useState([]);

  // ==========================================
  // FETCH MEDICINES
  // ==========================================

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await MedicinesList();

      console.log(
        "Medicine API Response:",
        res
      );

      const data = Array.isArray(res?.medicines)
        ? res.medicines
        : Array.isArray(res)
        ? res
        : [];

      setMedicines(data);
      setFilteredMedicines(data);
    } catch (error) {
      console.log(
        "Medicine List Error:",
        error
      );

      setMedicines([]);
      setFilteredMedicines([]);

      Alert.alert(
        "Error",
        "Unable to load medicines."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (searchText) => {
    const query = searchText
      .trim()
      .toLowerCase();

    if (!query) {
      setFilteredMedicines(medicines);
      return;
    }

    const filtered = medicines.filter(
      (item) => {
        const name =
          item.name?.toLowerCase() || "";

        const type =
          item.type?.toLowerCase() || "";

        return (
          name.includes(query) ||
          type.includes(query)
        );
      }
    );

    setFilteredMedicines(filtered);
  };

  // ==========================================
  // CHANGE INPUT
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

    setFilteredMedicines((prev) =>
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
  // SAVE
  // ==========================================

  const handleSave = async (id) => {
    try {
      const medicine = medicines.find(
        (item) => item._id === id
      );

      if (!medicine) {
        return;
      }

      setSaving(true);

      await updateMedicine(
        id,
        medicine
      );

      setEditId(null);

      Alert.alert(
        "Success",
        "Medicine updated successfully."
      );

      await fetchData();
    } catch (error) {
      console.log(
        "Update Medicine Error:",
        error
      );

      Alert.alert(
        "Error",
        "Unable to update medicine."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // SELECT CHECKBOX
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
  // DELETE
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
              setLoading(true);

              await deleteMedicine(id);

              setSelectedMedicines(
                (prev) =>
                  prev.filter(
                    (item) => item !== id
                  )
              );

              Alert.alert(
                "Success",
                "Medicine deleted successfully."
              );

              await fetchData();
            } catch (error) {
              console.log(
                "Delete Medicine Error:",
                error
              );

              Alert.alert(
                "Error",
                "Unable to delete medicine."
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString();
  };

  // ==========================================
  // MEDICINE CARD
  // ==========================================

  const renderMedicine = ({
    item,
  }) => {
    const isEditing =
      editId === item._id;

    const isSelected =
      selectedMedicines.includes(
        item._id
      );

    return (
      <View style={styles.card}>
        {/* Medicine Header */}

        <View style={styles.cardHeader}>
          <View style={styles.nameContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                isSelected &&
                  styles.checkboxSelected,
              ]}
              onPress={() =>
                toggleSelect(item._id)
              }
            >
              {isSelected && (
                <Text
                  style={
                    styles.checkmark
                  }
                >
                  ✓
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.nameArea}>
              <Text
                style={styles.medicineName}
                numberOfLines={2}
              >
                {item.name ||
                  "Medicine"}
              </Text>

              <Text
                style={styles.company}
              >
                {item.company ||
                  "Generic"}
              </Text>
            </View>
          </View>

          <View style={styles.typeBadge}>
            <Text
              style={styles.typeText}
            >
              {item.type || "N/A"}
            </Text>
          </View>
        </View>

        {/* Type */}

        <View style={styles.infoRow}>
          <Text
            style={styles.label}
          >
            Type
          </Text>

          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={item.type || ""}
              onChangeText={(value) =>
                handleChange(
                  item._id,
                  "type",
                  value
                )
              }
              placeholder="Medicine type"
            />
          ) : (
            <Text
              style={styles.value}
            >
              {item.type || "N/A"}
            </Text>
          )}
        </View>

        {/* Price */}

        <View style={styles.infoRow}>
          <Text
            style={styles.label}
          >
            Price
          </Text>

          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={String(
                item.offerPrice ??
                  item.price ??
                  item.mrp ??
                  0
              )}
              onChangeText={(value) =>
                handleChange(
                  item._id,
                  "offerPrice",
                  value
                )
              }
              keyboardType="decimal-pad"
              placeholder="Price"
            />
          ) : (
            <Text
              style={styles.price}
            >
              ₹
              {item.offerPrice ??
                item.price ??
                item.mrp ??
                0}
            </Text>
          )}
        </View>

        {/* Stock */}

        <View style={styles.infoRow}>
          <Text
            style={styles.label}
          >
            Stock
          </Text>

          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={String(
                item.stock ?? ""
              )}
              onChangeText={(value) =>
                handleChange(
                  item._id,
                  "stock",
                  value
                )
              }
              keyboardType="number-pad"
              placeholder="Stock"
            />
          ) : (
            <Text
              style={styles.value}
            >
              {item.stock ?? 0}
            </Text>
          )}
        </View>

        {/* MFD */}

        <View style={styles.infoRow}>
          <Text
            style={styles.label}
          >
            MFD
          </Text>

          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={
                item.mfd
                  ? String(
                      item.mfd
                    ).slice(0, 10)
                  : ""
              }
              onChangeText={(value) =>
                handleChange(
                  item._id,
                  "mfd",
                  value
                )
              }
              placeholder="YYYY-MM-DD"
            />
          ) : (
            <Text
              style={styles.value}
            >
              {formatDate(item.mfd)}
            </Text>
          )}
        </View>

        {/* Expiry */}

        <View style={styles.infoRow}>
          <Text
            style={styles.label}
          >
            Expiry
          </Text>

          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={
                item.expiry
                  ? String(
                      item.expiry
                    ).slice(0, 10)
                  : ""
              }
              onChangeText={(value) =>
                handleChange(
                  item._id,
                  "expiry",
                  value
                )
              }
              placeholder="YYYY-MM-DD"
            />
          ) : (
            <Text
              style={styles.value}
            >
              {formatDate(
                item.expiry
              )}
            </Text>
          )}
        </View>

        {/* Actions */}

        <View
          style={styles.actionContainer}
        >
          <TouchableOpacity
            style={styles.editButton}
            disabled={
              saving &&
              isEditing
            }
            onPress={() => {
              if (isEditing) {
                handleSave(
                  item._id
                );
              } else {
                setEditId(
                  item._id
                );
              }
            }}
          >
            {saving &&
            isEditing ? (
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />
            ) : (
              <Text
                style={
                  styles.editButtonText
                }
              >
                {isEditing
                  ? "Save"
                  : "Edit"}
              </Text>
            )}
          </TouchableOpacity>

          {isSelected && (
            <TouchableOpacity
              style={
                styles.deleteButton
              }
              onPress={() =>
                handleDelete(
                  item._id
                )
              }
            >
              <Text
                style={
                  styles.deleteButtonText
                }
              >
                Delete
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
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

        <View
          style={
            styles.loadingContainer
          }
        >
          <ActivityIndicator
            size="large"
            color="#2E7D32"
          />

          <Text
            style={styles.loadingText}
          >
            Loading medicines...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // MAIN SCREEN
  // ==========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      {/* Header */}

      <AppHeader
        title="My Medicines"
        showBackButton
        onBackPress={() =>
          navigation.goBack()
        }
      />

      {/* Search */}

      <SearchBar
        placeholder="Search medicine..."
        onSearch={handleSearch}
      />

      {/* Title */}

      <View
        style={styles.titleContainer}
      >
        <Text
          style={styles.title}
        >
          My Medicines
        </Text>

        <Text
          style={styles.count}
        >
          {filteredMedicines.length} Medicines
        </Text>
      </View>

      {/* Medicine List */}

      <FlatList
        data={filteredMedicines}
        keyExtractor={(
          item,
          index
        ) =>
          item?._id?.toString() ||
          index.toString()
        }
        renderItem={renderMedicine}
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.list
        }
        ListEmptyComponent={
          <View
            style={
              styles.emptyContainer
            }
          >
            <Text
              style={
                styles.emptyTitle
              }
            >
              No Medicines Found
            </Text>

            <Text
              style={
                styles.emptySubtitle
              }
            >
              Medicines added by the
              distributor will appear
              here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}