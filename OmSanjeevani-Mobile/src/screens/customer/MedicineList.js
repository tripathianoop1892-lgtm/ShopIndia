import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
} from "react-native";

import styles from "./MedicineListStyles";

import AppHeader from "../../components/headers/AppHeader";
import SearchBar from "../../components/common/SearchBar";
import FeaturedMedicineCard from "../../components/cards/FeaturedMedicineCard";

export default function MedicineList({
  navigation,
  medicines = [],
  onSearch,
  onAddToCart,
  onWishlist,
}) {
  const renderMedicine = ({ item }) => (
    <FeaturedMedicineCard
      medicine={item}
      onPress={() =>
        navigation.navigate("MedicineDetails", {
          medicine: item,
        })
      }
      onAddToCart={onAddToCart}
      onWishlist={onWishlist}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <AppHeader
        title="Medicines"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      {/* Search */}

      <SearchBar
        placeholder="Search medicines..."
        onSearch={onSearch}
      />

      {/* Title */}

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Available Medicines
        </Text>

        <Text style={styles.count}>
          {medicines.length} Medicines
        </Text>
      </View>

      {/* Medicine List */}

      <FlatList
        data={medicines}
        keyExtractor={(item, index) =>
          item?._id?.toString() || index.toString()
        }
        renderItem={renderMedicine}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No Medicines Available
            </Text>

            <Text style={styles.emptySubtitle}>
              Medicines added by your shopkeeper will
              appear here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}