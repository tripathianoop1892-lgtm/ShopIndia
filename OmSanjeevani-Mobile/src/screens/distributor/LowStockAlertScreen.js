import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import AppHeader from "../../components/headers/AppHeader";
import styles from "./LowStockAlertScreenStyles";

import { MedicinesList } from "../../services/api";

export default function LowStockAlertScreen({ navigation, route }) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ==========================================
  // FETCH LOW STOCK MEDICINES
  // ==========================================

  const fetchLowStockMedicines = async () => {
    try {
      const query = route?.name?.startsWith("Shopkeeper")
        ? "?source=my-retail-stock"
        : "";
      const res = await MedicinesList(query);

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

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const exportToPDF = async () => {
    if (!medicines.length) {
      Alert.alert("Nothing to export", "No low stock medicines are available.");
      return;
    }

    const rows = medicines.map((med, index) => `<tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(med.name || "Medicine")}</td>
      <td>${escapeHtml(med.type || "Medicine")}</td>
      <td>${Number(med.stock || 0)}</td>
    </tr>`).join("");
    const ownerLabel = route?.name?.startsWith("Shopkeeper") ? "Shopkeeper" : "Distributor";
    const html = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0" /><style>
      @page { size: A4; margin: 14mm; }
      body { font-family: Arial, sans-serif; color: #172033; }
      h1 { color: #166534; margin-bottom: 4px; }
      p { color: #64748b; }
      table { width: 100%; border-collapse: collapse; font-size: 11px; }
      th { background: #166534; color: #fff; padding: 8px; text-align: left; }
      td { border: 1px solid #dbe3ea; padding: 7px; }
    </style></head><body><h1>${ownerLabel} Low Stock Report</h1><p>Medicines with fewer than 50 units in stock</p><table><thead><tr><th>S.No</th><th>Medicine</th><th>Type</th><th>Stock Left</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: `${ownerLabel} Low Stock Report`,
          UTI: ".pdf",
        });
      } else {
        await Print.printAsync({ html });
      }
    } catch (error) {
      console.error("LOW STOCK PDF EXPORT ERROR:", error);
      Alert.alert("Export failed", "The low stock PDF could not be created.");
    }
  };

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
                <TouchableOpacity style={styles.exportButton} onPress={exportToPDF}>
                  <Ionicons name="document-text-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.exportButtonText}>Export PDF</Text>
                </TouchableOpacity>
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
