import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";

import styles from "./MedicineListScreenStyles";

import AppHeader from "../../components/headers/AppHeader";
import SearchBar from "../../components/common/SearchBar";

import {
  MedicinesList,
  updateMedicine,
} from "../../services/api";

export default function MedicineListScreen({
  navigation,
}) {
  const [retailStock, setRetailStock] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // Edit Modal
  // ==========================================

  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  const [editingItem, setEditingItem] =
    useState(null);

  const [editForm, setEditForm] = useState({
    mrp: "",
    discount: "",
    retailPrice: "",
    stock: "",
  });

  // ==========================================
  // Fetch Shopkeeper Retail Stock
  // ==========================================

  useEffect(() => {
    fetchMyStock();
  }, []);

  const fetchMyStock = async () => {
    try {
      setLoading(true);

      const data = await MedicinesList(
        "?source=my-retail-stock"
      );

      const medicineData = Array.isArray(data)
        ? data
        : Array.isArray(data?.medicines)
        ? data.medicines
        : [];

      setRetailStock(medicineData);
      setFilteredStock(medicineData);
    } catch (error) {
      console.error(
        "Shopkeeper medicine list error:",
        error
      );

      setRetailStock([]);
      setFilteredStock([]);

      Alert.alert(
        "Error",
        "Unable to load your medicine inventory."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
// Search
// ==========================================

const handleSearch = (searchText) => {
  const query = String(searchText ?? "")
    .trim()
    .toLowerCase();

  if (!query) {
    setFilteredStock(retailStock);
    return;
  }

  const filtered = retailStock.filter((item) => {
    const name = String(item.name ?? "").toLowerCase();
    const company = String(item.company ?? "").toLowerCase();
    const type = String(item.type ?? "").toLowerCase();

    return (
      name.includes(query) ||
      company.includes(query) ||
      type.includes(query)
    );
  });

  setFilteredStock(filtered);
};

  // ==========================================
  // Open Edit Modal
  // ==========================================

  const handleOpenEdit = (item) => {
    setEditingItem(item);

    setEditForm({
      mrp: item.mrp ?? 0,
      discount: item.discount ?? 0,
      retailPrice:
        item.retailPrice ??
        item.price ??
        0,
      stock: item.stock ?? 0,
    });

    setIsEditModalOpen(true);
  };

  // ==========================================
  // Edit Input
  // ==========================================

  const handlePriceChange = (
    field,
    value
  ) => {
    const updatedForm = {
      ...editForm,
      [field]: value,
    };

    // ========================================
    // Auto Calculate Retail Price
    // ========================================

    if (
      field === "mrp" ||
      field === "discount"
    ) {
      const mrpNum = Number(
        field === "mrp"
          ? value
          : editForm.mrp
      );

      const discountNum = Number(
        field === "discount"
          ? value
          : editForm.discount
      );

      if (
        !Number.isNaN(mrpNum) &&
        !Number.isNaN(discountNum) &&
        discountNum >= 0 &&
        discountNum <= 100
      ) {
        updatedForm.retailPrice = (
          mrpNum *
          (1 - discountNum / 100)
        ).toFixed(2);
      }
    }

    setEditForm(updatedForm);
  };

  // ==========================================
  // Save Updated Medicine
  // ==========================================

  const handleUpdateSubmit = async () => {
    if (!editingItem) {
      return;
    }

    const mrp = Number(editForm.mrp);
    const discount = Number(
      editForm.discount
    );
    const retailPrice = Number(
      editForm.retailPrice
    );
    const stock = Number(editForm.stock);

    if (mrp < 0) {
      Alert.alert(
        "Invalid MRP",
        "MRP cannot be negative."
      );
      return;
    }

    if (
      discount < 0 ||
      discount > 100
    ) {
      Alert.alert(
        "Invalid Discount",
        "Discount must be between 0 and 100."
      );
      return;
    }

    if (retailPrice > mrp) {
      Alert.alert(
        "Invalid Price",
        "Retail Price cannot exceed MRP."
      );
      return;
    }

    if (stock < 0) {
      Alert.alert(
        "Invalid Stock",
        "Stock cannot be negative."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        mrp,
        discount,
        retailPrice,
        price: retailPrice,
        stock,
      };

      const res = await updateMedicine(
        editingItem._id,
        payload
      );

      if (res && res.success) {
        Alert.alert(
          "Success",
          "Inventory Updated Successfully ✅"
        );

        setIsEditModalOpen(false);
        setEditingItem(null);

        await fetchMyStock();
      } else {
        Alert.alert(
          "Error",
          res?.message ||
            "Error saving changes."
        );
      }
    } catch (error) {
      console.error(
        "Update medicine error:",
        error
      );

      Alert.alert(
        "Error",
        "Error sending updates."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Expiry Status
  // ==========================================

  const getExpiryStatus = (expiry) => {
    if (!expiry) {
      return {
        text: "N/A",
        expired: false,
      };
    }

    const expiryDate = new Date(expiry);
    const today = new Date();

    return {
      text: expiryDate.toLocaleDateString(),
      expired: expiryDate < today,
    };
  };

  // ==========================================
  // Medicine Card
  // ==========================================

  const renderMedicine = ({
    item,
  }) => {
    const isLowStock =
      Number(item.stock || 0) <= 20;

    const expiryStatus =
      getExpiryStatus(item.expiry);

    return (
      <View style={styles.card}>
        {/* Medicine Information */}

        <View style={styles.cardHeader}>
          <View style={styles.medicineInfo}>
            <Text
              style={styles.medicineName}
              numberOfLines={2}
            >
              {item.name || "Medicine"}
            </Text>

            <Text style={styles.company}>
              {item.company || "Generic"}
            </Text>

            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>
                {item.type || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Stock */}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Current Stock
          </Text>

          <Text
            style={[
              styles.infoValue,
              isLowStock &&
                styles.lowStockText,
            ]}
          >
            {item.stock ?? 0}
            {isLowStock
              ? "  (Low Stock)"
              : ""}
          </Text>
        </View>

        {/* Wholesale Price */}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Wholesale Paid
          </Text>

          <Text style={styles.infoValue}>
            ₹{item.wholesalePrice ?? 0}
          </Text>
        </View>

        {/* Retail Price */}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Retail Price
          </Text>

          <Text style={styles.retailPrice}>
            ₹
            {item.retailPrice ??
              item.price ??
              0}
          </Text>
        </View>

        {/* Expiry */}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Expiry
          </Text>

          <View
            style={[
              styles.expiryBadge,
              expiryStatus.expired &&
                styles.expiredBadge,
            ]}
          >
            <Text
              style={[
                styles.expiryText,
                expiryStatus.expired &&
                  styles.expiredText,
              ]}
            >
              {expiryStatus.text}{" "}
              {expiryStatus.expired
                ? "Expired"
                : "Active"}
            </Text>
          </View>
        </View>

        {/* Edit Button */}

        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={() =>
            handleOpenEdit(item)
          }
        >
          <Text style={styles.editButtonText}>
            Edit Pricing
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ==========================================
  // Loading
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

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#2E7D32"
          />

          <Text style={styles.loadingText}>
            Syncing retail data sheets...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
      onChangeText={handleSearch}
       />

      {/* Inventory Title */}

      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>
            Local Shop Retail Inventory
          </Text>

          <Text style={styles.subtitle}>
            These medicines are visible to
            consumers.
          </Text>
        </View>

        <Text style={styles.count}>
          {filteredStock.length}
        </Text>
      </View>

      {/* Medicine List */}

      <FlatList
        data={filteredStock}
        keyExtractor={(item, index) =>
          item?._id?.toString() ||
          index.toString()
        }
        renderItem={renderMedicine}
        showsVerticalScrollIndicator={false}
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
              style={styles.emptyTitle}
            >
              No Inventory Available
            </Text>

            <Text
              style={
                styles.emptySubtitle
              }
            >
              Your retail inventory will
              appear here after medicines
              are added.
            </Text>
          </View>
        }
      />

      {/* =====================================
          Edit Pricing Modal
      ====================================== */}

      <Modal
        visible={isEditModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setIsEditModalOpen(false)
        }
      >
        <View
          style={
            styles.modalBackdrop
          }
        >
          <View style={styles.modal}>
            {/* Modal Header */}

            <View
              style={
                styles.modalHeader
              }
            >
              <Text
                style={
                  styles.modalTitle
                }
              >
                Edit Retail Product Matrix
              </Text>

              <Text
                style={
                  styles.modalMedicineName
                }
              >
                {editingItem?.name ||
                  "Medicine"}{" "}
                (
                {editingItem?.strength ||
                  "N/A"}
                )
              </Text>
            </View>

            {/* MRP */}

            <View
              style={styles.field}
            >
              <Text
                style={styles.label}
              >
                Store MRP (₹)
              </Text>

              <TextInput
                style={styles.input}
                value={String(
                  editForm.mrp
                )}
                onChangeText={(value) =>
                  handlePriceChange(
                    "mrp",
                    value
                  )
                }
                keyboardType="decimal-pad"
              />
            </View>

            {/* Discount */}

            <View
              style={styles.field}
            >
              <Text
                style={styles.label}
              >
                Customer Discount (%)
              </Text>

              <TextInput
                style={styles.input}
                value={String(
                  editForm.discount
                )}
                onChangeText={(value) =>
                  handlePriceChange(
                    "discount",
                    value
                  )
                }
                keyboardType="decimal-pad"
              />
            </View>

            {/* Retail Price */}

            <View
              style={styles.field}
            >
              <Text
                style={styles.label}
              >
                Final Retail Selling Price
              </Text>

              <TextInput
                style={[
                  styles.input,
                  styles.readOnlyInput,
                ]}
                value={String(
                  editForm.retailPrice
                )}
                editable={false}
              />
            </View>

            {/* Stock */}

            <View
              style={styles.field}
            >
              <Text
                style={styles.label}
              >
                Current Physical Stock Count
              </Text>

              <TextInput
                style={styles.input}
                value={String(
                  editForm.stock
                )}
                onChangeText={(value) =>
                  handlePriceChange(
                    "stock",
                    value
                  )
                }
                keyboardType="number-pad"
              />
            </View>

            {/* Buttons */}

            <View
              style={
                styles.modalFooter
              }
            >
              <TouchableOpacity
                style={
                  styles.cancelButton
                }
                onPress={() =>
                  setIsEditModalOpen(
                    false
                  )
                }
                disabled={saving}
              >
                <Text
                  style={
                    styles.cancelButtonText
                  }
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  saving &&
                    styles.disabledButton,
                ]}
                onPress={
                  handleUpdateSubmit
                }
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                  />
                ) : (
                  <Text
                    style={
                      styles.saveButtonText
                    }
                  >
                    Save Metrics
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}