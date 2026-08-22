import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import styles from "./ReportsStyles";

import {
  getDashboardReport,
  getSalesReport,
} from "../../services/api";

const defaultDashboard = {
  revenue: {
    today: 0,
    month: 0,
    total: 0,
  },

  orders: {
    total: 0,
    pending: 0,
    approved: 0,
    delivered: 0,
  },

  users: {
    customers: 0,
    shopkeepers: 0,
    distributors: 0,
  },

  medicines: {
    total: 0,
    lowStock: 0,
    outOfStock: 0,
    expiringSoon: 0,
    expired: 0,
  },

  coupons: {
    total: 0,
  },
};

const Reports = () => {
  const [dashboard, setDashboard] = useState(defaultDashboard);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReports = async () => {
    try {
      setLoading(true);

      const [dashboardRes, salesRes] = await Promise.all([
        getDashboardReport(),
        getSalesReport(),
      ]);

      console.log("Dashboard Response:", dashboardRes);
      console.log("Sales Response:", salesRes);

      if (dashboardRes?.success && dashboardRes?.data) {
        setDashboard({
          ...defaultDashboard,
          ...dashboardRes.data,

          revenue: {
            ...defaultDashboard.revenue,
            ...(dashboardRes.data.revenue || {}),
          },

          orders: {
            ...defaultDashboard.orders,
            ...(dashboardRes.data.orders || {}),
          },

          users: {
            ...defaultDashboard.users,
            ...(dashboardRes.data.users || {}),
          },

          medicines: {
            ...defaultDashboard.medicines,
            ...(dashboardRes.data.medicines || {}),
          },

          coupons: {
            ...defaultDashboard.coupons,
            ...(dashboardRes.data.coupons || {}),
          },
        });
      }

      if (salesRes?.success && Array.isArray(salesRes.data)) {
        setSales(salesRes.data);
      } else {
        setSales([]);
      }
    } catch (error) {
      console.error("Report Error:", error);

      Alert.alert(
        "Error",
        "Failed to load reports."
      );
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async () => {
  try {
    const salesRows = sales
      .map(
        (item) => `
          <tr>
            <td>${item.date || "N/A"}</td>
            <td>${item.orders || 0}</td>
            <td>₹${Number(item.revenue || 0).toLocaleString("en-IN")}</td>
            <td>₹${Number(item.discount || 0).toLocaleString("en-IN")}</td>
            <td>₹${Number(item.netRevenue || 0).toLocaleString("en-IN")}</td>
          </tr>
        `
      )
      .join("");

    const html = `
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>Om Sanjeevani - Business Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString("en-IN")}</p>

          <h2>Revenue Summary</h2>
          <p>Today's Sales: ₹${Number(dashboard.revenue.today || 0).toLocaleString("en-IN")}</p>
          <p>Monthly Revenue: ₹${Number(dashboard.revenue.month || 0).toLocaleString("en-IN")}</p>
          <p>Total Revenue: ₹${Number(dashboard.revenue.total || 0).toLocaleString("en-IN")}</p>

          <h2>Orders Summary</h2>
          <p>Total Orders: ${dashboard.orders.total || 0}</p>
          <p>Pending Orders: ${dashboard.orders.pending || 0}</p>
          <p>Approved Orders: ${dashboard.orders.approved || 0}</p>
          <p>Delivered Orders: ${dashboard.orders.delivered || 0}</p>

          <h2>Users Summary</h2>
          <p>Customers: ${dashboard.users.customers || 0}</p>
          <p>Shopkeepers: ${dashboard.users.shopkeepers || 0}</p>
          <p>Distributors: ${dashboard.users.distributors || 0}</p>

          <h2>Medicine Inventory</h2>
          <p>Total Medicines: ${dashboard.medicines.total || 0}</p>
          <p>Low Stock: ${dashboard.medicines.lowStock || 0}</p>
          <p>Out Of Stock: ${dashboard.medicines.outOfStock || 0}</p>
          <p>Expiring Soon: ${dashboard.medicines.expiringSoon || 0}</p>
          <p>Expired Medicines: ${dashboard.medicines.expired || 0}</p>

          <h2>Sales Details</h2>

          <table border="1" cellspacing="0" cellpadding="8" width="100%">
            <tr>
              <th>Date</th>
              <th>Orders</th>
              <th>Revenue</th>
              <th>Discount</th>
              <th>Net Revenue</th>
            </tr>

            ${salesRows || "<tr><td colspan='5'>No Sales Found</td></tr>"}
          </table>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({
      html,
    });

    const canShare = await Sharing.isAvailableAsync();

    if (canShare) {
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Export Om Sanjeevani Report",
      });
    } else {
      Alert.alert("Success", "PDF Report created successfully.");
    }
  } catch (error) {
    console.error("PDF Export Error:", error);

    Alert.alert(
      "Error",
      "PDF report export failed."
    );
  }
};
  useEffect(() => {
    loadReports();
  }, []);

  const cards = [
    {
      title: "Today's Sales",
      value: `₹${Number(
        dashboard.revenue.today || 0
      ).toLocaleString("en-IN")}`,
      type: "green",
    },

    {
      title: "Monthly Revenue",
      value: `₹${Number(
        dashboard.revenue.month || 0
      ).toLocaleString("en-IN")}`,
      type: "blue",
    },

    {
      title: "Total Revenue",
      value: `₹${Number(
        dashboard.revenue.total || 0
      ).toLocaleString("en-IN")}`,
      type: "purple",
    },

    {
      title: "Total Orders",
      value: dashboard.orders.total || 0,
      type: "orange",
    },

    {
      title: "Pending Orders",
      value: dashboard.orders.pending || 0,
      type: "red",
    },

    {
      title: "Approved Orders",
      value: dashboard.orders.approved || 0,
      type: "blue",
    },

    {
      title: "Delivered Orders",
      value: dashboard.orders.delivered || 0,
      type: "green",
    },

    {
      title: "Customers",
      value: dashboard.users.customers || 0,
      type: "cyan",
    },

    {
      title: "Shopkeepers",
      value: dashboard.users.shopkeepers || 0,
      type: "purple",
    },

    {
      title: "Distributors",
      value: dashboard.users.distributors || 0,
      type: "orange",
    },

    {
      title: "Medicines",
      value: dashboard.medicines.total || 0,
      type: "teal",
    },

    {
      title: "Coupons",
      value: dashboard.coupons.total || 0,
      type: "pink",
    },
  ];

  const renderCard = ({ item }) => (
    <View
      style={[
        styles.reportCard,
        styles[`${item.type}Card`],
      ]}
    >
      <Text style={styles.cardTitle}>
        {item.title}
      </Text>

      <Text style={styles.cardValue}>
        {item.value}
      </Text>
    </View>
  );

  const renderSalesItem = ({ item }) => (
    <View style={styles.salesCard}>
      <View style={styles.salesHeader}>
        <Text style={styles.salesDate}>
          {item.date || "N/A"}
        </Text>

        <View style={styles.successBadge}>
          <Text style={styles.successText}>
            {item.status || "Success"}
          </Text>
        </View>
      </View>

      <View style={styles.salesRow}>
        <Text style={styles.salesLabel}>
          Orders
        </Text>

        <Text style={styles.salesValue}>
          {item.orders || 0}
        </Text>
      </View>

      <View style={styles.salesRow}>
        <Text style={styles.salesLabel}>
          Revenue
        </Text>

        <Text style={styles.salesValue}>
          ₹{Number(
            item.revenue || 0
          ).toLocaleString("en-IN")}
        </Text>
      </View>

      <View style={styles.salesRow}>
        <Text style={styles.salesLabel}>
          Discount
        </Text>

        <Text style={styles.salesValue}>
          ₹{Number(
            item.discount || 0
          ).toLocaleString("en-IN")}
        </Text>
      </View>

      <View style={styles.salesRow}>
        <Text style={styles.salesLabel}>
          Net Revenue
        </Text>

        <Text style={styles.netRevenue}>
          ₹{Number(
            item.netRevenue || 0
          ).toLocaleString("en-IN")}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading Reports...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sales}
        keyExtractor={(item, index) =>
          `${item.date || "sale"}-${index}`
        }
        renderItem={renderSalesItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
  <View>
    <Text style={styles.title}>
      Reports Dashboard
    </Text>

    <Text style={styles.subtitle}>
      Business performance overview
    </Text>
  </View>

  <View style={styles.headerButtons}>
    <TouchableOpacity
      style={styles.refreshButton}
      onPress={loadReports}
    >
      <Text style={styles.refreshButtonText}>
        Refresh
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.exportButton}
      onPress={exportPDF}
    >
      <Text style={styles.exportButtonText}>
        Export PDF
      </Text>
    </TouchableOpacity>
  </View>
</View>

            <Text style={styles.sectionTitle}>
              Overview
            </Text>

            <View style={styles.cardsGrid}>
              {cards.map((item, index) => (
                <View
                  key={`${item.title}-${index}`}
                  style={[
                    styles.reportCard,
                    styles[`${item.type}Card`],
                  ]}
                >
                  <Text style={styles.cardTitle}>
                    {item.title}
                  </Text>

                  <Text style={styles.cardValue}>
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>
              Sales Summary
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No Sales Found
            </Text>
          </View>
        }
        ListFooterComponent={
          <>
            <Text style={styles.sectionTitle}>
              Medicine Inventory Report
            </Text>

            <View style={styles.inventoryGrid}>
              <View style={styles.inventoryCard}>
                <Text style={styles.inventoryTitle}>
                  Low Stock
                </Text>

                <Text style={styles.inventoryValue}>
                  {dashboard.medicines.lowStock || 0}
                </Text>
              </View>

              <View style={styles.inventoryCard}>
                <Text style={styles.inventoryTitle}>
                  Out Of Stock
                </Text>

                <Text style={styles.inventoryValue}>
                  {dashboard.medicines.outOfStock || 0}
                </Text>
              </View>

              <View style={styles.inventoryCard}>
                <Text style={styles.inventoryTitle}>
                  Expiring Soon
                </Text>

                <Text style={styles.inventoryValue}>
                  {dashboard.medicines.expiringSoon || 0}
                </Text>
              </View>

              <View style={styles.inventoryCard}>
                <Text style={styles.inventoryTitle}>
                  Expired Medicines
                </Text>

                <Text style={styles.inventoryValue}>
                  {dashboard.medicines.expired || 0}
                </Text>
              </View>
            </View>
          </>
        }
      />
    </View>
  );
};

export default Reports;