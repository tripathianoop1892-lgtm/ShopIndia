import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../../components/headers/AppHeader";
import styles from "./EarningsScreenStyles";

import { getOrders } from "../../services/api";

export default function EarningsScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getOrders();

      const orderData = Array.isArray(response)
        ? response
        : Array.isArray(response?.orders)
        ? response.orders
        : [];

      setOrders(orderData);
    } catch (error) {
      console.log("EARNINGS FETCH ERROR:", error);
      setOrders([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  // ==========================================
  // CALCULATE EARNINGS
  // ==========================================

  const completedOrders = orders.filter((order) => {
    const status = order?.status?.toLowerCase();

    return (
      status === "approved" ||
      status === "delivered" ||
      status === "completed"
    );
  });

  const pendingOrders = orders.filter((order) => {
    return order?.status?.toLowerCase() === "pending";
  });

  const totalEarnings = completedOrders.reduce(
    (total, order) =>
      total + Number(order?.totalAmount || 0),
    0
  );

  const pendingAmount = pendingOrders.reduce(
    (total, order) =>
      total + Number(order?.totalAmount || 0),
    0
  );

  // ==========================================
  // FORMAT AMOUNT
  // ==========================================

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          title="Earnings"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#2E7D32"
          />

          <Text style={styles.loadingText}>
            Loading earnings...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Earnings"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#2E7D32"]}
          />
        }
      >
        {/* ======================================
            TOTAL EARNINGS CARD
        ======================================= */}

        <View style={styles.earningsCard}>
          <View style={styles.earningsIcon}>
            <Ionicons
              name="wallet-outline"
              size={32}
              color="#2E7D32"
            />
          </View>

          <Text style={styles.earningsLabel}>
            Total Earnings
          </Text>

          <Text style={styles.earningsAmount}>
            ₹{formatAmount(totalEarnings)}
          </Text>

          <Text style={styles.earningsSubText}>
            From completed orders
          </Text>
        </View>

        {/* ======================================
            STATISTICS
        ======================================= */}

        <Text style={styles.sectionTitle}>
          Earnings Overview
        </Text>

        <View style={styles.statsGrid}>
          {/* COMPLETED */}

          <View style={styles.statCard}>
            <View style={styles.statIconGreen}>
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="#2E7D32"
              />
            </View>

            <Text style={styles.statNumber}>
              {completedOrders.length}
            </Text>

            <Text style={styles.statLabel}>
              Completed Orders
            </Text>
          </View>

          {/* PENDING */}

          <View style={styles.statCard}>
            <View style={styles.statIconOrange}>
              <Ionicons
                name="time-outline"
                size={24}
                color="#F57C00"
              />
            </View>

            <Text style={styles.statNumber}>
              {pendingOrders.length}
            </Text>

            <Text style={styles.statLabel}>
              Pending Orders
            </Text>
          </View>
        </View>

        {/* ======================================
            PENDING AMOUNT
        ======================================= */}

        <View style={styles.pendingCard}>
          <View style={styles.pendingIcon}>
            <Ionicons
              name="hourglass-outline"
              size={26}
              color="#F57C00"
            />
          </View>

          <View style={styles.pendingContent}>
            <Text style={styles.pendingLabel}>
              Pending Earnings
            </Text>

            <Text style={styles.pendingAmount}>
              ₹{formatAmount(pendingAmount)}
            </Text>
          </View>
        </View>

        {/* ======================================
            RECENT EARNINGS
        ======================================= */}

        <Text style={styles.sectionTitle}>
          Recent Earnings
        </Text>

        {completedOrders.length > 0 ? (
          completedOrders
            .slice()
            .reverse()
            .slice(0, 10)
            .map((order, index) => (
              <View
                key={order?._id || index}
                style={styles.orderCard}
              >
                <View style={styles.orderLeft}>
                  <View style={styles.orderIcon}>
                    <Ionicons
                      name="receipt-outline"
                      size={22}
                      color="#2E7D32"
                    />
                  </View>

                  <View style={styles.orderInfo}>
                    <Text style={styles.orderId}>
                      Order #
                      {order?._id
                        ? order._id.slice(-6)
                        : "N/A"}
                    </Text>

                    <Text style={styles.orderStatus}>
                      {order?.status || "Completed"}
                    </Text>
                  </View>
                </View>

                <Text style={styles.orderAmount}>
                  + ₹
                  {formatAmount(
                    order?.totalAmount || 0
                  )}
                </Text>
              </View>
            ))
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons
              name="wallet-outline"
              size={55}
              color="#CCCCCC"
            />

            <Text style={styles.emptyText}>
              No earnings available yet.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}