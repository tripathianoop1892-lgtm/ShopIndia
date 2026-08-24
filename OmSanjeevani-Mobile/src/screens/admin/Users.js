import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import styles from "./UsersStyles";

import { getAdminCustomers } from "../../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await getAdminCustomers();

      console.log("CUSTOMERS:", response);
if (Array.isArray(response)) {
  setUsers(response);
} else {
  setUsers([]);
}
    } catch (error) {
      console.error("CUSTOMERS ERROR:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Users
      </Text>

      <Text style={styles.subtitle}>
        Manage all registered customers
      </Text>

      {loading ? (
        <View style={styles.card}>
          <ActivityIndicator size="large" />

          <Text style={styles.cardText}>
            Loading customers...
          </Text>
        </View>
      ) : users.length > 0 ? (
        users.map((user) => (
          <View
            key={user._id}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>
              {user.name || "No Name"}
            </Text>

            <Text style={styles.cardText}>
              Email: {user.email || "N/A"}
            </Text>

            <Text style={styles.cardText}>
              Mobile: {user.mobile || "N/A"}
            </Text>
          </View>
        ))
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardText}>
            No customers found.
          </Text>
        </View>
      )}

    </ScrollView>
  );
};

export default Users;