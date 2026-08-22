import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./DashboardStyles";
import AppHeader from "../../components/headers/AppHeader";

// ⚠️ API function ka naam aapke services/api file ke hisaab se check kar lena
import { MedicinesList } from "../../services/api";

export default function Dashboard({ navigation }) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // =========================
  // FETCH MEDICINES
  // =========================

  const fetchData = async () => {
    try {
      const data = await MedicinesList();

      setMedicines(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("DISTRIBUTOR DASHBOARD ERROR:", error);
      setMedicines([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // PULL TO REFRESH
  // =========================

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  // =========================
  // DASHBOARD STATS
  // =========================

  const total = medicines.length;

  const inStock = medicines.filter(
    (item) => Number(item.stock) > 20
  ).length;

  const lowStock = medicines.filter(
    (item) =>
      Number(item.stock) > 0 &&
      Number(item.stock) <= 20
  ).length;

  const outOfStock = medicines.filter(
    (item) => Number(item.stock) === 0
  ).length;

  // =========================
  // EXPIRING MEDICINES
  // =========================

  const expiringMedicines = medicines.filter((item) => {
    if (!item.expiry) return false;

    const today = new Date();
    const expiryDate = new Date(item.expiry);

    const difference =
      (expiryDate - today) /
      (1000 * 60 * 60 * 24);

    return difference >= 0 && difference <= 30;
  });

  const expiring = expiringMedicines.length;

  // =========================
  // LOW STOCK MEDICINES
  // =========================

  const lowStockMedicines = medicines.filter(
    (item) =>
      Number(item.stock) > 0 &&
      Number(item.stock) <= 20
  );

  // =========================
  // TOTAL INVENTORY VALUE
  // =========================

  const totalValue = medicines.reduce(
    (totalAmount, item) => {
      const price = Number(
        item.offerPrice || item.mrp || 0
      );

      const stock = Number(item.stock || 0);

      return totalAmount + price * stock;
    },
    0
  );

  // =========================
  // FORMAT PRICE
  // =========================

  const formatPrice = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
       <AppHeader
  title="Distributor Dashboard"
  onMenuPress={() => navigation.openDrawer()}
/>

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#0B6B2A"
          />

          <Text style={styles.loadingText}>
            Loading Dashboard...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}

      
      <AppHeader
  title="Distributor Dashboard"
  onMenuPress={() => navigation.openDrawer()}
onNotificationPress={() => {
  navigation.navigate("Notifications");
}}
  onProfilePress={() =>
    navigation.navigate("Profile")
  }
/>

      {/* ================= CONTENT ================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >

        {/* ================= WELCOME ================= */}

        <View style={styles.welcomeContainer}>

          <View>

            <Text style={styles.welcomeText}>
              Welcome Back
            </Text>

            <Text style={styles.storeName}>
              Distributor Panel
            </Text>

          </View>

          </View>
        {/* ================= STATS ================= */}

        <Text style={styles.sectionTitle}>
          Inventory Overview
        </Text>

        <View style={styles.statsGrid}>

          {/* TOTAL MEDICINES */}

          <TouchableOpacity
            style={[
              styles.statCard,
              styles.totalCard,
            ]}
            onPress={() =>
              navigation.navigate("MedicinesList")
            }
          >

            <Ionicons
              name="medical-outline"
              size={28}
              color="#1565C0"
            />

            <Text style={styles.statNumber}>
              {total}
            </Text>

            <Text style={styles.statLabel}>
              Total Medicines
            </Text>

          </TouchableOpacity>

          {/* IN STOCK */}

          <TouchableOpacity
            style={[
              styles.statCard,
              styles.inStockCard,
            ]}
            onPress={() =>
              navigation.navigate("MedicinesList")
            }
          >

            <Ionicons
              name="checkmark-circle-outline"
              size={28}
              color="#2E7D32"
            />

            <Text style={styles.statNumber}>
              {inStock}
            </Text>

            <Text style={styles.statLabel}>
              In Stock
            </Text>

          </TouchableOpacity>

          {/* LOW STOCK */}

          <TouchableOpacity
            style={[
              styles.statCard,
              styles.lowStockCard,
            ]}
            onPress={() =>
              navigation.navigate("LowStockAlert")
            }
          >

            <Ionicons
              name="warning-outline"
              size={28}
              color="#F57C00"
            />

            <Text style={styles.statNumber}>
              {lowStock}
            </Text>

            <Text style={styles.statLabel}>
              Low Stock
            </Text>

          </TouchableOpacity>

          {/* OUT OF STOCK */}

          <TouchableOpacity
            style={[
              styles.statCard,
              styles.outStockCard,
            ]}
            onPress={() =>
              navigation.navigate("MedicinesList")
            }
          >

            <Ionicons
              name="close-circle-outline"
              size={28}
              color="#D32F2F"
            />

            <Text style={styles.statNumber}>
              {outOfStock}
            </Text>

            <Text style={styles.statLabel}>
              Out Of Stock
            </Text>

          </TouchableOpacity>

          {/* EXPIRING */}

          <TouchableOpacity
            style={[
              styles.statCard,
              styles.expiryCard,
            ]}
            onPress={() =>
              navigation.navigate("ExpiryAlert")
            }
          >

            <Ionicons
              name="time-outline"
              size={28}
              color="#C2185B"
            />

            <Text style={styles.statNumber}>
              {expiring}
            </Text>

            <Text style={styles.statLabel}>
              Expiring Soon
            </Text>

          </TouchableOpacity>

          {/* INVENTORY VALUE */}

          <View
            style={[
              styles.statCard,
              styles.valueCard,
            ]}
          >

            <Ionicons
              name="cash-outline"
              size={28}
              color="#6A1B9A"
            />

            <Text style={styles.valueNumber}>
              ₹{formatPrice(totalValue)}
            </Text>

            <Text style={styles.statLabel}>
              Inventory Value
            </Text>

          </View>

        </View>

        {/* ================= QUICK ACTIONS ================= */}

        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.quickActions}>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate("AddMedicine")
            }
          >

            <Ionicons
              name="add-circle-outline"
              size={28}
              color="#0B6B2A"
            />

            <Text style={styles.actionText}>
              Add Medicine
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate("MedicinesList")
            }
          >

            <Ionicons
              name="list-outline"
              size={28}
              color="#0B6B2A"
            />

            <Text style={styles.actionText}>
              Medicine List
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate("Orders")
            }
          >

            <Ionicons
              name="cube-outline"
              size={28}
              color="#0B6B2A"
            />

            <Text style={styles.actionText}>
              Orders
            </Text>

          </TouchableOpacity>

        </View>

        {/* ================= LOW STOCK ================= */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Low Stock Medicines
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("LowStockAlert")
            }
          >

            <Text style={styles.viewAll}>
              View All
            </Text>

          </TouchableOpacity>

        </View>

        {lowStockMedicines.length === 0 ? (

          <View style={styles.emptyCard}>

            <Ionicons
              name="checkmark-circle-outline"
              size={35}
              color="#2E7D32"
            />

            <Text style={styles.emptyText}>
              All medicines are sufficiently stocked
            </Text>

          </View>

        ) : (

          lowStockMedicines
            .slice(0, 5)
            .map((item) => (

              <View
                key={item._id}
                style={styles.medicineCard}
              >

                <View style={styles.medicineIcon}>

                  <Ionicons
                    name="medical-outline"
                    size={25}
                    color="#F57C00"
                  />

                </View>

                <View style={styles.medicineInfo}>

                  <Text style={styles.medicineName}>
                    {item.name}
                  </Text>

                  <Text style={styles.medicineCompany}>
                    {item.company || "N/A"}
                  </Text>

                </View>

                <View style={styles.stockContainer}>

                  <Text style={styles.lowStockText}>
                    {item.stock}
                  </Text>

                  <Text style={styles.stockLabel}>
                    Stock
                  </Text>

                </View>

              </View>

            ))

        )}

        {/* ================= EXPIRY ================= */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Expiring Soon
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ExpiryAlert")
            }
          >

            <Text style={styles.viewAll}>
              View All
            </Text>

          </TouchableOpacity>

        </View>

        {expiringMedicines.length === 0 ? (

          <View style={styles.emptyCard}>

            <Ionicons
              name="checkmark-circle-outline"
              size={35}
              color="#2E7D32"
            />

            <Text style={styles.emptyText}>
              No medicines expiring soon
            </Text>

          </View>

        ) : (

          expiringMedicines
            .slice(0, 5)
            .map((item) => {

              const expiryDate =
                new Date(item.expiry);

              const today = new Date();

              const daysLeft =
                Math.ceil(
                  (expiryDate - today) /
                  (1000 * 60 * 60 * 24)
                );

              return (

                <View
                  key={item._id}
                  style={styles.medicineCard}
                >

                  <View style={styles.medicineIcon}>

                    <Ionicons
                      name="time-outline"
                      size={25}
                      color="#C2185B"
                    />

                  </View>

                  <View style={styles.medicineInfo}>

                    <Text style={styles.medicineName}>
                      {item.name}
                    </Text>

                    <Text style={styles.medicineCompany}>
                      Expires in {daysLeft} days
                    </Text>

                  </View>

                  <View style={styles.expiryDateContainer}>

                    <Text style={styles.expiryDate}>
                      {expiryDate.toLocaleDateString(
                        "en-IN"
                      )}
                    </Text>

                  </View>

                </View>

              );
            })

        )}

        {/* ================= RECENT MEDICINES ================= */}

        <View style={styles.sectionHeader}>

          <Text style={styles.sectionTitle}>
            Recent Medicines
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MedicinesList")
            }
          >

            <Text style={styles.viewAll}>
              View All
            </Text>

          </TouchableOpacity>

        </View>

        {medicines.length === 0 ? (

          <View style={styles.emptyCard}>

            <Ionicons
              name="medical-outline"
              size={35}
              color="#999"
            />

            <Text style={styles.emptyText}>
              No medicines found
            </Text>

          </View>

        ) : (

          medicines
            .slice(0, 5)
            .map((item) => (

              <View
                key={item._id}
                style={styles.medicineCard}
              >

                <View style={styles.medicineIcon}>

                  <Ionicons
                    name="cube-outline"
                    size={25}
                    color="#0B6B2A"
                  />

                </View>

                <View style={styles.medicineInfo}>

                  <Text style={styles.medicineName}>
                    {item.name}
                  </Text>

                  <Text style={styles.medicineCompany}>
                    {item.company || "N/A"}
                  </Text>

                </View>

                <View>

                  <Text style={styles.medicinePrice}>
                    ₹{item.offerPrice || item.mrp || 0}
                  </Text>

                  <Text style={styles.stockLabel}>
                    Stock: {item.stock || 0}
                  </Text>

                </View>

              </View>

            ))

        )}
    
      </ScrollView>
    
    </SafeAreaView>
  );
}