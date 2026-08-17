import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./WishlistScreenStyles";

import AppHeader from "../../components/headers/AppHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function WishlistScreen({
  navigation,
  wishlistItems = [],
  onRemoveFromWishlist,
  onAddToCart,
}) {
  // ==========================================
  // Get Medicine Price
  // ==========================================

  const getMedicinePrice = (item) => {
    return Number(
      item?.offerPrice ??
        item?.price ??
        item?.mrp ??
        0
    );
  };

  // ==========================================
  // Render Wishlist Item
  // ==========================================

  const renderItem = ({ item }) => {
    const price = getMedicinePrice(item);

    const stock = Number(
      item?.stock || 0
    );

    return (
      <View style={styles.card}>
        {/* Medicine Image */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate(
              "MedicineDetails",
              {
                medicine: item,
              }
            )
          }
        >
          {item?.image ? (
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <View
              style={
                styles.imagePlaceholder
              }
            >
              <Ionicons
                name="medical-outline"
                size={40}
                color="#2E7D32"
              />
            </View>
          )}
        </TouchableOpacity>

        {/* Medicine Details */}

        <View style={styles.details}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(
                "MedicineDetails",
                {
                  medicine: item,
                }
              )
            }
          >
            <Text
              style={styles.name}
              numberOfLines={2}
            >
              {item?.name || "Medicine"}
            </Text>

            <Text
              style={styles.company}
              numberOfLines={1}
            >
              {item?.company || "Generic"}
            </Text>

            <Text style={styles.price}>
              ₹{price.toFixed(2)}
            </Text>

            <Text
              style={[
                styles.stock,
                {
                  color:
                    stock > 0
                      ? "#2E7D32"
                      : "#E53935",
                },
              ]}
            >
              {stock > 0
                ? `In Stock (${stock})`
                : "Out of Stock"}
            </Text>
          </TouchableOpacity>

          {/* Add To Cart */}

          <PrimaryButton
            title={
              stock > 0
                ? "Add to Cart"
                : "Out of Stock"
            }
            disabled={stock <= 0}
            onPress={() =>
              onAddToCart?.(item)
            }
          />
        </View>

        {/* Remove Wishlist */}

        <TouchableOpacity
          style={
            styles.removeButton
          }
          activeOpacity={0.7}
          onPress={() =>
            onRemoveFromWishlist?.(item)
          }
        >
          <Ionicons
            name="heart"
            size={25}
            color="#E53935"
          />
        </TouchableOpacity>
      </View>
    );
  };

  // ==========================================
  // Empty Wishlist
  // ==========================================

  const renderEmptyWishlist = () => {
    return (
      <View
        style={styles.emptyContainer}
      >
        <Ionicons
          name="heart-outline"
          size={75}
          color="#CCCCCC"
        />

        <Text
          style={styles.emptyTitle}
        >
          Your Wishlist is Empty
        </Text>

        <Text
          style={styles.emptySubtitle}
        >
          Save your favorite medicines here
          for quick access later.
        </Text>
      </View>
    );
  };

  // ==========================================
  // Main Screen
  // ==========================================

  return (
    <SafeAreaView
      style={styles.container}
    >
      {/* Header */}

      <AppHeader
        title="My Wishlist"
        showBackButton
        onBackPress={() =>
          navigation.goBack()
        }
      />

      {/* Wishlist */}

      <FlatList
        data={wishlistItems}
        keyExtractor={(item, index) =>
          item?._id?.toString() ||
          item?.medicineId?.toString() ||
          index.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.list,
          wishlistItems.length === 0 &&
            styles.emptyList,
        ]}
        ListEmptyComponent={
          renderEmptyWishlist
        }
      />
    </SafeAreaView>
  );
}