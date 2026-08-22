import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./NotificationScreenStyles";
import AppHeader from "../../components/headers/AppHeader";

import {
  MedicinesList,
  getOrders,
} from "../../services/api";

export default function NotificationScreen({
  navigation,
}) {
  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  // ==========================================
  // LOAD NOTIFICATIONS
  // ==========================================

  const loadNotifications = async () => {
    try {
      const [medicineRes, orderRes] =
        await Promise.all([
          MedicinesList(),
          getOrders(),
        ]);

      const medicines =
        Array.isArray(medicineRes?.medicines)
          ? medicineRes.medicines
          : Array.isArray(medicineRes)
          ? medicineRes
          : [];

      const orders =
        Array.isArray(orderRes?.orders)
          ? orderRes.orders
          : Array.isArray(orderRes)
          ? orderRes
          : [];

      const notificationData = [];

      // ======================================
      // LOW STOCK NOTIFICATIONS
      // ======================================

      medicines.forEach((medicine) => {
        const stock = Number(
          medicine.stock || 0
        );

        const lowStockLimit = Number(
          medicine.lowStockLimit ||
            medicine.lowStock ||
            10
        );

        if (stock <= lowStockLimit) {
          notificationData.push({
            id: `low-stock-${medicine._id}`,
            type: "lowStock",
            title: "Low Stock Alert",
            message: `${
              medicine.name || "Medicine"
            } has only ${stock} items left in stock.`,
            createdAt:
              medicine.updatedAt ||
              medicine.createdAt ||
              new Date().toISOString(),
            medicine,
          });
        }
      });

      // ======================================
      // EXPIRY NOTIFICATIONS
      // ======================================

      medicines.forEach((medicine) => {
        if (!medicine.expiry) return;

        const expiryDate = new Date(
          medicine.expiry
        );

        if (
          Number.isNaN(
            expiryDate.getTime()
          )
        ) {
          return;
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const difference =
          expiryDate.getTime() -
          today.getTime();

        const daysLeft = Math.ceil(
          difference /
            (1000 * 60 * 60 * 24)
        );

        if (daysLeft <= 30) {
          let message = "";

          if (daysLeft < 0) {
            message = `${
              medicine.name || "Medicine"
            } has expired.`;
          } else if (daysLeft === 0) {
            message = `${
              medicine.name || "Medicine"
            } expires today.`;
          } else {
            message = `${
              medicine.name || "Medicine"
            } will expire in ${daysLeft} day${
              daysLeft === 1 ? "" : "s"
            }.`;
          }

          notificationData.push({
            id: `expiry-${medicine._id}`,
            type: "expiry",
            title: "Expiry Alert",
            message,
            createdAt:
              medicine.expiry ||
              medicine.updatedAt ||
              new Date().toISOString(),
            medicine,
            daysLeft,
          });
        }
      });

      // ======================================
      // ORDER NOTIFICATIONS
      // ======================================

      orders.forEach((order) => {
        const status =
          order.status?.toLowerCase();

        if (status === "pending") {
          notificationData.push({
            id: `order-${order._id}`,
            type: "order",
            title: "New Order Received",
            message: `You have received a new order #${
              order._id
                ? order._id.slice(-6)
                : ""
            }.`,
            createdAt:
              order.createdAt ||
              new Date().toISOString(),
            order,
          });
        }
      });

      // ======================================
      // SORT BY DATE
      // ======================================

      notificationData.sort(
        (a, b) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      );

      setNotifications(
        notificationData
      );
    } catch (error) {
      console.log(
        "Notification Error:",
        error
      );

      setNotifications([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // ==========================================
  // REFRESH
  // ==========================================

  const onRefresh = () => {
    setRefreshing(true);
    loadNotifications();
  };

  // ==========================================
  // NOTIFICATION ICON
  // ==========================================

  const getNotificationIcon = (
    type
  ) => {
    switch (type) {
      case "lowStock":
        return "warning-outline";

      case "expiry":
        return "calendar-outline";

      case "order":
        return "receipt-outline";

      default:
        return "notifications-outline";
    }
  };

  // ==========================================
  // NOTIFICATION COLOR
  // ==========================================

  const getNotificationColor = (
    type
  ) => {
    switch (type) {
      case "lowStock":
        return "#FF9800";

      case "expiry":
        return "#E53935";

      case "order":
        return "#2E7D32";

      default:
        return "#607D8B";
    }
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "";
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
  // NOTIFICATION PRESS
  // ==========================================

  const handleNotificationPress = (
    item
  ) => {
    if (
      item.type === "lowStock"
    ) {
      navigation.navigate(
        "LowStockAlert"
      );
      return;
    }

    if (item.type === "expiry") {
      navigation.navigate(
        "ExpiryAlert"
      );
      return;
    }

    if (
      item.type === "order" &&
      item.order
    ) {
      navigation.navigate(
        "OrderDetails",
        {
          order: item.order,
        }
      );
    }
  };

  // ==========================================
  // RENDER ITEM
  // ==========================================

  const renderItem = ({
    item,
  }) => {
    const color =
      getNotificationColor(
        item.type
      );

    return (
      <TouchableOpacity
        style={styles.notificationCard}
        activeOpacity={0.75}
        onPress={() =>
          handleNotificationPress(
            item
          )
        }
      >
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: `${color}18`,
            },
          ]}
        >
          <Ionicons
            name={getNotificationIcon(
              item.type
            )}
            size={24}
            color={color}
          />
        </View>

        <View
          style={styles.notificationContent}
        >
          <View
            style={styles.notificationHeader}
          >
            <Text
              style={styles.notificationTitle}
            >
              {item.title}
            </Text>

            <Text
              style={styles.notificationDate}
            >
              {formatDate(
                item.createdAt
              )}
            </Text>
          </View>

          <Text
            style={styles.notificationMessage}
          >
            {item.message}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#AAAAAA"
        />
      </TouchableOpacity>
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
          title="Notifications"
          showBackButton
          onBackPress={() => navigation.navigate("Dashboard")}
        />

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
            Loading notifications...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppHeader
        title="Notifications"
        showBackButton
        onBackPress={() =>
          navigation.goBack()
        }
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={renderItem}
        contentContainerStyle={
          notifications.length === 0
            ? styles.emptyListContent
            : styles.listContent
        }
        showsVerticalScrollIndicator={
          false
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#2E7D32"]}
          />
        }
        ListEmptyComponent={
          <View
            style={styles.emptyContainer}
          >
            <Ionicons
              name="notifications-off-outline"
              size={70}
              color="#CCCCCC"
            />

            <Text
              style={styles.emptyTitle}
            >
              No Notifications
            </Text>

            <Text
              style={styles.emptySubtitle}
            >
              You don't have any new
              notifications right now.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}