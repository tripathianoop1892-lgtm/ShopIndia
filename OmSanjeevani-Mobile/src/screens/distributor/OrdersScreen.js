import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./OrdersScreenStyles";

import AppHeader from "../../components/headers/AppHeader";

import {
  getOrders,
  updateOrder,
} from "../../services/api";

export default function OrdersScreen({
  navigation,
}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] =
    useState(false);

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      setOrders(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Error fetching distributor orders:",
        error
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // STATUS COLOR
  // ==========================================

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "#FF9800";

      case "approved":
        return "#2E7D32";

      case "rejected":
        return "#E53935";

      case "delivered":
        return "#2E7D32";

      case "cancelled":
        return "#E53935";

      default:
        return "#777777";
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date not available";
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
  // UPDATE ORDER STATUS
  // ==========================================

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      setActionLoading(true);

      const res = await updateOrder(
        id,
        status
      );

      if (res?.success) {
        Alert.alert(
          "Order Updated",
          `Order successfully marked as ${status}.`
        );

        fetchOrders();
      } else {
        Alert.alert(
          "Update Failed",
          res?.message ||
            "Failed to update order status."
        );
      }
    } catch (error) {
      console.error(
        "Distributor order update error:",
        error
      );

      Alert.alert(
        "Error",
        "Network error while updating order."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ==========================================
  // CONFIRM STATUS UPDATE
  // ==========================================

  const confirmStatusUpdate = (
    order,
    status
  ) => {
    const action =
      status === "Approved"
        ? "approve"
        : "reject";

    Alert.alert(
      `${status} Order`,
      `Are you sure you want to ${action} this order?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: status,
          style:
            status === "Rejected"
              ? "destructive"
              : "default",
          onPress: () =>
            updateStatus(
              order._id,
              status
            ),
        },
      ]
    );
  };

  // ==========================================
  // RENDER MEDICINE
  // ==========================================

  const renderMedicine = (
    medicine,
    index
  ) => {
    const quantity = Number(
      medicine?.quantity || 0
    );

    const price = Number(
      medicine?.price || 0
    );

    return (
      <View
        key={
          medicine?._id ||
          medicine?.medicineId ||
          index
        }
        style={styles.medicineRow}
      >
        <View style={styles.medicineInfo}>
          <Text
            style={styles.medicineName}
            numberOfLines={2}
          >
            {medicine?.name ||
              "Medicine"}
          </Text>

          <Text
            style={styles.medicineQuantity}
          >
            Qty: {quantity}
          </Text>
        </View>

        <Text
          style={styles.medicinePrice}
        >
          ₹{price.toFixed(2)}
        </Text>
      </View>
    );
  };

  // ==========================================
  // RENDER ORDER
  // ==========================================

  const renderOrder = ({
    item,
  }) => {
    const statusColor =
      getStatusColor(item?.status);

    const medicines =
      Array.isArray(item?.items)
        ? item.items
        : [];

    const totalAmount = Number(
      item?.finalAmount ||
      item?.totalAmount ||
      item?.subtotal ||
      item?.price ||
      0
    );

    return (
      <View style={styles.orderCard}>

        {/* HEADER */}

        <View style={styles.orderHeader}>
          <View>
            <Text
              style={styles.orderIdLabel}
            >
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
                backgroundColor:
                  `${statusColor}18`,
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: statusColor,
                },
              ]}
            >
              {item?.status ||
                "Unknown"}
            </Text>
          </View>
        </View>

        {/* SHOPKEEPER */}

        <View style={styles.infoRow}>
          <Ionicons
            name="storefront-outline"
            size={21}
            color="#2E7D32"
          />

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>
              Shopkeeper
            </Text>

            <Text style={styles.infoValue}>
              {item?.shopkeeperName ||
                item?.buyerId?.name ||
                "Retail Pharmacy"}
            </Text>
          </View>
        </View>

        {/* DATE */}

        <View style={styles.infoRow}>
          <Ionicons
            name="calendar-outline"
            size={21}
            color="#2E7D32"
          />

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>
              Order Date
            </Text>

            <Text style={styles.infoValue}>
              {formatDate(
                item?.createdAt
              )}
            </Text>
          </View>
        </View>

        {/* MEDICINES */}

        <View style={styles.medicinesSection}>
          <View style={styles.medicinesHeader}>
            <Ionicons
              name="cube-outline"
              size={21}
              color="#2E7D32"
            />

            <Text
              style={styles.medicinesTitle}
            >
              Medicines Requested
            </Text>
          </View>

          {medicines.length > 0 ? (
            medicines.map(renderMedicine)
          ) : (
            <Text
              style={styles.noItemsText}
            >
              No medicine details available.
            </Text>
          )}
        </View>

        {/* TOTAL */}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>
            Total Amount
          </Text>

          <Text style={styles.totalAmount}>
            ₹
            {totalAmount.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </Text>
        </View>

        {/* VIEW DETAILS */}

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() =>
            navigation.navigate(
              "DistributorOrderDetails",
              {
                order: item,
              }
            )
          }
        >
          <Ionicons
            name="receipt-outline"
            size={18}
            color="#FFFFFF"
          />

          <Text
            style={styles.detailsButtonText}
          >
            View Order Details
          </Text>
        </TouchableOpacity>

        {/* APPROVE / REJECT */}

        {item?.status === "Pending" ? (
          <View style={styles.actionRow}>

            <TouchableOpacity
              style={styles.approveButton}
              disabled={actionLoading}
              onPress={() =>
                confirmStatusUpdate(
                  item,
                  "Approved"
                )
              }
            >
              {actionLoading ? (
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />
              ) : (
                <>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={19}
                    color="#FFFFFF"
                  />

                  <Text
                    style={
                      styles.actionButtonText
                    }
                  >
                    Approve
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rejectButton}
              disabled={actionLoading}
              onPress={() =>
                confirmStatusUpdate(
                  item,
                  "Rejected"
                )
              }
            >
              {actionLoading ? (
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />
              ) : (
                <>
                  <Ionicons
                    name="close-circle-outline"
                    size={19}
                    color="#FFFFFF"
                  />

                  <Text
                    style={
                      styles.actionButtonText
                    }
                  >
                    Reject
                  </Text>
                </>
              )}
            </TouchableOpacity>

          </View>
        ) : (
          <Text
            style={styles.processedText}
          >
            Processed
          </Text>
        )}

      </View>
    );
  };

  // ==========================================
  // EMPTY STATE
  // ==========================================

  const renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>

        <Ionicons
          name="file-tray-outline"
          size={70}
          color="#CCCCCC"
        />

        <Text style={styles.emptyTitle}>
          No Orders Found
        </Text>

        <Text
          style={styles.emptySubtitle}
        >
          No active B2B wholesale
          orders are available.
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
        title="Incoming B2B Orders"
        showBackButton
        onBackPress={() =>
          navigation.goBack()
        }
      />

      {loading ? (
        <View
          style={styles.loadingContainer}
        >
          <ActivityIndicator
            size="large"
            color="#2E7D32"
          />

          <Text
            style={styles.loadingText}
          >
            Loading incoming orders...
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(
            item,
            index
          ) =>
            item?._id?.toString() ||
            index.toString()
          }
          renderItem={renderOrder}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.list,
            orders.length === 0 &&
              styles.emptyList,
          ]}
          ListEmptyComponent={renderEmpty}
          refreshing={loading}
          onRefresh={fetchOrders}
        />
      )}

    </SafeAreaView>
  );
}