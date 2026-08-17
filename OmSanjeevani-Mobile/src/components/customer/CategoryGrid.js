import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./CategoryGridStyles";

export default function CategoryGrid({ onCategoryPress }) {

  // ==============================
  // Backend API Integration
  // ==============================

  /*
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      loadCategories();
  }, []);

  const loadCategories = async () => {
      const res = await getCategories();

      if (res.success) {
          setCategories(res.data);
      }
  };
  */

  // Temporary Development Data
  const categories = [
    {
      id: "1",
      name: "Medicine",
      icon: "medkit-outline",
    },
    {
      id: "2",
      name: "Ayurvedic",
      icon: "leaf-outline",
    },
    {
      id: "3",
      name: "Personal Care",
      icon: "body-outline",
    },
    {
      id: "4",
      name: "Baby Care",
      icon: "happy-outline",
    },
    {
      id: "5",
      name: "Healthcare",
      icon: "fitness-outline",
    },
    {
      id: "6",
      name: "Devices",
      icon: "pulse-outline",
    },
    {
      id: "7",
      name: "Vitamins",
      icon: "nutrition-outline",
    },
    {
      id: "8",
      name: "More",
      icon: "grid-outline",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        onCategoryPress && onCategoryPress(item)
      }
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={item.icon}
          size={30}
          color="#2E7D32"
        />
      </View>

      <Text style={styles.title}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.heading}>
          Shop by Category
        </Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={4}
        scrollEnabled={false}
      />

    </View>
  );
}