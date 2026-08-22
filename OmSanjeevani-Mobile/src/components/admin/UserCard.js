import React from "react";
import {
  View,
  Text,
} from "react-native";

import styles from "./UserCardStyles";

const UserCard = ({
  name,
  phone,
  email,
  role,
  status,
}) => {
  const isActive = status === "Active";

  return (
    <View style={styles.card}>
      
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name ? name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {name}
          </Text>

          <Text style={styles.role}>
            {role}
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

      <View style={styles.details}>
        <Text style={styles.detailText}>
          📞 {phone}
        </Text>

        <Text style={styles.detailText}>
          ✉️ {email}
        </Text>
      </View>

    </View>
  );
};

export default UserCard;