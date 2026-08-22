import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import styles from "./ShopkeepersStyles";
import { getShopkeeper } from "../../services/api";

const Shopkeepers = () => {
  const [shopkeepers, setShopkeepers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopkeepers = async () => {
      try {
        setLoading(true);

        const response = await getShopkeeper();

        setShopkeepers(response || []);

        console.log("Shopkeepers:", response);
      } catch (err) {
        console.error("Error fetching shopkeepers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShopkeepers();
  }, []);

  const filteredShopkeepers = shopkeepers.filter((shop) => {
    const searchText = search.toLowerCase();

    return (
      shop.shopName?.toLowerCase().includes(searchText) ||
      shop.name?.toLowerCase().includes(searchText) ||
      shop.mobile?.toLowerCase().includes(searchText) ||
      shop.city?.toLowerCase().includes(searchText)
    );
  });

  const renderShopkeeper = ({ item }) => {
    const isActive = item.status === "Active";

    return (
      <View style={styles.shopkeeperCard}>
        <View style={styles.cardHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.shopName
                ? item.shopName.charAt(0).toUpperCase()
                : "S"}
            </Text>
          </View>

          <View style={styles.shopkeeperInfo}>
            <Text style={styles.shopName}>
              {item.shopName || "N/A"}
            </Text>

            <Text style={styles.ownerName}>
              Owner: {item.name || "N/A"}
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
          Shopkeepers
        </Text>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>
            + Add Shopkeeper
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Shopkeeper..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Loading Shopkeepers...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredShopkeepers}
          keyExtractor={(item) => item._id}
          renderItem={renderShopkeeper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default Shopkeepers;