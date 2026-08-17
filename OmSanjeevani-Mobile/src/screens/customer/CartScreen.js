import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  useCart,
} from "../../context/CartContext";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./CartScreenStyles";
import AppHeader from "../../components/headers/AppHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function CartScreen({
  navigation,
}) {
  const {
    cartItems,
    loadCart,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
  } = useCart();

  // ==========================================
  // REFRESH CART WHEN SCREEN OPENS
  // ==========================================

  useFocusEffect(
    React.useCallback(() => {
      loadCart();
    }, [loadCart])
  );
  // ==========================================
  // Get Item Price
  // ==========================================

  const getItemPrice = (item) => {
    return Number(
      item?.offerPrice ??
        item?.sellingPrice ??
        item?.price ??
        item?.mrp ??
        0
    );
  };

  // ==========================================
  // Total Amount
  // ==========================================

  const getTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => {
        const price = getItemPrice(item);
        const quantity = Number(
          item?.quantity || 0
        );

        return total + price * quantity;
      },
      0
    );
  };

  // ==========================================
  // Render Cart Item
  // ==========================================

  const renderItem = ({ item }) => {
    const price = getItemPrice(item);

    const quantity = Number(
      item?.quantity || 1
    );

    return (
      <View style={styles.cartItem}>
        {/* Medicine Image */}

        {item?.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons
              name="medical-outline"
              size={40}
              color="#2E7D32"
            />
          </View>
        )}

        {/* Medicine Details */}

        <View style={styles.details}>
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

          {/* Quantity */}

          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.qtyButton}
              activeOpacity={0.7}
              onPress={() =>
                decreaseQuantity(item)
              }
            >
              <Ionicons
                name="remove"
                size={18}
                color="#2E7D32"
              />
            </TouchableOpacity>

            <Text style={styles.quantity}>
              {quantity}
            </Text>

            <TouchableOpacity
              style={styles.qtyButton}
              activeOpacity={0.7}
              onPress={() =>
                increaseQuantity(item)
              }
            >
              <Ionicons
                name="add"
                size={18}
                color="#2E7D32"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Delete */}

        <TouchableOpacity
          style={styles.deleteButton}
          activeOpacity={0.7}
          onPress={() =>
            removeItemFromCart(item)
          }
        >
          <Ionicons
            name="trash-outline"
            size={23}
            color="#E53935"
          />
        </TouchableOpacity>
      </View>
    );
  };

  // ==========================================
  // Empty Cart
  // ==========================================

  const renderEmptyCart = () => {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="cart-outline"
          size={70}
          color="#CCCCCC"
        />

        <Text style={styles.emptyTitle}>
          Your Cart is Empty
        </Text>

        <Text style={styles.emptySubtitle}>
          Add medicines to continue shopping.
        </Text>
      </View>
    );
  };

  // ==========================================
  // Main Screen
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <AppHeader
        title="My Cart"
        showBackButton
        onBackPress={() =>
          navigation.goBack()
        }
      />

      {/* Cart List */}

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) =>
          item?._id?.toString() ||
          item?.medicineId?.toString() ||
          index.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={[
          styles.list,
          cartItems.length === 0 &&
            styles.emptyList,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          renderEmptyCart
        }
      />

      {/* Bottom Checkout */}

      {cartItems.length > 0 && (
        <View
          style={styles.bottomContainer}
        >
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total Amount
            </Text>

            <Text
              style={styles.totalAmount}
            >
              ₹
              {getTotalAmount().toFixed(2)}
            </Text>
          </View>

          <PrimaryButton
            title="Proceed to Checkout"
            onPress={() =>
              navigation.navigate(
                "Checkout",
                {
                  cartItems,
                  totalAmount:
                    getTotalAmount(),
                }
              )
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}