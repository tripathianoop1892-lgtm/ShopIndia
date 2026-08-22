import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./ProfileScreenStyles";
import AppHeader from "../../components/headers/AppHeader";

export default function ProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    companyName: "",
    warehouseAddress: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedUser =
        (await AsyncStorage.getItem("user")) ||
        (await AsyncStorage.getItem("userData"));

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        setUser({
          name: parsedUser?.name || "",
          email: parsedUser?.email || "",
          mobile: parsedUser?.mobile || "",
          companyName: parsedUser?.companyName || "",
          warehouseAddress:
            parsedUser?.warehouseAddress || "",
          address: parsedUser?.address || "",
          city: parsedUser?.city || "",
          district: parsedUser?.district || "",
          state: parsedUser?.state || "",
          pincode: parsedUser?.pincode || "",
        });
      }
    } catch (error) {
      console.log("PROFILE LOAD ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("user");
              await AsyncStorage.removeItem("userData");

              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "Login",
                  },
                ],
              });
            } catch (error) {
              console.log(
                "LOGOUT ERROR:",
                error
              );
            }
          },
        },
      ]
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          title="My Profile"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#2E7D32"
          />

          <Text style={styles.loadingText}>
            Loading profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="My Profile"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ======================================
            PROFILE HEADER
        ======================================= */}

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons
              name="business-outline"
              size={42}
              color="#2E7D32"
            />
          </View>

          <Text style={styles.name}>
            {user.name || "Distributor"}
          </Text>

          <Text style={styles.companyName}>
            {user.companyName ||
              "Company Name Not Available"}
          </Text>

          <Text style={styles.email}>
            {user.email || "Email Not Available"}
          </Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate(
                "EditProfile"
              )
            }
          >
            <Ionicons
              name="create-outline"
              size={18}
              color="#FFFFFF"
            />

            <Text style={styles.editButtonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* ======================================
            PERSONAL DETAILS
        ======================================= */}

        <Text style={styles.sectionTitle}>
          Personal Details
        </Text>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#2E7D32"
              />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Full Name
              </Text>

              <Text style={styles.detailValue}>
                {user.name || "Not Available"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#2E7D32"
              />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Mobile Number
              </Text>

              <Text style={styles.detailValue}>
                {user.mobile || "Not Available"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#2E7D32"
              />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Email Address
              </Text>

              <Text style={styles.detailValue}>
                {user.email || "Not Available"}
              </Text>
            </View>
          </View>
        </View>

        {/* ======================================
            BUSINESS DETAILS
        ======================================= */}

        <Text style={styles.sectionTitle}>
          Business Details
        </Text>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="business-outline"
                size={20}
                color="#2E7D32"
              />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Company Name
              </Text>

              <Text style={styles.detailValue}>
                {user.companyName ||
                  "Not Available"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="location-outline"
                size={20}
                color="#2E7D32"
              />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Warehouse Address
              </Text>

              <Text style={styles.detailValue}>
                {user.warehouseAddress ||
                  "Not Available"}
              </Text>
            </View>
          </View>
        </View>

        {/* ======================================
            ADDRESS
        ======================================= */}

        <Text style={styles.sectionTitle}>
          Address
        </Text>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="home-outline"
                size={20}
                color="#2E7D32"
              />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Address
              </Text>

              <Text style={styles.detailValue}>
                {user.address || "Not Available"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="location-outline"
                size={20}
                color="#2E7D32"
              />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Location
              </Text>

              <Text style={styles.detailValue}>
                {[
                  user.city,
                  user.district,
                  user.state,
                  user.pincode,
                ]
                  .filter(Boolean)
                  .join(", ") || "Not Available"}
              </Text>
            </View>
          </View>
        </View>

        {/* ======================================
            LOGOUT
        ======================================= */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={21}
            color="#E53935"
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}