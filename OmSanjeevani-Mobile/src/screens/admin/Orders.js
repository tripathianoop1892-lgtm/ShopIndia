import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";

import styles from "./OrdersStyles";
import { getAdminOrders } from "../../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [statusModalVisible, setStatusModalVisible] =
    useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusOptions = [
    "All",
    "Pending",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [search, selectedStatus, orders]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await getAdminOrders();

      setOrders(Array.isArray(response) ? response : []);

      console.log("ADMIN ORDERS:", response);
    } catch (err) {
      console.error("Error fetching orders:", err);

      Alert.alert(
        "Error",
        "Unable to load orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let updatedOrders = [...orders];

    if (search.trim() !== "") {
      const searchText = search.toLowerCase();

      updatedOrders = updatedOrders.filter((order) => {
        const orderId = order._id?.toLowerCase() || "";
        const customer =
          order.customerName?.toLowerCase() || "";
        const shopkeeper =
          order.shopkeeperName?.toLowerCase() || "";

        return (
          orderId.includes(searchText) ||
          customer.includes(searchText) ||
          shopkeeper.includes(searchText)
        );
      });
    }

    if (selectedStatus !== "All") {
      updatedOrders = updatedOrders.filter(
        (order) =>
          order.status?.toLowerCase() ===
          selectedStatus.toLowerCase()
      );
    }

    setFilteredOrders(updatedOrders);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleDeleteOrder = (order) => {
    Alert.alert(
      "Delete Order",
      `Are you sure you want to delete order ${order._id}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Pending",
              "Delete API will be connected when backend delete order API is available."
            );
          },
        },
      ]
    );
  };

  const handleExportOrders = () => {
    Alert.alert(
      "Export Orders",
      "Export functionality will be connected with the final export API."
    );
  };

  const renderOrder = ({ item }) => {
    const status = item.status || "Pending";

    return (
      <View style={styles.orderCard}>
        <View style={styles.cardHeader}>
          <View style={styles.orderIdContainer}>
            <Text style={styles.orderLabel}>
              Order ID
            </Text>

            <Text
              style={styles.orderId}
              numberOfLines={1}
            >
              {item._id}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              status === "Delivered"
                ? styles.deliveredBadge
                : status === "Pending"
                ? styles.pendingBadge
                : styles.cancelledBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                status === "Delivered"
                  ? styles.deliveredText
                  : status === "Pending"
                  ? styles.pendingText
                  : styles.cancelledText,
              ]}
            >
              {status}
            </Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Customer
            </Text>

            <Text style={styles.detailValue}>
              {item.customerName || "N/A"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Shopkeeper
            </Text>

            <Text style={styles.detailValue}>
              {item.shopkeeperName || "N/A"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Amount
            </Text>

            <Text style={styles.amountText}>
              ₹{item.totalAmount || 0}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Date
            </Text>

            <Text style={styles.detailValue}>
              {item.date || "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => handleViewOrder(item)}
          >
            <Text style={styles.viewButtonText}>
              View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteOrder(item)}
          >
            <Text style={styles.deleteButtonText}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Orders Management
          </Text>

          <Text style={styles.subtitle}>
            Manage all customer orders
          </Text>
        </View>

        <TouchableOpacity
          style={styles.exportButton}
          onPress={handleExportOrders}
        >
          <Text style={styles.exportButtonText}>
            Export
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Order..."
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setStatusModalVisible(true)}
      >
        <Text style={styles.filterLabel}>
          Status
        </Text>

        <Text style={styles.filterValue}>
          {selectedStatus}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Loading orders...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrder}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          onRefresh={fetchOrders}
          refreshing={loading}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No orders found
              </Text>
            </View>
          }
        />
      )}

      {/* Status Filter Modal */}
      <Modal
        visible={statusModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() =>
          setStatusModalVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.statusModal}>
            <Text style={styles.modalTitle}>
              Filter by Status
            </Text>

            {statusOptions.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusOption,
                  selectedStatus === status &&
                    styles.selectedStatusOption,
                ]}
                onPress={() => {
                  setSelectedStatus(status);
                  setStatusModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.statusOptionText,
                    selectedStatus === status &&
                      styles.selectedStatusOptionText,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() =>
                setStatusModalVisible(false)
              }
            >
              <Text style={styles.closeModalButtonText}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Order Details Modal */}
      <Modal
        visible={selectedOrder !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() =>
          setSelectedOrder(null)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.orderModal}>
            <Text style={styles.modalTitle}>
              Order Details
            </Text>

            <Text style={styles.modalLabel}>
              Order ID
            </Text>

            <Text style={styles.modalValue}>
              {selectedOrder?._id}
            </Text>

            <Text style={styles.modalLabel}>
              Customer
            </Text>

            <Text style={styles.modalValue}>
              {selectedOrder?.customerName || "N/A"}
            </Text>

            <Text style={styles.modalLabel}>
              Shopkeeper
            </Text>

            <Text style={styles.modalValue}>
              {selectedOrder?.shopkeeperName || "N/A"}
            </Text>

            <Text style={styles.modalLabel}>
              Amount
            </Text>

            <Text style={styles.modalValue}>
              ₹{selectedOrder?.totalAmount || 0}
            </Text>

            <Text style={styles.modalLabel}>
              Status
            </Text>

            <Text style={styles.modalValue}>
              {selectedOrder?.status || "N/A"}
            </Text>

            <Text style={styles.modalLabel}>
              Date
            </Text>

            <Text style={styles.modalValue}>
              {selectedOrder?.date || "N/A"}
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setSelectedOrder(null)
              }
            >
              <Text style={styles.closeButtonText}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Orders;