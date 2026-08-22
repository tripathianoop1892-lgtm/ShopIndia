import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import AppHeader from "../../components/headers/AppHeader";
import styles from "./ExpiryAlertScreenStyles";

import { MedicinesList } from "../../services/api";

export default function ExpiryAlertScreen({ navigation }) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // ==========================================
  // DAYS LEFT
  // ==========================================

  const getDaysLeft = (dateString) => {
    if (!dateString) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiryDate = new Date(dateString);
    expiryDate.setHours(0, 0, 0, 0);

    const diff =
      (expiryDate - today) /
      (1000 * 60 * 60 * 24);

    return Math.ceil(diff);
  };

  // ==========================================
  // FETCH EXPIRING MEDICINES
  // DISTRIBUTOR: NEXT 180 DAYS
  // ==========================================

  const fetchExpiryMedicines = async () => {
    try {
      const res = await MedicinesList();

      console.log(
        "EXPIRY API RESPONSE:",
        res
      );

      const medicineList = Array.isArray(
        res?.medicines
      )
        ? res.medicines
        : Array.isArray(res)
        ? res
        : [];

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // DISTRIBUTOR EXPIRY ALERT:
      // SHOW MEDICINES EXPIRING
      // WITHIN NEXT 180 DAYS

      const expiringSoon =
        medicineList.filter((med) => {
          if (!med.expiry) return false;

          const expiryDate = new Date(
            med.expiry
          );

          if (
            Number.isNaN(
              expiryDate.getTime()
            )
          ) {
            return false;
          }

          expiryDate.setHours(
            0,
            0,
            0,
            0
          );

          const diff =
            (expiryDate - today) /
            (1000 * 60 * 60 * 24);

          return (
            diff >= 0 &&
            diff <= 180
          );
        });

      // NEAREST EXPIRY FIRST

      expiringSoon.sort(
        (a, b) =>
          new Date(a.expiry) -
          new Date(b.expiry)
      );

      setMedicines(expiringSoon);
    } catch (error) {
      console.log(
        "EXPIRY ALERT ERROR:",
        error
      );

      setMedicines([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    fetchExpiryMedicines();
  }, []);

  // ==========================================
  // PULL TO REFRESH
  // ==========================================

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchExpiryMedicines();
  }, []);

  // ==========================================
  // EXPIRY COLOR
  // ==========================================

  const getExpiryColor = (daysLeft) => {
    if (daysLeft <= 30) {
      return "#E53935";
    }

    if (daysLeft <= 90) {
      return "#F57C00";
    }

    return "#FBC02D";
  };

  // ==========================================
  // EXPIRY TEXT
  // ==========================================

  const getExpiryText = (daysLeft) => {
    if (daysLeft === 0) {
      return "Expires Today";
    }

    if (daysLeft === 1) {
      return "1 Day Left";
    }

    return `${daysLeft} Days Left`;
  };

  // ==========================================
  // RENDER MEDICINE
  // ==========================================

  const renderMedicine = ({
    item,
    index,
  }) => {
    const daysLeft = getDaysLeft(
      item.expiry
    );

    const expiryColor =
      getExpiryColor(daysLeft);

    return (
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

        <View style={styles.expiryContainer}>
          <Ionicons
            name="calendar-outline"
            size={19}
            color={expiryColor}
          />

          <Text
            style={[
              styles.expiryDate,
              {
                color: expiryColor,
              },
            ]}
          >
            {formatDate(item.expiry)}
          </Text>

          <Text
            style={[
              styles.daysLeft,
              {
                color: expiryColor,
              },
            ]}
          >
            {getExpiryText(daysLeft)}
          </Text>
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
          title="Expiry Alert"
          showBackButton
          onBackPress={() =>
            navigation.goBack()
          }
        />

        <View
          style={styles.loadingContainer}
        >
          <ActivityIndicator
            size="large"
            color="#2E7D32"
          />

          <Text style={styles.loadingText}>
            Checking medicine expiry...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

    // ==========================================
  // EXPORT EXPIRING MEDICINES TO PDF
  // ==========================================

  const exportToPDF = async () => {
    try {
      if (medicines.length === 0) {
        return;
      }

      const tableRows = medicines
        .map(
          (med, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${med.name || "Medicine"}</td>
              <td>${formatDate(med.expiry)}</td>
              <td>${med.stock || 0}</td>
              <td>${getDaysLeft(med.expiry)} Days</td>
            </tr>
          `
        )
        .join("");

      const html = `
        <html>
          <head>
            <meta charset="utf-8" />

            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                color: #222;
              }

              h1 {
                color: #2E7D32;
                text-align: center;
                margin-bottom: 5px;
              }

              .subtitle {
                text-align: center;
                color: #666;
                margin-bottom: 20px;
              }

              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }

              th {
                background-color: #2E7D32;
                color: #ffffff;
                padding: 10px;
                border: 1px solid #dddddd;
                text-align: center;
              }

              td {
                padding: 10px;
                border: 1px solid #dddddd;
                text-align: center;
              }
            </style>
          </head>

          <body>
            <h1>Om Sanjeevani</h1>

            <div class="subtitle">
              Expiring Medicines Report - Next 180 Days
            </div>

            <p>
              Total Expiring Medicines: ${medicines.length}
            </p>

            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Medicine Name</th>
                  <th>Expiry Date</th>
                  <th>Stock</th>
                  <th>Days Left</th>
                </tr>
              </thead>

              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </body>
        </html>
      `;

      const { uri } =
        await Print.printToFileAsync({
          html,
        });

      const canShare =
        await Sharing.isAvailableAsync();

      if (canShare) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle:
            "Expiring Medicines Report",
        });
      }

    } catch (error) {
      console.log(
        "PDF EXPORT ERROR:",
        error
      );
    }
  };
  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppHeader
        title="Expiry Alert"
        showBackButton
        onBackPress={() =>
          navigation.goBack()
        }
      />

      <FlatList
        data={medicines}
        keyExtractor={(item, index) =>
          item._id?.toString() ||
          index.toString()
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
            <View
              style={styles.headerContainer}
            >
              <View
                style={styles.headerIcon}
              >
                <Ionicons
                  name="calendar-outline"
                  size={25}
                  color="#E53935"
                />
              </View>

              <View
                style={
                  styles.headerTextContainer
                }
              >
                <Text style={styles.title}>
                  Expiring Medicines
                </Text>

                <Text
                  style={styles.subtitle}
                >
                  {medicines.length} medicine
                  {medicines.length !== 1
                    ? "s"
                    : ""}{" "}
                  expiring within 180 days
                </Text>
                <TouchableOpacity
                 style={styles.exportButton}
                  onPress={exportToPDF}
                  >
                <Ionicons
                 name="document-text-outline"
                 size={20}
                color="#FFFFFF"
               />

  <Text style={styles.exportButtonText}>
    Export PDF
  </Text>
</TouchableOpacity>
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View
            style={styles.emptyContainer}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={70}
              color="#2E7D32"
            />

            <Text
              style={styles.emptyTitle}
            >
              No Expiry Alert
            </Text>

            <Text
              style={styles.emptySubtitle}
            >
              No medicines are expiring
              within the next 180 days.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}