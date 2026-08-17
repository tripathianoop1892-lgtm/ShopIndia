import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./ProfileScreenStyles";


// ==========================================
// SHOPKEEPER PROFILE SCREEN
// ==========================================

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD USER
  // ==========================================

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");

      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log("Profile Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EDIT PROFILE
  // ==========================================

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#008C3A"
        />

        <Text style={styles.loadingText}>
          Loading profile...
        </Text>
      </View>
    );
  }

  // ==========================================
  // USER DATA
  // ==========================================

  const userName = user?.name || "Shopkeeper";
  const email = user?.email || "Not available";
  const phone = user?.phone || "Not available";
  const shopName = user?.shopName || user?.shop?.name || "Shop Name";
  const shopId = user?.shopId || "Not available";
  const address = user?.address || user?.shop?.address || "Address not available";

  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <View style={styles.container}>

      {/* ======================================
          HEADER
      ======================================= */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#222222"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Profile
        </Text>

        <TouchableOpacity
          style={styles.editHeaderButton}
          activeOpacity={0.7}
          onPress={handleEditProfile}
        >
          <Ionicons
            name="create-outline"
            size={22}
            color="#008C3A"
          />
        </TouchableOpacity>

      </View>


      {/* ======================================
          CONTENT
      ======================================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ====================================
            PROFILE CARD
        ==================================== */}

        <View style={styles.profileCard}>

          <View style={styles.profileIcon}>
            <Ionicons
              name="person"
              size={45}
              color="#008C3A"
            />
          </View>

          <Text style={styles.userName}>
            {userName}
          </Text>

          <Text style={styles.roleText}>
            SHOPKEEPER
          </Text>

        </View>


        {/* ====================================
            PERSONAL INFORMATION
        ==================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Personal Information
          </Text>


          {/* NAME */}

          <View style={styles.infoRow}>

            <View style={styles.infoIcon}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#008C3A"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Full Name
              </Text>

              <Text style={styles.infoValue}>
                {userName}
              </Text>
            </View>

          </View>


          {/* EMAIL */}

          <View style={styles.infoRow}>

            <View style={styles.infoIcon}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#008C3A"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Email
              </Text>

              <Text style={styles.infoValue}>
                {email}
              </Text>
            </View>

          </View>


          {/* PHONE */}

          <View style={styles.infoRow}>

            <View style={styles.infoIcon}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#008C3A"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Phone Number
              </Text>

              <Text style={styles.infoValue}>
                {phone}
              </Text>
            </View>

          </View>

        </View>


        {/* ====================================
            SHOP INFORMATION
        ==================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Shop Information
          </Text>


          {/* SHOP NAME */}

          <View style={styles.infoRow}>

            <View style={styles.infoIcon}>
              <Ionicons
                name="storefront-outline"
                size={20}
                color="#008C3A"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Shop Name
              </Text>

              <Text style={styles.infoValue}>
                {shopName}
              </Text>
            </View>

          </View>


          {/* SHOP ID */}

          <View style={styles.infoRow}>

            <View style={styles.infoIcon}>
              <Ionicons
                name="business-outline"
                size={20}
                color="#008C3A"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Shop ID
              </Text>

              <Text style={styles.infoValue}>
                {shopId}
              </Text>
            </View>

          </View>


          {/* ADDRESS */}

          <View style={styles.infoRow}>

            <View style={styles.infoIcon}>
              <Ionicons
                name="location-outline"
                size={20}
                color="#008C3A"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>
                Shop Address
              </Text>

              <Text style={styles.infoValue}>
                {address}
              </Text>
            </View>

          </View>

        </View>


        {/* ====================================
            EDIT PROFILE BUTTON
        ==================================== */}

        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={handleEditProfile}
        >

          <Ionicons
            name="create-outline"
            size={21}
            color="#FFFFFF"
          />

          <Text style={styles.editButtonText}>
            Edit Profile
          </Text>

        </TouchableOpacity>


        <View style={styles.bottomSpace} />

      </ScrollView>

    </View>
  );
}