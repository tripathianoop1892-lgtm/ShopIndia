import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../../components/headers/AppHeader";
import styles from "./LowStockAlertScreenStyles";

import { MedicinesList } from "../../services/api";

export default function LowStockAlertScreen({ navigation }) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ==========================================
  // FETCH LOW STOCK MEDICINES
  // ==========================================

  const fetchLowStockMedicines = async () => {
    try {
      const res = await MedicinesList();

      console.log("LOW STOCK API RESPONSE:", res);

      const medicineList = Array.isArray(res?.medicines)
        ? res.medicines
        : Array.isArray(res)
        ? res
        : [];

      // LOW STOCK: LESS THAN 50
      const lowStockData = medicineList.filter(
        (med) => Number(med.stock || 0) < 50
      );

      setMedicines(lowStockData);
    } catch (error) {
      console.log("LOW STOCK ERROR:", error);
      setMedicines([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==========================================
  // LOAD DATA
  // ==========================================

  React.useEffect(() => {
    fetchLowStockMedicines();
  }, []);

  // ==========================================
  // PULL TO REFRESH
  // ==========================================

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLowStockMedicines();
  }, []);

  // ==========================================
  // MEDICINE CARD
  // ==========================================

  const renderMedicine = ({ item, index }) => (
    <View style={styles.medicineCard}>
      <View style={styles.serialContainer}>
        <Text style={styles.serialText}>
          {index + 1}
        </Text>
      </View>

      <View style={styles.medicineInfo}>
        <Text
          style={styles.medicineName}
          numberOfLines={2}
        >
          {item.name || "Medicine"}
        </Text>

        <Text style={styles.medicineType}>
          {item.type || "Medicine"}
        </Text>
      </View>

      <View style={styles.stockContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={20}
          color="#F57C00"
        />

        <Text style={styles.stockNumber}>
          {item.stock ?? 0}
        </Text>

        <Text style={styles.stockLabel}>
          Stock Left
        </Text>
      </View>
    </View>
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          title="Low Stock Alert"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#2E7D32"
          />

          <Text style={styles.loadingText}>
            Loading low stock medicines...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Low Stock Alert"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={medicines}
        keyExtractor={(item, index) =>
          item._id?.toString() || index.toString()
        }
        renderItem={renderMedicine}
        contentContainerStyle={
          medicines.length === 0
            ? styles.emptyListContent
            : styles.listContent
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#2E7D32"]}
          />
        }
        ListHeaderComponent={
          medicines.length > 0 ? (
            <View style={styles.headerContainer}>
              <View style={styles.headerIcon}>
                <Ionicons
                  name="warning-outline"
                  size={24}
                  color="#F57C00"
                />
              </View>

              <View style={styles.headerTextContainer}>
                <Text style={styles.title}>
                  Low Stock Medicines
                </Text>

                <Text style={styles.subtitle}>
                  {medicines.length} medicine
                  {medicines.length !== 1 ? "s" : ""} need
                  attention
                </Text>
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="checkmark-circle-outline"
              size={70}
              color="#2E7D32"
            />

            <Text style={styles.emptyTitle}>
              Stock Looks Good
            </Text>

            <Text style={styles.emptySubtitle}>
              No medicines currently have stock below
              50 units.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}