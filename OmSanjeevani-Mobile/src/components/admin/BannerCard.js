import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import styles from "./BannerCardStyles";

const BannerCard = ({
  title,
  image,
  status = "Active",
  onEdit,
  onDelete,
}) => {
  const isActive = status === "Active";

  return (
    <View style={styles.card}>
      
      {/* Banner Image */}
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>
            No Banner Image
          </Text>
        </View>
      )}

      {/* Banner Details */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>

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

        {/* Actions */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={onEdit}
          >
            <Text style={styles.editButtonText}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={onDelete}
          >
            <Text style={styles.deleteButtonText}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default BannerCard;