import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import styles from "./RoleSelectorStyles";

const roles = [
  {
    id: "customer",
    title: "Customer",
  },
  {
    id: "shopkeeper",
    title: "Shopkeeper",
  },
  {
    id: "distributor",
    title: "Distributor",
  },
];

export default function RoleSelector({
  value,
  onChange,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.label}>
        Select Role
      </Text>

      <View style={styles.roleContainer}>

        {roles.map((role) => {

          const selected = value === role.id;

          return (
            <TouchableOpacity
              key={role.id}
              activeOpacity={0.8}
              style={[
                styles.roleButton,
                selected && styles.selectedRole,
              ]}
              onPress={() => onChange(role.id)}
            >
              <Text
                style={[
                  styles.roleText,
                  selected && styles.selectedRoleText,
                ]}
              >
                {role.title}
              </Text>
            </TouchableOpacity>
          );

        })}

      </View>

    </View>
  );
}