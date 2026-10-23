import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

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

  const [exportModalVisible, setExportModalVisible] =
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

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const exportOrdersToPdf = async (scope) => {
    const selectedOrders = scope === "all"
      ? orders
      : orders.filter(
          (order) => order.status?.toLowerCase() === scope
        );

    setExportModalVisible(false);

    if (selectedOrders.length === 0) {
      Alert.alert("Nothing to export", "No orders match the selected option.");
      return;
    }

    const rows = selectedOrders.map((order, index) => {
      const party = activeTab === "b2b-procure"
        ? order.sellerId?.name || order.company || "Distributor Entity"
        : order.customerName || order.buyerId?.name || "Customer";
      const items = (order.items || [])
        .map((item) => `${item.name || "Medicine"} (x${item.quantity || 0})`)
        .join(", ");
      const total = Number(order.finalAmount ?? order.totalAmount ?? order.price ?? 0)
        .toLocaleString("en-IN");

      return `<tr><td>${index + 1}</td><td>#${escapeHtml(order._id)}</td><td>${escapeHtml(party)}</td><td>${escapeHtml(items || "No items")}</td><td>₹${escapeHtml(total)}</td><td>${escapeHtml(order.status || "Unknown")}</td><td>${escapeHtml(formatDate(order.createdAt))}</td></tr>`;
    }).join("");

    const title = activeTab === "b2b-procure"
      ? "Wholesaler Supply Orders"
      : "Customer Retail Orders";
    const scopeLabel = scope === "all"
      ? "All statuses"
      : `${scope.charAt(0).toUpperCase()}${scope.slice(1)} orders`;
    const html = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0" /><style>
      @page { size: A4 landscape; margin: 12mm; }
      body { font-family: Arial, sans-serif; color: #172033; }
      h1 { color: #166534; margin-bottom: 4px; }
      p { color: #64748b; }
      table { width: 100%; border-collapse: collapse; font-size: 10px; }
      th { background: #166534; color: white; padding: 8px; text-align: left; }
      td { border: 1px solid #dbe3ea; padding: 7px; vertical-align: top; }
    </style></head><body><h1>Om Sanjeevani — ${escapeHtml(title)}</h1><p>${escapeHtml(scopeLabel)} · ${selectedOrders.length} order${selectedOrders.length === 1 ? "" : "s"}</p><table><thead><tr><th>S.No</th><th>Order ID</th><th>${activeTab === "b2b-procure" ? "Distributor" : "Customer"}</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: `${title} PDF`,
          UTI: ".pdf",
        });
      } else {
        await Print.printAsync({ html });
      }
    } catch (error) {
      console.error("Order PDF export error:", error);
      Alert.alert("Export failed", "The order PDF could not be created.");
    }
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

      <TouchableOpacity
        style={styles.exportButton}
        onPress={() => setExportModalVisible(true)}
      >
        <Ionicons name="document-text-outline" size={19} color="#FFFFFF" />
        <Text style={styles.exportButtonText}>Export PDF</Text>
      </TouchableOpacity>

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

      <Modal
        visible={exportModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setExportModalVisible(false)}
      >
        <View style={styles.exportModalOverlay}>
          <View style={styles.exportModalCard}>
            <Text style={styles.exportModalTitle}>Choose PDF export</Text>
            <Text style={styles.exportModalSubtitle}>
              Export orders from the currently selected tab.
            </Text>
            {[
              ["all", "All orders"],
              ["pending", "Pending orders"],
              ["paid", "Paid orders"],
              ["approved", "Approved orders"],
              ["delivered", "Delivered orders"],
              ["rejected", "Rejected orders"],
              ["cancelled", "Cancelled orders"],
            ].map(([scope, label]) => (
              <TouchableOpacity
                key={scope}
                style={styles.exportOption}
                onPress={() => exportOrdersToPdf(scope)}
              >
                <Text style={styles.exportOptionText}>{label}</Text>
                <Ionicons name="chevron-forward" size={18} color="#2E7D32" />
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.exportCancelButton}
              onPress={() => setExportModalVisible(false)}
            >
              <Text style={styles.exportCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
