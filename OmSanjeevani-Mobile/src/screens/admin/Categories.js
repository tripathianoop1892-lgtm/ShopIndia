import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./CategoriesStyles";
import { getCategorySummary } from "../../services/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCategorySummary();

        setCategories(
          Array.isArray(response)
            ? response
            : response?.data || []
        );
      } catch (error) {
        console.error("Category loading error:", error);
        setError("Unable to load category summary");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return categories;

    return categories.filter((item) => {
      const category = (item.category || "")
        .toLowerCase();

      return category.includes(term);
    });
  }, [categories, searchTerm]);

  const renderCategory = ({ item, index }) => (
    <View style={styles.categoryCard}>
      <View style={styles.idBox}>
        <Text style={styles.idText}>
          {index + 1}
        </Text>
      </View>

      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>
          {item.category || "Uncategorized"}
        </Text>

        <Text style={styles.medicineCount}>
          Total Medicines: {item.totalMedicine || 0}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Medicine Categories
        </Text>

        <Text style={styles.subtitle}>
          View medicine category summary
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Category..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Loading Categories...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCategories}
          renderItem={renderCategory}
          keyExtractor={(item, index) =>
            `${item.category || "category"}-${index}`
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.centerBox}>
              <Text style={styles.emptyText}>
                No Categories Found
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default Categories;