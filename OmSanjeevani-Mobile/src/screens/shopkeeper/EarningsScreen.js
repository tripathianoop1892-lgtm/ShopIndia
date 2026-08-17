import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./EarningsScreenStyles";


// ==========================================
// EARNINGS SCREEN
// ==========================================

export default function EarningsScreen({ navigation }) {

  const [loading] = useState(false);


  // ==========================================
  // STAT CARD
  // ==========================================

  const StatCard = ({
    icon,
    title,
    value,
    subtitle,
  }) => {
    return (
      <View style={styles.statCard}>

        <View style={styles.statIcon}>
          <Ionicons
            name={icon}
            size={25}
            color="#008C3A"
          />
        </View>

        <Text style={styles.statTitle}>
          {title}
        </Text>

        <Text style={styles.statValue}>
          {value}
        </Text>

        <Text style={styles.statSubtitle}>
          {subtitle}
        </Text>

      </View>
    );
  };


  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Ionicons
            name="menu-outline"
            size={28}
            color="#008C3A"
          />
        </TouchableOpacity>


        <View style={styles.headerTitleContainer}>

          <Text style={styles.headerTitle}>
            Earnings
          </Text>

          <Text style={styles.headerSubtitle}>
            Pharmacy earnings overview
          </Text>

        </View>

      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >

        {/* TOTAL EARNINGS */}

        <View style={styles.totalCard}>

          <View style={styles.totalIcon}>
            <Ionicons
              name="wallet-outline"
              size={30}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.totalLabel}>
            Total Earnings
          </Text>

          <Text style={styles.totalValue}>
            ₹0
          </Text>

          <Text style={styles.totalSubtitle}>
            Earnings generated from completed
            orders
          </Text>

        </View>


        {/* STATISTICS */}

        <View style={styles.statsGrid}>

          <StatCard
            icon="calendar-outline"
            title="This Month"
            value="₹0"
            subtitle="Current month"
          />

          <StatCard
            icon="today-outline"
            title="Today"
            value="₹0"
            subtitle="Today's earnings"
          />

          <StatCard
            icon="checkmark-circle-outline"
            title="Completed"
            value="0"
            subtitle="Completed orders"
          />

          <StatCard
            icon="time-outline"
            title="Pending"
            value="0"
            subtitle="Pending orders"
          />

        </View>


        {/* INFO */}

        <View style={styles.infoCard}>

          <Ionicons
            name="information-circle-outline"
            size={25}
            color="#008C3A"
          />

          <Text style={styles.infoText}>
            Your earnings will be updated
            automatically when customer orders
            are completed.
          </Text>

        </View>


        {loading && (
          <ActivityIndicator
            size="large"
            color="#008C3A"
          />
        )}

      </ScrollView>

    </View>
  );
}