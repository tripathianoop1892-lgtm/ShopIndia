import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import PrimaryButton from "../buttons/PrimaryButton";
import styles from "./FeaturedMedicineCardStyles";

export default function FeaturedMedicineCard({
  medicine,
  onPress,
  onAddToCart,
  onWishlist,
}) {
  if (!medicine) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onPress && onPress(medicine)}
    >
      {/* Wishlist */}

      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() => onWishlist && onWishlist(medicine)}
      >
        <Ionicons
          name="heart-outline"
          size={22}
          color="#E53935"
        />
      </TouchableOpacity>

      {/* Medicine Image */}

      <Image
        source={{ uri: medicine.image }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Medicine Name */}

      <Text
        numberOfLines={2}
        style={styles.name}
      >
        {medicine.medicineName}
      </Text>

      {/* Company */}

      <Text
        numberOfLines={1}
        style={styles.company}
      >
        {medicine.companyName}
      </Text>

      {/* Rating */}

      <View style={styles.ratingRow}>
        <Ionicons
          name="star"
          size={16}
          color="#FFC107"
        />

        <Text style={styles.rating}>
          {medicine.averageRating || "0.0"}
        </Text>
      </View>

      {/* Price */}

      <View style={styles.priceRow}>

        <Text style={styles.price}>
          ₹{medicine.sellingPrice}
        </Text>

        <Text style={styles.mrp}>
          ₹{medicine.mrp}
        </Text>

      </View>

      {/* Prescription */}

      {medicine.prescriptionRequired && (
        <View style={styles.prescriptionBadge}>

          <MaterialCommunityIcons
            name="file-document-outline"
            size={14}
            color="#FFFFFF"
          />

          <Text style={styles.prescriptionText}>
            Prescription
          </Text>

        </View>
      )}

      {/* Stock */}

      <Text
        style={[
          styles.stock,
          {
            color:
              medicine.stock > 0
                ? "#2E7D32"
                : "#E53935",
          },
        ]}
      >
        {medicine.stock > 0
          ? "In Stock"
          : "Out of Stock"}
      </Text>

      {/* Add to Cart */}

      <PrimaryButton
        title="Add to Cart"
        onPress={() => onAddToCart && onAddToCart(medicine)}
        disabled={medicine.stock <= 0}
      />

    </TouchableOpacity>
  );
}