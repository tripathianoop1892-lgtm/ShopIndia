import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import styles from "./DistributorsStyles";
import { getDistributors } from "../../services/api";

const Distributors = () => {
  const [distributors, setDistributors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        setLoading(true);

        const response = await getDistributors();

        setDistributors(response || []);

        console.log("Distributors:", response);
      } catch (err) {
        console.error("Error fetching distributors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  const filteredDistributors = distributors.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(searchText) ||
      item.owner?.toLowerCase().includes(searchText) ||
      item.mobile?.toLowerCase().includes(searchText) ||
      item.city?.toLowerCase().includes(searchText)
    );
  });

  const renderDistributor = ({ item }) => {
    const isActive = item.status === "Active";

    return (
      <View style={styles.distributorCard}>
        <View style={styles.cardHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.name
                ? item.name.charAt(0).toUpperCase()
                : "D"}
            </Text>
          </View>

          <View style={styles.distributorInfo}>
            <Text style={styles.companyName}>
              {item.name || "N/A"}
            </Text>

            <Text style={styles.ownerName}>
              Owner: {item.owner || "N/A"}
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
              {item.status || "Pending"}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.detailText}>
          ID: {item._id}
        </Text>

        <Text style={styles.detailText}>
          📱 {item.mobile || "N/A"}
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
          Distributors
        </Text>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>
            + Add Distributor
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Distributor..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Loading Distributors...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredDistributors}
          keyExtractor={(item) => item._id}
          renderItem={renderDistributor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default Distributors;