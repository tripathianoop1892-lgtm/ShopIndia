import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "./ReviewsStyles";

const Reviews = () => {
  const [search, setSearch] = useState("");

  // Temporary sample reviews
  const [reviews] = useState([
    {
      id: "1",
      name: "Rahul Kumar",
      rating: 5,
      review: "Very good service and fast delivery.",
      date: "20 Aug 2026",
    },
    {
      id: "2",
      name: "Amit Singh",
      rating: 4,
      review: "Good experience. Medicines delivered on time.",
      date: "19 Aug 2026",
    },
    {
      id: "3",
      name: "Priya Sharma",
      rating: 5,
      review: "Easy to use app and good service.",
      date: "18 Aug 2026",
    },
  ]);

  const filteredReviews = reviews.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.name.toLowerCase().includes(searchText) ||
      item.review.toLowerCase().includes(searchText)
    );
  });

  const renderReview = ({ item }) => {
    return (
      <View style={styles.reviewCard}>
        <View style={styles.cardHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {item.name}
            </Text>

            <Text style={styles.date}>
              {item.date}
            </Text>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              ⭐ {item.rating}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.reviewText}>
          {item.review}
        </Text>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>
              View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton}>
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
        <Text style={styles.title}>
          Customer Reviews
        </Text>

        <Text style={styles.totalReviews}>
          Total: {reviews.length}
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search reviews..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredReviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReview}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No reviews found
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Reviews;