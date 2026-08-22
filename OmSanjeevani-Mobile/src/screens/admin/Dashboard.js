import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import styles from "./DashboardStyles";

import DashboardHeader from "../../components/admin/DashboardHeader";
import MetricCard from "../../components/admin/MetricCard";

import { getAdminDashboard } from "../../services/api";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await getAdminDashboard();

      console.log("ADMIN DASHBOARD DATA:", response);

      setDashboardData(response.data);
    } catch (error) {
      console.error(
        "DASHBOARD API ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color="#2E7D32"
          />

          <Text style={{ marginTop: 10 }}>
            Loading Dashboard...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <DashboardHeader />

        {/* Dashboard Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Dashboard
          </Text>

          <Text style={styles.welcomeText}>
            Welcome Back, Admin 👋
          </Text>
        </View>

        {/* Metric Cards */}
        <View style={styles.metricsContainer}>
         <MetricCard
  title="Total Users"
  value={
    (
      (dashboardData?.users?.customers || 0) +
      (dashboardData?.users?.shopkeepers || 0) +
      (dashboardData?.users?.distributors || 0)
    ).toString()
  }
  color="#2563eb"
/>

<MetricCard
  title="Shopkeepers"
  value={
    dashboardData?.users?.shopkeepers?.toString() || "0"
  }
  color="#16a34a"
/>

<MetricCard
  title="Distributors"
  value={
    dashboardData?.users?.distributors?.toString() || "0"
  }
  color="#f59e0b"
/>

<MetricCard
  title="Medicines"
  value={
    dashboardData?.medicines?.total?.toString() || "0"
  }
  color="#ef4444"
/>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Recent Orders
          </Text>

          <View style={styles.tableHeader}>
            <Text
              style={[
                styles.headerText,
                styles.orderColumn,
              ]}
            >
              Order ID
            </Text>

            <Text
              style={[
                styles.headerText,
                styles.customerColumn,
              ]}
            >
              Customer
            </Text>

            <Text
              style={[
                styles.headerText,
                styles.statusColumn,
              ]}
            >
              Status
            </Text>
          </View>

          {dashboardData?.recentOrders?.length > 0 ? (
            dashboardData.recentOrders.map(
              (order, index) => (
                <View
                  style={styles.orderRow}
                  key={order._id || index}
                >
                  <Text
                    style={[
                      styles.orderText,
                      styles.orderColumn,
                    ]}
                  >
                    #{order._id?.slice(-6)}
                  </Text>

                  <Text
                    style={[
                      styles.orderText,
                      styles.customerColumn,
                    ]}
                  >
                    {order.customer?.name ||
                      order.user?.name ||
                      "Unknown"}
                  </Text>

                  <Text
                    style={[
                      order.status === "Delivered"
                        ? styles.success
                        : order.status === "Cancelled"
                        ? styles.cancel
                        : styles.pending,

                      styles.statusColumn,
                    ]}
                  >
                    {order.status || "Pending"}
                  </Text>
                </View>
              )
            )
          ) : (
            <Text style={styles.orderText}>
              No recent orders found
            </Text>
          )}
        </View>

        {/* Low Stock Alert */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Low Stock Alert
          </Text>

          {dashboardData?.lowStockMedicines?.length > 0 ? (
            dashboardData.lowStockMedicines.map(
              (medicine, index) => (
                <View
                  style={styles.stockItem}
                  key={medicine._id || index}
                >
                  <Text style={styles.stockName}>
                    {medicine.name}
                  </Text>

                  <Text style={styles.stockQuantity}>
                    {medicine.stock || 0} Left
                  </Text>
                </View>
              )
            )
          ) : (
            <Text style={styles.stockName}>
              No low stock medicines
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;