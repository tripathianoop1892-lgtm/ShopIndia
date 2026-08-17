import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./FeaturedMedicineCardStyles";

export default function FeaturedMedicineCard({
  medicine,
  onPress,
  onAddToCart,
}) {
  if (!medicine) {
    return null;
  }

  const {
    name,
    company,
    image,
    mrp,
    retailPrice,
    discount,
    stock,
  } = medicine;

  const finalPrice = retailPrice || medicine.price || 0;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onPress && onPress(medicine)}
    >
      {/* Medicine Image */}
      <View style={styles.imageContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons
              name="medkit-outline"
              size={42}
              color="#2E7D32"
            />
          </View>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {discount}% OFF
            </Text>
          </View>
        )}
      </View>

      {/* Medicine Information */}
      <View style={styles.content}>
        <Text
          style={styles.medicineName}
          numberOfLines={2}
        >
          {name || "Medicine"}
        </Text>

        {company ? (
          <Text
            style={styles.company}
            numberOfLines={1}
          >
            {company}
          </Text>
        ) : null}

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ₹{finalPrice}
          </Text>

          {mrp && Number(mrp) > Number(finalPrice) ? (
            <Text style={styles.mrp}>
              ₹{mrp}
            </Text>
          ) : null}
        </View>

        {/* Stock */}
        {stock !== undefined && (
          <Text
            style={[
              styles.stock,
              Number(stock) <= 0 && styles.outOfStock,
            ]}
          >
            {Number(stock) > 0
              ? `${stock} in stock`
              : "Out of stock"}
          </Text>
        )}

        {/* Add To Cart */}
        <TouchableOpacity
          style={[
            styles.cartButton,
            Number(stock) <= 0 && styles.disabledCartButton,
          ]}
          activeOpacity={0.8}
          disabled={Number(stock) <= 0}
          onPress={() =>
            onAddToCart && onAddToCart(medicine)
          }
        >
          <Ionicons
            name="cart-outline"
            size={18}
            color="#FFFFFF"
          />

          <Text style={styles.cartButtonText}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}