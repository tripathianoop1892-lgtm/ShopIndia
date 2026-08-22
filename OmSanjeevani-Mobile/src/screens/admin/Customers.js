import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import styles from "./CustomersStyles";
import { getCustomers } from "../../services/api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);

        const response = await getCustomers();
        setCustomers(response || []);

        console.log("Customers:", response);
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();

    return (
      customer.name?.toLowerCase().includes(searchText) ||
      customer.mobile?.toLowerCase().includes(searchText) ||
      customer.email?.toLowerCase().includes(searchText) ||
      customer.city?.toLowerCase().includes(searchText)
    );
  });

  const renderCustomer = ({ item }) => {
    const isActive = item.status === "Active";

    return (
      <View style={styles.customerCard}>
        <View style={styles.cardHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.name
                ? item.name.charAt(0).toUpperCase()
                : "C"}
            </Text>
          </View>

          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>
              {item.name}
            </Text>

            <Text style={styles.customerId}>
              ID: {item._id}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              isActive
                ? styles.activeBadge
                : styles.pendingBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isActive
                  ? styles.activeText
                  : styles.pendingText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.detailText}>
          📱 {item.mobile || "N/A"}
        </Text>

        <Text style={styles.detailText}>
          ✉️ {item.email || "N/A"}
        </Text>

        <Text style={styles.detailText}>
          📍 {item.city || "N/A"}
        </Text>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton}>
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
        <Text style={styles.title}>
          Customers
        </Text>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>
            + Add Customer
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Customer..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>
            Loading Customers...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCustomers}
          keyExtractor={(item) => item._id}
          renderItem={renderCustomer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}

    </View>
  );
};

export default Customers;