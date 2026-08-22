import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";

import styles from "./PaymentsStyles";

const initialPayments = [
  {
    id: "TXN1001",
    customer: "Anoop Tripathi",
    amount: "₹1,250",
    method: "UPI",
    status: "Success",
    date: "01-07-2026",
  },
  {
    id: "TXN1002",
    customer: "Rahul Sharma",
    amount: "₹850",
    method: "Card",
    status: "Pending",
    date: "01-07-2026",
  },
  {
    id: "TXN1003",
    customer: "Priya Singh",
    amount: "₹2,400",
    method: "Net Banking",
    status: "Failed",
    date: "30-06-2026",
  },
];

const Payments = () => {
  const [payments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const statusOptions = [
    "All",
    "Success",
    "Pending",
    "Failed",
  ];

  const filteredPayments = payments.filter((payment) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      payment.id.toLowerCase().includes(searchText) ||
      payment.customer.toLowerCase().includes(searchText) ||
      payment.method.toLowerCase().includes(searchText);

    const matchesStatus =
      selectedStatus === "All" ||
      payment.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const renderPayment = ({ item }) => {
    return (
      <View style={styles.paymentCard}>
        <View style={styles.cardHeader}>
          <View style={styles.transactionContainer}>
            <Text style={styles.transactionLabel}>
              Transaction ID
            </Text>

            <Text style={styles.transactionId}>
              {item.id}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              item.status === "Success"
                ? styles.successBadge
                : item.status === "Pending"
                ? styles.pendingBadge
                : styles.failedBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === "Success"
                  ? styles.successText
                  : item.status === "Pending"
                  ? styles.pendingText
                  : styles.failedText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Customer
            </Text>

            <Text style={styles.detailValue}>
              {item.customer}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Amount
            </Text>

            <Text style={styles.amountText}>
              {item.amount}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Method
            </Text>

            <Text style={styles.detailValue}>
              {item.method}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Date
            </Text>

            <Text style={styles.detailValue}>
              {item.date}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => setSelectedPayment(item)}
        >
          <Text style={styles.viewButtonText}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Payments
          </Text>

          <Text style={styles.subtitle}>
            Manage payment transactions
          </Text>
        </View>

        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportButtonText}>
            Export
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Transaction..."
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setStatusModalVisible(true)}
      >
        <Text style={styles.filterLabel}>
          Status
        </Text>

        <Text style={styles.filterValue}>
          {selectedStatus}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filteredPayments}
        renderItem={renderPayment}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No payments found
            </Text>
          </View>
        }
      />

      {/* Status Filter Modal */}
      <Modal
        visible={statusModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.statusModal}>
            <Text style={styles.modalTitle}>
              Filter by Status
            </Text>

            {statusOptions.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusOption,
                  selectedStatus === status &&
                    styles.selectedStatusOption,
                ]}
                onPress={() => {
                  setSelectedStatus(status);
                  setStatusModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.statusOptionText,
                    selectedStatus === status &&
                      styles.selectedStatusOptionText,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setStatusModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Payment Details Modal */}
      <Modal
        visible={selectedPayment !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedPayment(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.paymentModal}>
            <Text style={styles.modalTitle}>
              Payment Details
            </Text>

            <Text style={styles.modalLabel}>
              Transaction ID
            </Text>
            <Text style={styles.modalValue}>
              {selectedPayment?.id}
            </Text>

            <Text style={styles.modalLabel}>
              Customer
            </Text>
            <Text style={styles.modalValue}>
              {selectedPayment?.customer}
            </Text>

            <Text style={styles.modalLabel}>
              Amount
            </Text>
            <Text style={styles.modalValue}>
              {selectedPayment?.amount}
            </Text>

            <Text style={styles.modalLabel}>
              Payment Method
            </Text>
            <Text style={styles.modalValue}>
              {selectedPayment?.method}
            </Text>

            <Text style={styles.modalLabel}>
              Status
            </Text>
            <Text style={styles.modalValue}>
              {selectedPayment?.status}
            </Text>

            <Text style={styles.modalLabel}>
              Date
            </Text>
            <Text style={styles.modalValue}>
              {selectedPayment?.date}
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedPayment(null)}
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

export default Payments;