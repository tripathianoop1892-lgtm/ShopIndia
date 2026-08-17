import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./OrdersScreenStyles";

import AppHeader from "../../components/headers/AppHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { getOrders } from "../../services/api";

export default function OrdersScreen({ navigation }) {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD ORDERS
  // ==========================================

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getOrders();

      console.log("MY ORDERS API RESPONSE:", response);

      if (Array.isArray(response)) {
        setOrders(response);
      } else if (Array.isArray(response?.data)) {
        setOrders(response.data);
      } else {
        setOrders([]);
      }

    } catch (error) {
      console.error("MY ORDERS ERROR:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // REFRESH WHEN SCREEN OPENS
  // ==========================================

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [loadOrders])
  );

  // ==========================================
  // STATUS COLOR
  // ==========================================

  const getStatusColor = (status) => {
    const currentStatus = status?.toLowerCase();

    switch (currentStatus) {
      case "pending":
        return "#FF9800";

      case "approved":
        return "#2196F3";

      case "delivered":
        return "#2E7D32";

      case "rejected":
      case "cancelled":
        return "#E53935";

      default:
        return "#777777";
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatOrderDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date not available";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // RENDER ORDER
  // ==========================================

  const renderOrder = ({ item }) => {

    const statusColor = getStatusColor(item?.status);

    const totalAmount = Number(
      item?.finalAmount ??
      item?.totalAmount ??
      0
    );

    const items = Array.isArray(item?.items)
      ? item.items
      : [];

    return (
      <TouchableOpacity
        style={styles.orderCard}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("OrderDetails", {
            order: item,
          })
        }
      >

        {/* ORDER HEADER */}

        <View style={styles.orderHeader}>

          <View>

            <Text style={styles.orderIdLabel}>
              Order ID
            </Text>

            <Text style={styles.orderId}>
              #{item?._id || "N/A"}
            </Text>

          </View>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: `${statusColor}18`,
              },
            ]}
          >

            <Ionicons
              name="ellipse"
              size={9}
              color={statusColor}
            />

            <Text
              style={[
                styles.statusText,
                {
                  color: statusColor,
                },
              ]}
            >
              {item?.status || "Unknown"}
            </Text>

          </View>

        </View>

        {/* PHARMACY */}

        <View style={styles.infoRow}>

          <Ionicons
            name="medical-outline"
            size={19}
            color="#2E7D32"
          />

          <View style={styles.infoContent}>

            <Text style={styles.infoLabel}>
              Pharmacy Store
            </Text>

            <Text style={styles.infoValue}>
              {item?.sellerId?.name ||
                "OmSanjeevani Local Pharmacy"}
            </Text>

          </View>

        </View>

        {/* DATE */}

        <View style={styles.infoRow}>

          <Ionicons
            name="calendar-outline"
            size={19}
            color="#2E7D32"
          />

          <View style={styles.infoContent}>

            <Text style={styles.infoLabel}>
              Order Date
            </Text>

            <Text style={styles.infoValue}>
              {formatOrderDate(item?.createdAt)}
            </Text>

          </View>

        </View>

        {/* MEDICINES */}

        <View style={styles.itemsSection}>

          <View style={styles.itemsHeader}>

            <Ionicons
              name="cube-outline"
              size={19}
              color="#2E7D32"
            />

            <Text style={styles.itemsTitle}>
              Medicines
            </Text>

          </View>

          {items.length > 0 ? (

            items.map((medicine, index) => (

              <View
                key={
                  medicine?.medicineId?.toString() ||
                  medicine?._id?.toString() ||
                  index.toString()
                }
                style={styles.medicineRow}
              >

                <View style={styles.medicineInfo}>

                  <Text
                    style={styles.medicineName}
                    numberOfLines={1}
                  >
                    {medicine?.name || "Medicine"}
                  </Text>

                  <Text style={styles.medicineQuantity}>
                    Qty: {Number(medicine?.quantity || 0)}
                  </Text>

                </View>

                <Text style={styles.medicinePrice}>
                  ₹
                  {(
                    Number(medicine?.price || 0) *
                    Number(medicine?.quantity || 0)
                  ).toFixed(2)}
                </Text>

              </View>

            ))

          ) : (

            <Text style={styles.noItemsText}>
              No medicine details available.
            </Text>

          )}

        </View>

        {/* TOTAL */}

        <View style={styles.totalRow}>

          <Text style={styles.totalLabel}>
            Invoice Total
          </Text>

          <Text style={styles.totalAmount}>
            ₹
            {totalAmount.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>

        </View>

        {/* DETAILS */}

        <View style={styles.detailsButton}>

          <PrimaryButton
            title="View Order Details"
            onPress={() =>
              navigation.navigate("OrderDetails", {
                order: item,
              })
            }
          />

        </View>

      </TouchableOpacity>
    );
  };

  // ==========================================
  // EMPTY ORDERS
  // ==========================================

  const renderEmptyOrders = () => {

    if (loading) {
      return (
        <View style={styles.emptyContainer}>

          <Text style={styles.emptyTitle}>
            Loading Orders...
          </Text>

        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>

        <Ionicons
          name="receipt-outline"
          size={70}
          color="#CCCCCC"
        />

        <Text style={styles.emptyTitle}>
          No Orders Found
        </Text>

        <Text style={styles.emptySubtitle}>
          Your placed orders will appear here.
        </Text>

      </View>
    );
  };

  // ==========================================
  // MAIN SCREEN
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>

      <AppHeader
        title="My Orders"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={orders}
        keyExtractor={(item, index) =>
          item?._id?.toString() ||
          index.toString()
        }
        renderItem={renderOrder}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.list,
          orders.length === 0 && styles.emptyList,
        ]}
        ListEmptyComponent={renderEmptyOrders}
      />

    </SafeAreaView>
  );
}