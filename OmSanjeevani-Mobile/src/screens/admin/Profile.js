import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import styles from "./ProfileStyles";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Anoop Tripathi",
    email: "anoop@gmail.com",
    mobile: "9876543210",
    role: "Super Admin",
    address: "Delhi, India",
  });

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditProfile = () => {
    if (isEditing) {
      Alert.alert(
        "Profile Updated",
        "Profile changes saved successfully."
      );

      // TODO:
      // Later connect real Update Profile API here
    }

    setIsEditing(!isEditing);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileCard}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitial}>
            {profile.fullName?.charAt(0)?.toUpperCase() || "A"}
          </Text>
        </View>

        <Text style={styles.title}>
          Admin Profile
        </Text>

        <Text style={styles.subtitle}>
          Manage your account information
        </Text>

        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>

            <TextInput
              style={[
                styles.input,
                !isEditing && styles.readOnlyInput,
              ]}
              value={profile.fullName}
              editable={isEditing}
              onChangeText={(value) =>
                handleChange("fullName", value)
              }
              placeholder="Enter Full Name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              style={[
                styles.input,
                !isEditing && styles.readOnlyInput,
              ]}
              value={profile.email}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(value) =>
                handleChange("email", value)
              }
              placeholder="Enter Email"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Mobile Number</Text>

            <TextInput
              style={[
                styles.input,
                !isEditing && styles.readOnlyInput,
              ]}
              value={profile.mobile}
              editable={isEditing}
              keyboardType="phone-pad"
              onChangeText={(value) =>
                handleChange("mobile", value)
              }
              placeholder="Enter Mobile Number"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Role</Text>

            <TextInput
              style={[
                styles.input,
                styles.readOnlyInput,
              ]}
              value={profile.role}
              editable={false}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>

            <TextInput
              style={[
                styles.textArea,
                !isEditing && styles.readOnlyInput,
              ]}
              value={profile.address}
              editable={isEditing}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onChangeText={(value) =>
                handleChange("address", value)
              }
              placeholder="Enter Address"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.editButton,
              isEditing && styles.saveButton,
            ]}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? "Save Profile" : "Edit Profile"}
            </Text>
          </TouchableOpacity>

          {isEditing && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>
                Cancel
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;