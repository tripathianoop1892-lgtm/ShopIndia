import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";

import styles from "./MedicineDetailsStyles";

import AppHeader from "../../components/headers/AppHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function MedicineDetails({
  route,
  navigation,
}) {
  const { medicine } = route.params || {};

  // ==========================================
  // Medicine Not Available
  // ==========================================

  if (!medicine) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader
          title="Medicine Details"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Medicine details not available.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // Medicine Data
  // ==========================================

  const medicineName =
    medicine.name || "Medicine";

  const company =
    medicine.company || "Generic";

  const type =
    medicine.type || "N/A";

  const strength =
    medicine.strength || "N/A";

  const mrp =
    Number(medicine.mrp || 0);

  const sellingPrice =
    Number(
      medicine.offerPrice ??
        medicine.price ??
        medicine.mrp ??
        0
    );

  const discount =
    Number(medicine.discount || 0);

  const stock =
    Number(medicine.stock || 0);

  const image =
    medicine.image || "";

  return (
    <SafeAreaView style={styles.container}>
      {/* =====================================
          Header
      ====================================== */}

      <AppHeader
        title="Medicine Details"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =====================================
            Medicine Image
        ====================================== */}

        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text
              style={
                styles.imagePlaceholderText
              }
            >
              💊
            </Text>
          </View>
        )}

        {/* =====================================
            Medicine Name
        ====================================== */}

        <Text style={styles.name}>
          {medicineName}
        </Text>

        {/* =====================================
            Company
        ====================================== */}

        <Text style={styles.company}>
          {company}
        </Text>

        {/* =====================================
            Type & Strength
        ====================================== */}

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>
              Type
            </Text>

            <Text style={styles.infoValue}>
              {type}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>
              Strength
            </Text>

            <Text style={styles.infoValue}>
              {strength}
            </Text>
          </View>
        </View>

        {/* =====================================
            Price
        ====================================== */}

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ₹{sellingPrice.toFixed(2)}
          </Text>

          {mrp > sellingPrice && (
            <Text style={styles.mrp}>
              ₹{mrp.toFixed(2)}
            </Text>
          )}
        </View>

        {/* =====================================
            Discount
        ====================================== */}

        {discount > 0 && (
          <Text style={styles.discount}>
            {discount}% OFF
          </Text>
        )}

        {/* =====================================
            Stock
        ====================================== */}

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

        {/* =====================================
            Description
        ====================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Description
          </Text>

          <Text style={styles.sectionText}>
            {medicine.description ||
              "Not Available"}
          </Text>
        </View>

        {/* =====================================
            Composition
        ====================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Composition
          </Text>

          <Text style={styles.sectionText}>
            {medicine.composition ||
              "Not Available"}
          </Text>
        </View>

        {/* =====================================
            Dosage
        ====================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Dosage
          </Text>

          <Text style={styles.sectionText}>
            {medicine.dosage ||
              "Consult your doctor."}
          </Text>
        </View>

        {/* =====================================
            Side Effects
        ====================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Side Effects
          </Text>

          <Text style={styles.sectionText}>
            {medicine.sideEffects ||
              "No common side effects available."}
          </Text>
        </View>

        {/* =====================================
            Prescription
        ====================================== */}

        {medicine.prescriptionRequired && (
          <View
            style={styles.prescriptionBox}
          >
            <Text
              style={
                styles.prescriptionText
              }
            >
              📄 Prescription Required
            </Text>
          </View>
        )}

        {/* =====================================
            Add To Cart
        ====================================== */}

        <PrimaryButton
          title={
            stock > 0
              ? "Add to Cart"
              : "Out of Stock"
          }
          disabled={stock <= 0}
          onPress={() => {
            console.log(
              "Add To Cart:",
              medicine._id
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}