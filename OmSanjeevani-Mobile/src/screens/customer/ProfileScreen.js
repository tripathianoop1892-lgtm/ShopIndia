import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./ProfileScreenStyles";
import AppHeader from "../../components/headers/AppHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function ProfileScreen({
  navigation,
  customer = {},
}) {

  const menuItems = [
    {
      id: "1",
      title: "Edit Profile",
      icon: "create-outline",
      screen: "CustomerEditProfile",
    },
    {
      id: "2",
      title: "My Orders",
      icon: "cube-outline",
      screen: "Orders",
    },
    {
      id: "3",
      title: "My Prescriptions",
      icon: "document-text-outline",
      screen: "CustomerPrescriptions",
    },
    {
      id: "4",
      title: "Notifications",
      icon: "notifications-outline",
      screen: "Notifications",
    },
    {
      id: "5",
      title: "Help & Support",
      icon: "help-circle-outline",
      screen: "Support",
    },
    {
      id: "6",
      title: "Privacy Policy",
      icon: "shield-checkmark-outline",
      screen: "PrivacyPolicy",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>

     <AppHeader
  title="My Profile"
  showBackButton={true}
  onBackPress={() => navigation.goBack()}

  onNotificationPress={() => {
    navigation.navigate("Notifications");
  }}

  onProfilePress={() => {
    navigation.navigate("Profile");
  }}
/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Profile Card */}

        <View style={styles.profileCard}>

          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={60}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.name}>
            {customer.fullName || "Customer Name"}
          </Text>

          <Text style={styles.mobile}>
            {customer.mobile || "+91 XXXXXXXXXX"}
          </Text>

          <Text style={styles.email}>
            {customer.email || "customer@email.com"}
          </Text>

        </View>

        {/* Shop Details */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            Shop Details
          </Text>

          <Text style={styles.info}>
            Shop Name : {customer.shopName || "Medical Store"}
          </Text>

          <Text style={styles.info}>
            Shop ID : {customer.shopId || "OS100245"}
          </Text>

          <Text style={styles.info}>
            Address : {customer.address || "Address Not Available"}
          </Text>

        </View>

        {/* Menu */}

        <View style={styles.section}>

          {menuItems.map((item) => (

            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
       onPress={() => {
  navigation.navigate(item.screen);
}}
            >

              <View style={styles.menuLeft}>

                <Ionicons
                  name={item.icon}
                  size={22}
                  color="#2E7D32"
               />

                <Text style={styles.menuText}>
                  {item.title}
                </Text>

              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color="#999999"
              />

            </TouchableOpacity>

          ))}

        </View>

        {/* Logout */}

        <PrimaryButton
          title="Logout"
          backgroundColor="#E53935"
          onPress={() => {
            console.log("Logout");
          }}
        />

      </ScrollView>

    </SafeAreaView>
  );
}