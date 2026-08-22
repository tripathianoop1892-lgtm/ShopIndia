import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import styles from "./CouponCardStyles";

const CouponCard = ({
  code,
  discount,
  type = "Percentage",
  expiry,
  status = "Active",
  onEdit,
  onDelete,
}) => {
  const isActive = status === "Active";

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.codeContainer}>
          <Text style={styles.code}>{code}</Text>

          <Text style={styles.type}>
            {type} Discount
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            isActive
              ? styles.activeBadge
              : styles.inactiveBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isActive
                ? styles.activeText
                : styles.inactiveText,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Text style={styles.label}>Discount</Text>
        <Text style={styles.value}>{discount}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Expiry</Text>
        <Text style={styles.value}>{expiry}</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEdit}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CouponCard;