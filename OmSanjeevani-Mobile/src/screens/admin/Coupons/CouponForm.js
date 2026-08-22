import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { createCoupon, updateCoupon } from "../../../services/api";
import styles from "./CouponFormStyles";

const initialCoupon = {
  code: "",
  discountType: "Percentage",
  discountValue: "",
  minOrder: "",
  expiryDate: "",
  status: "active",
  maxUsagePerUser: "1",
  maxTotalUsage: "",
};

const CouponForm = ({ navigation, route }) => {
  const selectedCoupon = route?.params?.coupon;

  const [coupon, setCoupon] = useState(initialCoupon);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedCoupon) {
      setCoupon({
        code: selectedCoupon.code || "",
        discountType:
          selectedCoupon.discountType || "Percentage",
        discountValue: String(
          selectedCoupon.discountValue || ""
        ),
        minOrder: String(selectedCoupon.minOrder || ""),
        expiryDate: selectedCoupon.expiryDate
          ? new Date(selectedCoupon.expiryDate)
              .toISOString()
              .slice(0, 10)
          : "",
        status: selectedCoupon.status || "active",
        maxUsagePerUser: String(
          selectedCoupon.maxUsagePerUser || 1
        ),
        maxTotalUsage:
          selectedCoupon.maxTotalUsage !== null &&
          selectedCoupon.maxTotalUsage !== undefined
            ? String(selectedCoupon.maxTotalUsage)
            : "",
      });

      setIsEditing(true);
    } else {
      setCoupon(initialCoupon);
      setIsEditing(false);
    }
  }, [selectedCoupon]);

  const handleChange = (name, value) => {
    setCoupon((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setError("");

    if (!coupon.code.trim()) {
      Alert.alert("Validation Error", "Please enter coupon code");
      return;
    }

    if (!coupon.discountValue) {
      Alert.alert(
        "Validation Error",
        "Please enter discount value"
      );
      return;
    }

    if (!coupon.expiryDate) {
      Alert.alert(
        "Validation Error",
        "Please enter expiry date"
      );
      return;
    }

    const payload = {
      code: coupon.code.trim().toUpperCase(),
      discountType: coupon.discountType,
      discountValue: Number(coupon.discountValue),
      minOrder: Number(coupon.minOrder || 0),
      expiryDate: coupon.expiryDate,
      status: coupon.status,
      maxUsagePerUser: Number(
        coupon.maxUsagePerUser || 1
      ),
      maxTotalUsage:
        coupon.maxTotalUsage === ""
          ? null
          : Number(coupon.maxTotalUsage),
    };

    try {
      setSaving(true);

      let response;

      if (isEditing) {
        const couponId =
          selectedCoupon?._id || selectedCoupon?.id;

        response = await updateCoupon(
          couponId,
          payload
        );
      } else {
        response = await createCoupon(payload);
      }

      if (response?.success) {
        Alert.alert(
          "Success",
          isEditing
            ? "Coupon updated successfully"
            : "Coupon created successfully",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        setError(
          response?.message || "Unable to save coupon"
        );
      }
    } catch (err) {
      console.error("Coupon save error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to save coupon"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {isEditing
            ? "Edit Coupon"
            : "Add New Coupon"}
        </Text>

        <Text style={styles.subtitle}>
          {isEditing
            ? "Update coupon details below"
            : "Create a new discount coupon"}
        </Text>
      </View>

      <View style={styles.formCard}>
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        ) : null}

        {/* Coupon Code */}

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Coupon Code *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Coupon Code"
            placeholderTextColor="#9ca3af"
            value={coupon.code}
            autoCapitalize="characters"
            onChangeText={(value) =>
              handleChange("code", value)
            }
          />
        </View>

        {/* Discount Type */}

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Discount Type
          </Text>

          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                coupon.discountType === "Percentage" &&
                  styles.optionButtonActive,
              ]}
              onPress={() =>
                handleChange(
                  "discountType",
                  "Percentage"
                )
              }
            >
              <Text
                style={[
                  styles.optionText,
                  coupon.discountType === "Percentage" &&
                    styles.optionTextActive,
                ]}
              >
                Percentage (%)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                coupon.discountType === "Fixed" &&
                  styles.optionButtonActive,
              ]}
              onPress={() =>
                handleChange("discountType", "Fixed")
              }
            >
              <Text
                style={[
                  styles.optionText,
                  coupon.discountType === "Fixed" &&
                    styles.optionTextActive,
                ]}
              >
                Fixed (₹)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Discount Value */}

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Discount Value *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Discount"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            value={coupon.discountValue}
            onChangeText={(value) =>
              handleChange("discountValue", value)
            }
          />
        </View>

        {/* Minimum Order */}

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Minimum Order Amount
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Minimum Order"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            value={coupon.minOrder}
            onChangeText={(value) =>
              handleChange("minOrder", value)
            }
          />
        </View>

        {/* Maximum Usage Per User */}

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Maximum Usage Per User
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Maximum Usage"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            value={coupon.maxUsagePerUser}
            onChangeText={(value) =>
              handleChange(
                "maxUsagePerUser",
                value
              )
            }
          />
        </View>

        {/* Maximum Total Usage */}

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Maximum Total Usage
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Leave empty for unlimited"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            value={coupon.maxTotalUsage}
            onChangeText={(value) =>
              handleChange(
                "maxTotalUsage",
                value
              )
            }
          />
        </View>

        {/* Expiry Date */}

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Expiry Date *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#9ca3af"
            value={coupon.expiryDate}
            onChangeText={(value) =>
              handleChange("expiryDate", value)
            }
          />

          <Text style={styles.helperText}>
            Example: 2026-12-31
          </Text>
        </View>

        {/* Status */}

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Status
          </Text>

          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                coupon.status === "active" &&
                  styles.activeStatusButton,
              ]}
              onPress={() =>
                handleChange("status", "active")
              }
            >
              <Text
                style={[
                  styles.optionText,
                  coupon.status === "active" &&
                    styles.optionTextActive,
                ]}
              >
                Active
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                coupon.status === "inactive" &&
                  styles.inactiveStatusButton,
              ]}
              onPress={() =>
                handleChange("status", "inactive")
              }
            >
              <Text
                style={[
                  styles.optionText,
                  coupon.status === "inactive" &&
                    styles.optionTextActive,
                ]}
              >
                Inactive
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons */}

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              saving && styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>
                {isEditing
                  ? "Update Coupon"
                  : "Save Coupon"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            disabled={saving}
          >
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CouponForm;