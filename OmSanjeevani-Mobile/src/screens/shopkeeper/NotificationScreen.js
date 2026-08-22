import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./NotificationScreenStyles";

// ==========================================
// API
// ==========================================

// Apne existing api service ke according
// is import path ko check kar lena.
import api from "../../services/api";

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

  const loadNotifications =
    useCallback(async () => {
      try {
        const response =
          await api.get("/notifications");

        const data =
          response?.data;

        if (data?.success) {
          setNotifications(
            data.notifications || []
          );
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.log(
          "NOTIFICATION LOAD ERROR:",
          error?.response?.data ||
          error?.message
        );

        setNotifications([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, []);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = () => {
    setRefreshing(true);
    loadNotifications();
  };

  // ==========================================
  // MARK AS READ
  // ==========================================

  const handleNotificationPress =
    async (notification) => {
      try {
        if (!notification.isRead) {
          await api.put(
            `/notifications/${notification._id}/read`
          );

          setNotifications((previous) =>
            previous.map((item) =>
              item._id === notification._id
                ? {
                    ...item,
                    isRead: true,
                  }
                : item
            )
          );
        }

        // ======================================
        // FUTURE NAVIGATION
        // ======================================

        /*
        Example:

        if (
          notification.type === "order"
        ) {
          navigation.navigate(
            "ShopkeeperOrderDetails",
            {
              orderId:
                notification.orderId,
            }
          );
        }
        */

      } catch (error) {
        console.log(
          "MARK READ ERROR:",
          error?.response?.data ||
          error?.message
        );
      }
    };

  // ==========================================
  // MARK ALL AS READ
  // ==========================================

  const handleMarkAllRead =
    async () => {
      try {
        const unreadNotifications =
          notifications.filter(
            (item) => !item.isRead
          );

        if (
          unreadNotifications.length === 0
        ) {
          Alert.alert(
            "Notifications",
            "All notifications are already read."
          );

          return;
        }

        await api.put(
          "/notifications/read-all"
        );

        setNotifications((previous) =>
          previous.map((item) => ({
            ...item,
            isRead: true,
          }))
        );

      } catch (error) {
        console.log(
          "MARK ALL READ ERROR:",
          error?.response?.data ||
          error?.message
        );

        Alert.alert(
          "Error",
          "Unable to mark notifications as read."
        );
      }
    };

  // ==========================================
  // DELETE NOTIFICATION
  // ==========================================

  const handleDelete =
    (notificationId) => {
      Alert.alert(
        "Delete Notification",
        "Are you sure you want to delete this notification?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await api.delete(
                  `/notifications/${notificationId}`
                );

                setNotifications(
                  (previous) =>
                    previous.filter(
                      (item) =>
                        item._id !==
                        notificationId
                    )
                );

              } catch (error) {
                console.log(
                  "DELETE NOTIFICATION ERROR:",
                  error?.response?.data ||
                  error?.message
                );

                Alert.alert(
                  "Error",
                  "Unable to delete notification."
                );
              }
            },
          },
        ]
      );
    };

  // ==========================================
  // GET ICON
  // ==========================================

  const getNotificationIcon =
    (type) => {
      switch (type) {
        case "order":
          return "cube-outline";

        case "low_stock":
          return "warning-outline";

        case "expiry":
          return "time-outline";

        case "payment":
          return "cash-outline";

        default:
          return "notifications-outline";
      }
    };

  // ==========================================
  // RENDER ITEM
  // ==========================================

  const renderNotification =
    ({ item }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.notificationCard,

            !item.isRead &&
              styles.unreadCard,
          ]}
          onPress={() =>
            handleNotificationPress(item)
          }
        >
          {/* ICON */}

          <View
            style={[
              styles.iconContainer,

              !item.isRead &&
                styles.unreadIconContainer,
            ]}
          >
            <Ionicons
              name={getNotificationIcon(
                item.type
              )}
              size={24}
              color="#2E7D32"
            />
          </View>

          {/* CONTENT */}

          <View style={styles.content}>

            <View style={styles.titleRow}>

              <Text
                style={[
                  styles.notificationTitle,

                  !item.isRead &&
                    styles.unreadTitle,
                ]}
                numberOfLines={1}
              >
                {item.title ||
                  "Notification"}
              </Text>

              {!item.isRead && (
                <View
                  style={styles.unreadDot}
                />
              )}

            </View>

            <Text
              style={styles.message}
              numberOfLines={2}
            >
              {item.message}
            </Text>

            <Text style={styles.time}>
              {item.createdAt
                ? new Date(
                    item.createdAt
                  ).toLocaleString()
                : ""}
            </Text>

          </View>

          {/* DELETE */}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              handleDelete(item._id)
            }
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color="#E53935"
            />
          </TouchableOpacity>

        </TouchableOpacity>
      );
    };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <View style={styles.centerContainer}>

        <ActivityIndicator
          size="large"
          color="#2E7D32"
        />

        <Text style={styles.loadingText}>
          Loading notifications...
        </Text>

      </View>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <View style={styles.container}>

      {/* ======================================
          HEADER
      ======================================= */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color="#2E7D32"
          />
        </TouchableOpacity>

        <View style={styles.headerContent}>

          <Text style={styles.headerTitle}>
            Notifications
          </Text>

          <Text style={styles.headerSubtitle}>
            Stay updated with your pharmacy
          </Text>

        </View>

        <TouchableOpacity
          style={styles.markReadButton}
          onPress={handleMarkAllRead}
        >
          <Ionicons
            name="checkmark-done-outline"
            size={24}
            color="#2E7D32"
          />
        </TouchableOpacity>

      </View>

      {/* ======================================
          NOTIFICATION LIST
      ======================================= */}

      <FlatList
        data={notifications}
        keyExtractor={(item, index) =>
          item._id ||
          item.id ||
          String(index)
        }
        renderItem={renderNotification}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          notifications.length === 0
            ? styles.emptyListContainer
            : styles.listContainer
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#2E7D32"]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>

            <View style={styles.emptyIconContainer}>
              <Ionicons
                name="notifications-off-outline"
                size={55}
                color="#9E9E9E"
              />
            </View>

            <Text style={styles.emptyTitle}>
              No Notifications
            </Text>

            <Text style={styles.emptyMessage}>
              You are all caught up. New updates
              will appear here.
            </Text>

          </View>
        }
      />

    </View>
  );
}