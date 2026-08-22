import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";

import styles from "./CouponsStyles";
import {
  getCoupons,
  deleteCoupon,
} from "../../../services/api";

const Coupons = ({ navigation }) => {
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchCoupons = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await getCoupons();

      console.log("Coupons Response:", response);

      if (response?.success) {
        setCoupons(response.data || []);
      } else {
        setCoupons([]);
        setError(response?.message || "Unable to load coupons");
      }
    } catch (err) {
      console.error("Coupon fetch error:", err);
      setError("Unable to connect to the server");
      setCoupons([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const filteredCoupons = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return coupons;

    return coupons.filter((coupon) => {
      const code = String(coupon.code || "").toLowerCase();
      const expiry = String(coupon.expiryDate || "").toLowerCase();

      return (
        code.includes(term) ||
        expiry.includes(term)
      );
    });
  }, [coupons, searchTerm]);

  const handleDelete = (coupon) => {
    Alert.alert(
      "Delete Coupon",
      `Are you sure you want to delete "${coupon.code}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const couponId = coupon._id || coupon.id;

              const response = await deleteCoupon(couponId);

              if (response?.success) {
                Alert.alert(
                  "Success",
                  "Coupon deleted successfully."
                );

                fetchCoupons();
              } else {
                Alert.alert(
                  "Error",
                  response?.message ||
                    "Unable to delete coupon"
                );
              }
            } catch (err) {
              console.error("Coupon delete error:", err);

              Alert.alert(
                "Error",
                "Unable to delete coupon"
              );
            }
          },
        },
      ]
    );
  };

  const formatDiscount = (coupon) => {
    if (coupon.discountType === "Fixed") {
      return `₹${coupon.discountValue || 0}`;
    }

    return `${coupon.discountValue || 0}%`;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN");
  };

  const renderCoupon = ({ item, index }) => {
    const status = item.displayStatus || "Active";

    return (
      <View style={styles.couponCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.couponNumber}>
              Coupon #{index + 1}
            </Text>

            <Text style={styles.couponCode}>
              {item.code || "N/A"}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              status === "Active"
                ? styles.activeBadge
                : styles.expiredBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {status}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Discount
          </Text>

          <Text style={styles.discountValue}>
            {formatDiscount(item)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Expiry Date
          </Text>

          <Text style={styles.infoValue}>
            {formatDate(item.expiryDate)}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("CouponForm", {
                coupon: item,
              })
            }
          >
            <Text style={styles.editButtonText}>
              Edit
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Loading coupons...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Coupons Management
          </Text>

          <Text style={styles.subtitle}>
            Create and manage discount coupons
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("CouponForm")
          }
        >
          <Text style={styles.addButtonText}>
            + Add
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Coupon..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        autoCapitalize="characters"
      />

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            {error}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => fetchCoupons()}
          >
            <Text style={styles.retryButtonText}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredCoupons}
          renderItem={renderCoupon}
          keyExtractor={(item, index) =>
            String(item._id || item.id || index)
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchCoupons(true)}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No coupons found.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default Coupons;