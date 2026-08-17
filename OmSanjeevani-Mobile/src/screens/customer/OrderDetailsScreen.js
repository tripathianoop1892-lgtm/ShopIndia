import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./OrderDetailsScreenStyle";

import AppHeader from "../../components/headers/AppHeader";

export default function OrderDetailsScreen({
  route,
  navigation,
}) {
  const { order } = route.params || {};

  // ==========================================
  // Order Not Available
  // ==========================================

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          title="Order Details"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.emptyContainer}>
          <Ionicons
            name="receipt-outline"
            size={65}
            color="#CCCCCC"
          />

          <Text style={styles.emptyTitle}>
            Order Details Not Available
          </Text>

          <Text style={styles.emptySubtitle}>
            We could not find the selected order.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // Status Color
  // ==========================================

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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
  // Format Date
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
  // Order Data
  // ==========================================

  const items = Array.isArray(order.items)
    ? order.items
    : [];

  const subtotal = Number(order.subtotal || 0);

const deliveryCharge = Number(
  order.deliveryCharge || 0
);

const platformFee = Number(
  order.platformFee || 0
);

const discountAmount = Number(
  order.discountAmount || 0
);

const totalAmount = Number(
  order.finalAmount ??
  order.totalAmount ??
  0
);

const statusColor = getStatusColor(
  order.status
);

  return (
    <SafeAreaView style={styles.container}>
      {/* =====================================
          Header
      ====================================== */}

      <AppHeader
        title="Order Details"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =====================================
            Order Information
        ====================================== */}

        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.label}>
                Order ID
              </Text>

              <Text style={styles.orderId}>
                #{order._id || "N/A"}
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
                {order.status ||
                  "Unknown"}
              </Text>
            </View>
          </View>

          {/* Order Date */}

          <View style={styles.infoRow}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#2E7D32"
            />

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Order Date
              </Text>

              <Text style={styles.infoValue}>
                {formatDate(order.createdAt)}
              </Text>
            </View>
          </View>

          {/* Pharmacy */}

          <View style={styles.infoRow}>
            <Ionicons
              name="medical-outline"
              size={20}
              color="#2E7D32"
            />

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Pharmacy Store
              </Text>

              <Text style={styles.infoValue}>
                {order.sellerId?.name ||
                  "OmSanjeevani Local Pharmacy"}
              </Text>
            </View>
          </View>
        </View>

        {/* =====================================
            Medicines
        ====================================== */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="cube-outline"
              size={21}
              color="#2E7D32"
            />

            <Text
              style={styles.sectionTitle}
            >
              Ordered Medicines
            </Text>
          </View>

          {items.length > 0 ? (
            items.map((item, index) => {
              const quantity = Number(
                item?.quantity || 0
              );

              const price = Number(
                item?.price || 0
              );

              const itemTotal =
                price * quantity;

              return (
                <View
                  key={
                    item?._id ||
                    item?.medicineId ||
                    index
                  }
                  style={styles.medicineRow}
                >
                  <View
                    style={
                      styles.medicineInfo
                    }
                  >
                    <Text
                      style={
                        styles.medicineName
                      }
                    >
                      {item?.name ||
                        "Medicine"}
                    </Text>

                    <Text
                      style={
                        styles.medicineDetails
                      }
                    >
                      ₹{price.toFixed(2)} ×{" "}
                      {quantity}
                    </Text>
                  </View>

                  <Text
                    style={
                      styles.medicineTotal
                    }
                  >
                    ₹
                    {itemTotal.toFixed(2)}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text
              style={styles.noItemsText}
            >
              No medicine details available.
            </Text>
          )}
        </View>
        {/* =====================================
    Payment / Total
====================================== */}

<View style={styles.summaryCard}>

  <Text style={styles.summaryTitle}>
    Order Summary
  </Text>

  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>
      Items
    </Text>

    <Text style={styles.summaryValue}>
      {items.length}
    </Text>
  </View>

  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>
      Subtotal
    </Text>

    <Text style={styles.summaryValue}>
      ₹{subtotal.toFixed(2)}
    </Text>
  </View>

  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>
      Delivery Charge
    </Text>

    <Text style={styles.summaryValue}>
      ₹{deliveryCharge.toFixed(2)}
    </Text>
  </View>

  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>
      Platform Fee
    </Text>

    <Text style={styles.summaryValue}>
      ₹{platformFee.toFixed(2)}
    </Text>
  </View>

  {discountAmount > 0 && (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>
        Discount
      </Text>

      <Text style={styles.summaryValue}>
        -₹{discountAmount.toFixed(2)}
      </Text>
    </View>
  )}

  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>
      Payment Method
    </Text>

    <Text style={styles.summaryValue}>
      Cash on Delivery
    </Text>
  </View>

  <View style={styles.divider} />

  <View style={styles.totalRow}>
    <Text style={styles.totalLabel}>
      Total Amount
    </Text>

    <Text style={styles.totalAmount}>
      ₹{totalAmount.toFixed(2)}
    </Text>
  </View>

</View>
      </ScrollView>
    </SafeAreaView>
  );
}