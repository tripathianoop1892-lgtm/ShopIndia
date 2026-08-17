import React, { useCallback, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styles from "./PrescriptionScreenStyles";


// ==========================================
// PRESCRIPTION SCREEN
// ==========================================

export default function PrescriptionScreen({ navigation }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  // ==========================================
  // LOAD PRESCRIPTIONS
  // ==========================================

  const loadPrescriptions = useCallback(async () => {
    try {
      setLoading(true);

      /*
       * Backend API connection will be connected
       * here after confirming the shopkeeper
       * prescription API in mobile api.js.
       */

      setPrescriptions([]);

    } catch (error) {
      console.error(
        "Shopkeeper Prescription Error:",
        error
      );

      Alert.alert(
        "Error",
        "Unable to load prescriptions."
      );
    } finally {
      setLoading(false);
    }
  }, []);


  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadPrescriptions();
    } finally {
      setRefreshing(false);
    }
  };


  // ==========================================
  // PRESCRIPTION ITEM
  // ==========================================

  const renderPrescription = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.prescriptionCard}
        activeOpacity={0.8}
        onPress={() => {
          if (item?._id) {
            navigation.navigate(
              "ShopkeeperPrescriptionDetails",
              {
                prescriptionId: item._id,
              }
            );
          }
        }}
      >

        <View style={styles.cardTop}>

          <View style={styles.iconBox}>
            <Ionicons
              name="document-text-outline"
              size={26}
              color="#008C3A"
            />
          </View>

          <View style={styles.cardInfo}>

            <Text style={styles.customerName}>
              {item?.customerName ||
                "Customer"}
            </Text>

            <Text style={styles.prescriptionId}>
              Prescription ID:{" "}
              {item?._id || "N/A"}
            </Text>

          </View>

        </View>


        <View style={styles.cardBottom}>

          <View>
            <Text style={styles.label}>
              Status
            </Text>

            <Text
              style={[
                styles.status,
                item?.status === "Approved"
                  ? styles.approved
                  : item?.status === "Rejected"
                  ? styles.rejected
                  : styles.pending,
              ]}
            >
              {item?.status || "Pending"}
            </Text>
          </View>


          <Ionicons
            name="chevron-forward-outline"
            size={22}
            color="#777777"
          />

        </View>

      </TouchableOpacity>
    );
  };


  // ==========================================
  // EMPTY STATE
  // ==========================================

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator
            size="large"
            color="#008C3A"
          />

          <Text style={styles.emptyText}>
            Loading prescriptions...
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>

        <View style={styles.emptyIcon}>
          <Ionicons
            name="document-text-outline"
            size={50}
            color="#008C3A"
          />
        </View>

        <Text style={styles.emptyTitle}>
          No Prescriptions
        </Text>

        <Text style={styles.emptyText}>
          Customer prescriptions will appear
          here when they are uploaded for your
          pharmacy.
        </Text>

      </View>
    );
  };


  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Ionicons
            name="menu-outline"
            size={28}
            color="#008C3A"
          />
        </TouchableOpacity>


        <View style={styles.headerTitleContainer}>

          <Text style={styles.headerTitle}>
            Prescriptions
          </Text>

          <Text style={styles.headerSubtitle}>
            Manage customer prescriptions
          </Text>

        </View>

      </View>


      {/* CONTENT */}

      <FlatList
        data={prescriptions}
        keyExtractor={(item, index) =>
          item?._id || index.toString()
        }
        renderItem={renderPrescription}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          prescriptions.length === 0
            ? styles.emptyList
            : styles.list
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#008C3A"]}
          />
        }
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
}