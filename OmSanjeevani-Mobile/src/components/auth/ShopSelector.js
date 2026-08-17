import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import styles from "./ShopSelectorStyle";

import { searchShops } from "../../services/api";

const ShopSelector = ({ form, handleChange }) => {
  const [search, setSearch] = useState("");
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      setShops([]);
      return;
    }

    try {
      setLoading(true);

      const res = await searchShops(value);

      if (res?.success) {
        setShops(res.shops || []);
      } else {
        setShops([]);
      }
    } catch (error) {
      console.log("SHOP SEARCH ERROR:", error);
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectShop = (shop) => {
    setSelectedShop(shop);

    // ⭐ Customer ke form mein selected Shop ID save
    handleChange("shopId", shop.shopId);

    setSearch(shop.shopName || "");
    setShops([]);
  };

  return (
    <View style={styles.container}>

      {/* Title */}
      <View style={styles.titleRow}>
        <Ionicons
          name="storefront"
          size={22}
          color="#008f3c"
        />

        <Text style={styles.title}>
          Select Your Medical Shop
        </Text>
      </View>

      <Text style={styles.subtitle}>
        Search by Shop Name / Mobile / Email
      </Text>

      {/* Search Box */}
      <View style={styles.searchBox}>

        <Ionicons
          name="search"
          size={20}
          color="#777"
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search medical shop..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={handleSearch}
        />

      </View>

      {/* Loading */}
      {loading && (
        <View style={styles.statusContainer}>
          <ActivityIndicator
            size="small"
            color="#008f3c"
          />

          <Text style={styles.statusText}>
            Searching medical shops...
          </Text>
        </View>
      )}

      {/* No Shop */}
      {!loading &&
        search.trim() &&
        shops.length === 0 && (
          <Text style={styles.statusText}>
            No medical shop found.
          </Text>
        )}

      {/* Search Results */}
      {shops.length > 0 && (
        <View style={styles.resultsContainer}>

          {shops.map((shop) => (
            <View
              key={shop._id}
              style={styles.shopCard}
            >

              <View style={styles.shopInfo}>

                <View style={styles.shopNameRow}>
                  <Ionicons
                    name="storefront"
                    size={18}
                    color="#008f3c"
                  />

                  <Text style={styles.shopName}>
                    {shop.shopName || "Medical Shop"}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="call"
                    size={16}
                    color="#555"
                  />

                  <Text style={styles.detailText}>
                    {shop.mobile || "Mobile not available"}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="mail"
                    size={16}
                    color="#555"
                  />

                  <Text style={styles.detailText}>
                    {shop.email || "Email not available"}
                  </Text>
                </View>

                <Text style={styles.shopId}>
                  Shop ID: {shop.shopId}
                </Text>

              </View>

              {/* Select Button */}
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => handleSelectShop(shop)}
              >
                <Text style={styles.selectButtonText}>
                  Select
                </Text>
              </TouchableOpacity>

            </View>
          ))}

        </View>
      )}

      {/* Selected Shop */}
      {selectedShop && (
        <View style={styles.selectedShop}>

          <View>
            <Text style={styles.selectedTitle}>
              Selected Medical Shop
            </Text>

            <Text style={styles.selectedName}>
              {selectedShop.shopName}
            </Text>

            <Text style={styles.selectedId}>
              Shop ID: {selectedShop.shopId}
            </Text>
          </View>

          <View style={styles.checkCircle}>
            <Ionicons
              name="checkmark"
              size={22}
              color="#fff"
            />
          </View>

        </View>
      )}

    </View>
  );
};

export default ShopSelector;