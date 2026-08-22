import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";

import styles from "./NotificationsStyles";

const initialNotifications = [
  {
    id: 1,
    title: "New Order Received",
    receiver: "Shopkeeper",
    date: "01-07-2026",
    status: "Sent",
  },
  {
    id: 2,
    title: "Payment Successful",
    receiver: "Customer",
    date: "01-07-2026",
    status: "Pending",
  },
  {
    id: 3,
    title: "Medicine Stock Updated",
    receiver: "Distributor",
    date: "30-06-2026",
    status: "Sent",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [search, setSearch] = useState("");
  const [selectedNotification, setSelectedNotification] =
    useState(null);

  const handleSearch = (text) => {
    setSearch(text);
  };

  const filteredNotifications = notifications.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.title.toLowerCase().includes(searchText) ||
      item.receiver.toLowerCase().includes(searchText) ||
      item.status.toLowerCase().includes(searchText)
    );
  });

  const handleSendNotification = () => {
    Alert.alert(
      "Send Notification",
      "Send Notification functionality will be connected next."
    );
  };

  const handleView = (item) => {
    setSelectedNotification(item);
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Delete Notification",
      `Are you sure you want to delete "${item.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setNotifications((previous) =>
              previous.filter(
                (notification) =>
                  notification.id !== item.id
              )
            );

            Alert.alert(
              "Deleted",
              "Notification deleted successfully."
            );
          },
        },
      ]
    );
  };

  const renderNotification = ({ item }) => {
    const isSent = item.status === "Sent";

    return (
      <View style={styles.notificationCard}>

        <View style={styles.cardHeader}>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationTitle}>
              {item.title}
            </Text>

            <Text style={styles.receiver}>
              Receiver: {item.receiver}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              isSent
                ? styles.sentBadge
                : styles.pendingBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isSent
                  ? styles.sentText
                  : styles.pendingText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>
            Date
          </Text>

          <Text style={styles.dateText}>
            {item.date}
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => handleView(item)}
          >
            <Text style={styles.viewButtonText}>
              View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item)}
          >
            <Text style={styles.deleteButtonText}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View>
          <Text style={styles.title}>
            Notifications
          </Text>

          <Text style={styles.subtitle}>
            Manage all notifications
          </Text>
        </View>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendNotification}
        >
          <Text style={styles.sendButtonText}>
            + Send
          </Text>
        </TouchableOpacity>

      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Notification..."
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No notifications found
            </Text>
          </View>
        }
      />

      <Modal
        visible={selectedNotification !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() =>
          setSelectedNotification(null)
        }
      >
        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>
              Notification Details
            </Text>

            <Text style={styles.modalLabel}>
              Title
            </Text>

            <Text style={styles.modalValue}>
              {selectedNotification?.title}
            </Text>

            <Text style={styles.modalLabel}>
              Receiver
            </Text>

            <Text style={styles.modalValue}>
              {selectedNotification?.receiver}
            </Text>

            <Text style={styles.modalLabel}>
              Date
            </Text>

            <Text style={styles.modalValue}>
              {selectedNotification?.date}
            </Text>

            <Text style={styles.modalLabel}>
              Status
            </Text>

            <Text style={styles.modalValue}>
              {selectedNotification?.status}
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setSelectedNotification(null)
              }
            >
              <Text style={styles.closeButtonText}>
                Close
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>

    </View>
  );
};

export default Notifications;