import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./OrdersDetailsScreenStyles";

import AppHeader from "../../components/headers/AppHeader";

export default function OrdersDetailsScreen({
  route,
  navigation,
}) {
  const {
    order,
    orderType = "b2c-retail",
  } = route.params || {};

  // ==========================================
  // Order Not Available
  // ==========================================

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          title="Order Details"
          showBackButton
          onBackPress={() =>
            navigation.goBack()
          }
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
            The selected order could not be
            loaded.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
  // Order Type
  // ==========================================

  const isB2C =
    orderType === "b2c-retail";

  // ==========================================
  // Status
  // ==========================================

  const statusColor =
    getStatusColor(order.status);

  // ==========================================
  // Items
  // ==========================================

  const items = Array.isArray(
    order.items
  )
    ? order.items
    : [];

  // ==========================================
  // Total
  // ==========================================

  const totalAmount = Number(
    order.totalAmount ||
      order.price ||
      0
  );

  // ==========================================
  // Customer / Distributor
  // ==========================================

  const partyName = isB2C
    ? order.customerName ||
      "Consumer"
    : order.sellerId?.name ||
      order.company ||
      "Distributor Entity";

  return (
    <SafeAreaView
      style={styles.container}
    >
      {/* ======================================
          Header
      ======================================= */}

      <AppHeader
        title="Order Details"
        showBackButton
        onBackPress={() =>
          navigation.goBack()
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        {/* ======================================
            Order Header
        ======================================= */}

        <View
          style={styles.orderCard}
        >
          <View
            style={styles.orderHeader}
          >
            <View>
              <Text
                style={styles.label}
              >
                Order ID
              </Text>

              <Text
                style={styles.orderId}
              >
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
                    color:
                      statusColor,
                  },
                ]}
              >
                {order.status ||
                  "Unknown"}
              </Text>
            </View>
          </View>

          {/* Order Type */}

          <View
            style={styles.infoRow}
          >
            <Ionicons
              name={
                isB2C
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
                style={styles.infoLabel}
              >
                Order Type
              </Text>

              <Text
                style={styles.infoValue}
              >
                {isB2C
                  ? "Customer Retail Order (B2C)"
                  : "Wholesaler Supply Order (B2B)"}
              </Text>
            </View>
          </View>

          {/* Customer / Distributor */}

          <View
            style={styles.infoRow}
          >
            <Ionicons
              name={
                isB2C
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
                style={styles.infoLabel}
              >
                {isB2C
                  ? "Customer"
                  : "Distributor"}
              </Text>

              <Text
                style={styles.infoValue}
              >
                {partyName}
              </Text>
            </View>
          </View>

          {/* Date */}

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
                style={styles.infoLabel}
              >
                Order Date
              </Text>

              <Text
                style={styles.infoValue}
              >
                {formatDate(
                  order.createdAt
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* ======================================
            Medicines
        ======================================= */}

        <View
          style={styles.section}
        >
          <View
            style={
              styles.sectionHeader
            }
          >
            <Ionicons
              name="cube-outline"
              size={21}
              color="#2E7D32"
            />

            <Text
              style={
                styles.sectionTitle
              }
            >
              Medicines Ordered
            </Text>
          </View>

          {items.length > 0 ? (
            items.map(
              (item, index) => {
                const quantity =
                  Number(
                    item?.quantity || 0
                  );

                const price =
                  Number(
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
                    style={
                      styles.medicineRow
                    }
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
                        numberOfLines={2}
                      >
                        {item?.name ||
                          "Medicine"}
                      </Text>

                      <Text
                        style={
                          styles.medicineDetails
                        }
                      >
                        ₹
                        {price.toFixed(
                          2
                        )}{" "}
                        × {quantity}
                      </Text>
                    </View>

                    <Text
                      style={
                        styles.medicineTotal
                      }
                    >
                      ₹
                      {itemTotal.toFixed(
                        2
                      )}
                    </Text>
                  </View>
                );
              }
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

        {/* ======================================
            Order Summary
        ======================================= */}

        <View
          style={styles.summaryCard}
        >
          <Text
            style={styles.summaryTitle}
          >
            Order Summary
          </Text>

          <View
            style={styles.summaryRow}
          >
            <Text
              style={styles.summaryLabel}
            >
              Total Items
            </Text>

            <Text
              style={styles.summaryValue}
            >
              {items.length}
            </Text>
          </View>

          <View
            style={styles.summaryRow}
          >
            <Text
              style={styles.summaryLabel}
            >
              Payment
            </Text>

            <Text
              style={styles.summaryValue}
            >
              Cash on Delivery
            </Text>
          </View>

          <View
            style={styles.divider}
          />

          <View
            style={styles.totalRow}
          >
            <Text
              style={styles.totalLabel}
            >
              Total Amount
            </Text>

            <Text
              style={styles.totalAmount}
            >
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}