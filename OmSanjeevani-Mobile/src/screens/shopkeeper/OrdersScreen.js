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
import { getOrders, updateOrder } from "../../services/api";

export default function OrdersScreen({
  navigation,
}) {
  // ==========================================
  // State
  // ==========================================

  const [orders, setOrders] = useState([]);

  const [activeTab, setActiveTab] =
    useState("b2c-retail");

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  // ==========================================
  // Fetch Orders
  // ==========================================

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const filter =
        activeTab === "b2b-procure"
          ? "b2b-purchases"
          : "b2c-retail";

      const data = await getOrders(filter);

      setOrders(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Error fetching shopkeeper orders:",
        error
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Update Order Status
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
        "Order status update error:",
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
  // Confirmation
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
  // Status Color
  // ==========================================

  const getStatusColor = (status) => {
    switch (
      status?.toLowerCase()
    ) {
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
  // Format Date
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
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
  // Render Medicine
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
        <View
          style={styles.medicineInfo}
        >
          <Text
            style={styles.medicineName}
            numberOfLines={1}
          >
            {medicine?.name ||
              "Medicine"}
          </Text>

          <Text
            style={
              styles.medicineQuantity
            }
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
  // Render Order
  // ==========================================

  const renderOrder = ({
    item,
  }) => {
    const statusColor =
      getStatusColor(
        item?.status
      );

    const totalAmount = Number(
      item?.totalAmount ||
        item?.price ||
        0
    );

    const medicines =
      Array.isArray(item?.items)
        ? item.items
        : [];

    const isB2CRetail =
      activeTab === "b2c-retail";

    return (
      <View
        style={styles.orderCard}
      >
        {/* =====================================
            Header
        ====================================== */}

        <View
          style={styles.orderHeader}
        >
          <View>
            <Text
              style={
                styles.orderIdLabel
              }
            >
              Order ID
            </Text>

            <Text
              style={styles.orderId}
            >
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
                  color:
                    statusColor,
                },
              ]}
            >
              {item?.status ||
                "Unknown"}
            </Text>
          </View>
        </View>

        {/* =====================================
            Customer / Distributor
        ====================================== */}

        <View
          style={styles.infoRow}
        >
          <Ionicons
            name={
              isB2CRetail
                ? "person-outline"
                : "business-outline"
            }
            size={20}
            color="#2E7D32"
          />

          <View
            style={
              styles.infoContent
            }
          >
            <Text
              style={
                styles.infoLabel
              }
            >
              {isB2CRetail
                ? "Customer"
                : "Distributor"}
            </Text>

            <Text
              style={
                styles.infoValue
              }
            >
              {isB2CRetail
                ? item?.customerName ||
                  "Consumer"
                : item?.sellerId
                    ?.name ||
                  item?.company ||
                  "Distributor Entity"}
            </Text>
          </View>
        </View>

        {/* =====================================
            Date
        ====================================== */}

        <View
          style={styles.infoRow}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#2E7D32"
          />

          <View
            style={
              styles.infoContent
            }
          >
            <Text
              style={
                styles.infoLabel
              }
            >
              Order Date
            </Text>

            <Text
              style={
                styles.infoValue
              }
            >
              {formatDate(
                item?.createdAt
              )}
            </Text>
          </View>
        </View>

        {/* =====================================
            Medicines
        ====================================== */}

        <View
          style={
            styles.medicinesSection
          }
        >
          <View
            style={
              styles.medicinesHeader
            }
          >
            <Ionicons
              name="cube-outline"
              size={20}
              color="#2E7D32"
            />

            <Text
              style={
                styles.medicinesTitle
              }
            >
              Medicines
            </Text>
          </View>

          {medicines.length > 0 ? (
            medicines.map(
              renderMedicine
            )
          ) : (
            <Text
              style={
                styles.noItemsText
              }
            >
              No medicine details
              available.
            </Text>
          )}
        </View>

        {/* =====================================
            Total
        ====================================== */}

        <View
          style={styles.totalRow}
        >
          <Text
            style={styles.totalLabel}
          >
            Invoice Total
          </Text>

          <Text
            style={
              styles.totalAmount
            }
          >
            ₹
            {totalAmount.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
              }
            )}
          </Text>
        </View>

        {/* =====================================
            View Details
        ====================================== */}

        <TouchableOpacity
          style={
            styles.detailsButton
          }
          onPress={() =>
            navigation.navigate(
              "ShopkeeperOrderDetails",
              {
                order: item,
                orderType:
                  activeTab,
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
            style={
              styles.detailsButtonText
            }
          >
            View Order Details
          </Text>
        </TouchableOpacity>

        {/* =====================================
            B2C Actions
        ====================================== */}

        {isB2CRetail &&
        item?.status ===
          "Pending" ? (
          <View
            style={
              styles.actionRow
            }
          >
            <TouchableOpacity
              style={
                styles.approveButton
              }
              disabled={
                actionLoading
              }
              onPress={() =>
                confirmStatusUpdate(
                  item,
                  "Approved"
                )
              }
            >
              {actionLoading ? (
                <ActivityIndicator
                  color="#FFFFFF"
                  size="small"
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
              style={
                styles.rejectButton
              }
              disabled={
                actionLoading
              }
              onPress={() =>
                confirmStatusUpdate(
                  item,
                  "Rejected"
                )
              }
            >
              {actionLoading ? (
                <ActivityIndicator
                  color="#FFFFFF"
                  size="small"
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
            style={
              styles.processedText
            }
          >
            Processed
          </Text>
        )}
      </View>
    );
  };

  // ==========================================
  // Empty Orders
  // ==========================================

  const renderEmpty = () => {
    return (
      <View
        style={styles.emptyContainer}
      >
        <Ionicons
          name="receipt-outline"
          size={70}
          color="#CCCCCC"
        />

        <Text
          style={styles.emptyTitle}
        >
          No Orders Found
        </Text>

        <Text
          style={
            styles.emptySubtitle
          }
        >
          No orders are available for
          the selected category.
        </Text>
      </View>
    );
  };

  // ==========================================
  // Main Screen
  // ==========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppHeader
        title="Order Management"
        showBackButton
        onBackPress={() =>
          navigation.goBack()
        }
      />

      {/* =====================================
          Tabs
      ====================================== */}

      <View
        style={styles.tabContainer}
      >
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab ===
              "b2c-retail" &&
              styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab(
              "b2c-retail"
            )
          }
        >
          <Ionicons
            name="person-outline"
            size={18}
            color={
              activeTab ===
              "b2c-retail"
                ? "#FFFFFF"
                : "#333333"
            }
          />

          <Text
            style={[
              styles.tabText,
              activeTab ===
                "b2c-retail" &&
                styles.activeTabText,
            ]}
          >
            Customer Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab ===
              "b2b-procure" &&
              styles.activeTab,
          ]}
          onPress={() =>
            setActiveTab(
              "b2b-procure"
            )
          }
        >
          <Ionicons
            name="business-outline"
            size={18}
            color={
              activeTab ===
              "b2b-procure"
                ? "#FFFFFF"
                : "#333333"
            }
          />

          <Text
            style={[
              styles.tabText,
              activeTab ===
                "b2b-procure" &&
                styles.activeTabText,
            ]}
          >
            Supply Orders
          </Text>
        </TouchableOpacity>
      </View>

      {/* =====================================
          Orders
      ====================================== */}

      {loading ? (
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
            style={
              styles.loadingText
            }
          >
            Loading orders...
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
          renderItem={
            renderOrder
          }
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={[
            styles.list,
            orders.length === 0 &&
              styles.emptyList,
          ]}
          ListEmptyComponent={
            renderEmpty
          }
        />
      )}
    </SafeAreaView>
  );
}