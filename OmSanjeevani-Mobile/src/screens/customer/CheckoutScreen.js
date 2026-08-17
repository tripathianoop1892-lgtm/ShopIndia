import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
} from "react-native";

import styles from "./CheckoutScreenStyles";

import AppHeader from "../../components/headers/AppHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { createOrder } from "../../services/api";

export default function CheckoutScreen({
  navigation,
  route,
}) {
  const {
    cartItems = [],
    customer = {},
    shop = {},
  } = route?.params || {};
 const subtotal = cartItems.reduce(
  (total, item) =>
    total +
    Number(item.price || 0) *
    Number(item.quantity || 0),
  0
);

  const deliveryCharge = subtotal > 500 ? 0 : 40;
  const platformFee = 5;
  const totalAmount = subtotal + deliveryCharge + platformFee;
  console.log("CHECKOUT CART ITEMS:", cartItems);
  console.log("CHECKOUT SUBTOTAL:", subtotal);
  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.medicineName}>
  {item.name || "Medicine"}
</Text>

      <Text style={styles.itemDetails}>
        Qty : {item.quantity}
      </Text>

      <Text style={styles.itemPrice}>
  ₹
  {(
    Number(item.price || 0) *
    Number(item.quantity || 0)
  ).toFixed(2)}
</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <AppHeader
        title="Checkout"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={cartItems}
       keyExtractor={(item, index) =>
  item?.medicineId?.toString() ||
  item?._id?.toString() ||
  index.toString()
}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>

            {/* Customer */}

            <View style={styles.section}>

              <Text style={styles.sectionTitle}>
                Customer Details
              </Text>

              <Text style={styles.infoText}>
                {customer.fullName || "Customer Name"}
              </Text>

              <Text style={styles.infoText}>
                {customer.mobile || "Mobile Number"}
              </Text>

            </View>

            {/* Shop */}

            <View style={styles.section}>

              <Text style={styles.sectionTitle}>
                Shop Details
              </Text>

              <Text style={styles.infoText}>
                {shop.shopName || "Medical Store"}
              </Text>

              <Text style={styles.infoText}>
                Shop ID : {shop.shopId || "OS100245"}
              </Text>

            </View>

            {/* Address */}

            <View style={styles.section}>

              <Text style={styles.sectionTitle}>
                Delivery Address
              </Text>

              <Text style={styles.infoText}>
                {customer.address || "Address not available"}
              </Text>

            </View>

            {/* Payment */}

            <View style={styles.section}>

              <Text style={styles.sectionTitle}>
                Payment Method
              </Text>

              <Text style={styles.infoText}>
                Cash on Delivery
              </Text>

            </View>

            {/* Medicines */}

            <Text style={styles.orderTitle}>
              Order Summary
            </Text>

          </>
        }
        ListFooterComponent={
          <View style={styles.summaryContainer}>

            <View style={styles.summaryRow}>
              <Text>Subtotal</Text>

              <Text>₹{subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text>Delivery Charge</Text>

              <Text>₹{deliveryCharge.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
            <Text>Platform Fee</Text>

              <Text>₹{platformFee.toFixed(2)}</Text>
             </View>

            <View style={styles.summaryRow}>
              <Text style={styles.totalText}>
                Total
              </Text>

              <Text style={styles.totalAmount}>
                ₹{totalAmount}
              </Text>
            </View>

          <PrimaryButton
  title="Place Order"
  onPress={async () => {
    try {
      console.log("PLACE ORDER CLICKED");

      const sellerId =
        cartItems?.[0]?.sellerId;

      if (!sellerId) {
        console.log(
          "SELLER ID NOT FOUND:",
          cartItems
        );
        return;
      }

      const response = await createOrder({
        items: cartItems,
        sellerId: sellerId,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        platformFee: platformFee,
        couponCode: "",
      });

      console.log(
        "CREATE ORDER RESPONSE:",
        response
      );

      if (response?.success) {
        console.log(
          "ORDER CREATED SUCCESSFULLY:",
          response.data
        );

        navigation.navigate("Orders");
      }
    } catch (error) {
      console.error(
        "PLACE ORDER ERROR:",
        error
      );
    }
  }}
/>
          </View>
        }
      />

    </SafeAreaView>
  );
}