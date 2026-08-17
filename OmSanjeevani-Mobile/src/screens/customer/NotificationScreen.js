import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./NotificationScreenStyles";
import AppHeader from "../../components/headers/AppHeader";

export default function NotificationScreen({
  navigation,
  notifications = [],
}) {

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return "cube-outline";

      case "offer":
        return "pricetag-outline";

      case "prescription":
        return "document-text-outline";

      case "delivery":
        return "bicycle-outline";

      default:
        return "notifications-outline";
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "order":
        return "#2E7D32";

      case "offer":
        return "#FF9800";

      case "prescription":
        return "#1976D2";

      case "delivery":
        return "#8E24AA";

      default:
        return "#777777";
    }
  };

  const renderNotification = ({ item }) => (
    <View style={styles.card}>

      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: getColor(item.type),
          },
        ]}
      >
        <Ionicons
          name={getIcon(item.type)}
          size={24}
          color="#FFFFFF"
        />
      </View>

      <View style={styles.content}>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.message}>
          {item.message}
        </Text>

        <Text style={styles.time}>
          {item.time}
        </Text>

      </View>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <AppHeader
        title="Notifications"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={renderNotification}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>

            <Ionicons
              name="notifications-off-outline"
              size={70}
              color="#CCCCCC"
            />

            <Text style={styles.emptyTitle}>
              No Notifications
            </Text>

            <Text style={styles.emptySubtitle}>
              You don't have any notifications yet.
            </Text>

          </View>
        }
      />

    </SafeAreaView>
  );
}