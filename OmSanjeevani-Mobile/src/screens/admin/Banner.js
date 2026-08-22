import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

import styles from "./BannerStyles";

const Banner = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Temporary data — API connect hone par remove karenge
  const banners = [
    {
      id: "1",
      title: "Monsoon Offer",
      image: "https://via.placeholder.com/120x70",
      status: "Active",
    },
    {
      id: "2",
      title: "Diwali Sale",
      image: "https://via.placeholder.com/120x70",
      status: "Inactive",
    },
    {
      id: "3",
      title: "Health Care Week",
      image: "https://via.placeholder.com/120x70",
      status: "Active",
    },
  ];

  const filteredBanners = banners.filter((banner) =>
    banner.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const renderBanner = ({ item, index }) => {
    return (
      <View style={styles.bannerCard}>
        <Image
          source={{ uri: item.image }}
          style={styles.bannerImage}
        />

        <View style={styles.bannerInfo}>
          <Text style={styles.bannerNumber}>
            Banner #{index + 1}
          </Text>

          <Text style={styles.bannerTitle}>
            {item.title}
          </Text>

          <View
            style={[
              styles.statusBadge,
              item.status === "Active"
                ? styles.activeBadge
                : styles.inactiveBadge,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === "Active"
                  ? styles.activeText
                  : styles.inactiveText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("BannerForm", {
                banner: item,
              })
            }
          >
            <Text style={styles.editButtonText}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {}}
          >
            <Text style={styles.deleteButtonText}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Banner Management
          </Text>

          <Text style={styles.subtitle}>
            Manage app banners and promotions
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("BannerForm")
          }
        >
          <Text style={styles.addButtonText}>
            + Add
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Banner..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredBanners}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No banners found.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Banner;