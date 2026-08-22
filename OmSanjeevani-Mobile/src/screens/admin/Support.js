import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";

import styles from "./SupportStyles";

// API functions ko services/api.js me add karna hoga
import {
  getSupportTickets,
  updateSupportTicketStatus,
  replySupportTicket,
} from "../../services/api";

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [reply, setReply] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const response = await getSupportTickets();

      console.log("Support Tickets:", response);

      const ticketData = Array.isArray(response)
        ? response
        : response?.data || response?.tickets || [];

      setTickets(ticketData);
      setFilteredTickets(ticketData);
    } catch (error) {
      console.error("Error fetching support tickets:", error);

      Alert.alert(
        "Error",
        "Failed to load support tickets."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);

    const value = text.toLowerCase();

    const filtered = tickets.filter((ticket) => {
      return (
        ticket._id?.toLowerCase().includes(value) ||
        ticket.name?.toLowerCase().includes(value) ||
        ticket.subject?.toLowerCase().includes(value) ||
        ticket.role?.toLowerCase().includes(value) ||
        ticket.status?.toLowerCase().includes(value)
      );
    });

    setFilteredTickets(filtered);
  };

  const openTicket = (ticket) => {
    setSelectedTicket(ticket);
    setReply("");
    setModalVisible(true);
  };

  const handleStatusUpdate = async (status) => {
    if (!selectedTicket?._id) return;

    try {
      setUpdating(true);

      const response = await updateSupportTicketStatus(
        selectedTicket._id,
        { status }
      );

      if (response?.success) {
        Alert.alert(
          "Success",
          "Ticket status updated successfully."
        );

        setSelectedTicket({
          ...selectedTicket,
          status,
        });

        fetchTickets();
      } else {
        Alert.alert(
          "Error",
          response?.message || "Failed to update ticket status."
        );
      }
    } catch (error) {
      console.error("Status update error:", error);

      Alert.alert(
        "Error",
        "Failed to update ticket status."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) {
      Alert.alert(
        "Reply Required",
        "Please enter your reply."
      );
      return;
    }

    if (!selectedTicket?._id) return;

    try {
      setUpdating(true);

      const response = await replySupportTicket(
        selectedTicket._id,
        {
          reply: reply.trim(),
        }
      );

      if (response?.success) {
        Alert.alert(
          "Success",
          "Reply sent successfully."
        );

        setReply("");

        fetchTickets();
      } else {
        Alert.alert(
          "Error",
          response?.message || "Failed to send reply."
        );
      }
    } catch (error) {
      console.error("Reply error:", error);

      Alert.alert(
        "Error",
        "Failed to send reply."
      );
    } finally {
      setUpdating(false);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Resolved") {
      return styles.resolvedStatus;
    }

    if (status === "In Progress") {
      return styles.progressStatus;
    }

    return styles.pendingStatus;
  };

  const renderTicket = ({ item }) => (
    <TouchableOpacity
      style={styles.ticketCard}
      onPress={() => openTicket(item)}
    >
      <View style={styles.ticketTop}>
        <Text style={styles.ticketId}>
          #{item._id?.slice(-6) || "N/A"}
        </Text>

        <View
          style={[
            styles.statusBadge,
            getStatusStyle(item.status),
          ]}
        >
          <Text style={styles.statusText}>
            {item.status || "Pending"}
          </Text>
        </View>
      </View>

      <Text style={styles.ticketName}>
        {item.name || "Unknown User"}
      </Text>

      <Text style={styles.ticketRole}>
        {item.role || "User"}
      </Text>

      <Text style={styles.ticketSubject}>
        {item.subject || "No Subject"}
      </Text>

      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => openTicket(item)}
      >
        <Text style={styles.viewButtonText}>
          View & Reply
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Loading support tickets...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Support Center
        </Text>

        <Text style={styles.subtitle}>
          Manage customer and partner support tickets
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Support Ticket..."
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredTickets}
        keyExtractor={(item) => item._id}
        renderItem={renderTicket}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshing={loading}
        onRefresh={fetchTickets}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No support tickets found.
            </Text>
          </View>
        }
      />

      {/* TICKET DETAILS MODAL */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  Support Ticket
                </Text>

                <Text style={styles.modalTicketId}>
                  #{selectedTicket?._id?.slice(-6)}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButton}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.detailLabel}>
              Name
            </Text>

            <Text style={styles.detailText}>
              {selectedTicket?.name || "N/A"}
            </Text>

            <Text style={styles.detailLabel}>
              Role
            </Text>

            <Text style={styles.detailText}>
              {selectedTicket?.role || "N/A"}
            </Text>

            <Text style={styles.detailLabel}>
              Subject
            </Text>

            <Text style={styles.detailText}>
              {selectedTicket?.subject || "N/A"}
            </Text>

            <Text style={styles.detailLabel}>
              Message
            </Text>

            <Text style={styles.messageBox}>
              {selectedTicket?.message ||
                "No message available."}
            </Text>

            <Text style={styles.detailLabel}>
              Update Status
            </Text>

            <View style={styles.statusButtons}>

              <TouchableOpacity
                style={styles.pendingButton}
                onPress={() =>
                  handleStatusUpdate("Pending")
                }
              >
                <Text style={styles.statusButtonText}>
                  Pending
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.progressButton}
                onPress={() =>
                  handleStatusUpdate("In Progress")
                }
              >
                <Text style={styles.statusButtonText}>
                  In Progress
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resolvedButton}
                onPress={() =>
                  handleStatusUpdate("Resolved")
                }
              >
                <Text style={styles.statusButtonText}>
                  Resolved
                </Text>
              </TouchableOpacity>

            </View>

            <Text style={styles.detailLabel}>
              Reply
            </Text>

            <TextInput
              style={styles.replyInput}
              placeholder="Write your reply..."
              multiline
              value={reply}
              onChangeText={setReply}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={styles.replyButton}
              onPress={handleReply}
              disabled={updating}
            >
              <Text style={styles.replyButtonText}>
                {updating
                  ? "Processing..."
                  : "Send Reply"}
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>

    </View>
  );
};

export default Support;