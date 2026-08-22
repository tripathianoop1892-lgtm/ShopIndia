import React from "react";
import {
  View,
  Text,
  ScrollView,
} from "react-native";

import styles from "./UsersStyles";

const Users = () => {
  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.title}>
        Users
      </Text>

      <Text style={styles.subtitle}>
        Manage all registered customers
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Customer Users
        </Text>

        <Text style={styles.cardText}>
          All registered customers will appear here.
        </Text>
      </View>

    </ScrollView>
  );
};

export default Users;