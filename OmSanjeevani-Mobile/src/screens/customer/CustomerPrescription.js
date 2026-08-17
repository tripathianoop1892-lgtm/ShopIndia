import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { uploadPrescription } from "../../services/api";

import styles from "./CustomerPrescriptionStyles";


// ==========================================
// Customer Prescription Screen
// ==========================================

const CustomerPrescription = ({ navigation }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);


  // ==========================================
  // CAMERA
  // ==========================================

  const handleCamera = async () => {
    try {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Camera Permission",
          "Camera permission is required to take a prescription photo."
        );
        return;
      }

      const result =
        await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          quality: 0.8,
        });

      if (result.canceled) {
        return;
      }

      const asset = result.assets[0];

      setFile({
        uri: asset.uri,
        name: asset.fileName || `prescription_${Date.now()}.jpg`,
        type: asset.mimeType || "image/jpeg",
      });

      setFileName(
        asset.fileName || `prescription_${Date.now()}.jpg`
      );

      setPreview(asset.uri);

    } catch (error) {
      console.error("Camera Error:", error);

      Alert.alert(
        "Error",
        "Unable to open camera."
      );
    }
  };


  // ==========================================
  // GALLERY
  // ==========================================

  const handleGallery = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Gallery Permission",
          "Gallery permission is required to select a prescription."
        );
        return;
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          quality: 0.8,
        });

      if (result.canceled) {
        return;
      }

      const asset = result.assets[0];

      setFile({
        uri: asset.uri,
        name: asset.fileName || `prescription_${Date.now()}.jpg`,
        type: asset.mimeType || "image/jpeg",
      });

      setFileName(
        asset.fileName || `prescription_${Date.now()}.jpg`
      );

      setPreview(asset.uri);

    } catch (error) {
      console.error("Gallery Error:", error);

      Alert.alert(
        "Error",
        "Unable to open gallery."
      );
    }
  };


  // ==========================================
  // PDF
  // ==========================================

  const handlePDF = async () => {
    try {
      const result =
        await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: true,
        });

      if (result.canceled) {
        return;
      }

      const asset = result.assets[0];

      setFile({
        uri: asset.uri,
        name: asset.name,
        type: "application/pdf",
      });

      setFileName(asset.name);

      setPreview(null);

    } catch (error) {
      console.error("PDF Picker Error:", error);

      Alert.alert(
        "Error",
        "Unable to select PDF."
      );
    }
  };


  // ==========================================
  // REMOVE FILE
  // ==========================================

  const handleRemove = () => {
    setFile(null);
    setFileName("");
    setPreview(null);
  };


  // ==========================================
  // UPLOAD PRESCRIPTION
  // ==========================================

  const handleUpload = async () => {
    if (!file) {
      Alert.alert(
        "Prescription Required",
        "Please select a prescription first."
      );
      return;
    }

    try {
      setLoading(true);

      // Get logged-in user
      const userData =
        await AsyncStorage.getItem("user");

      if (!userData) {
        Alert.alert(
          "Login Required",
          "Please login again."
        );
        return;
      }

      const user = JSON.parse(userData);

      // ========================================
      // FormData
      // ========================================

      const formData = new FormData();

      formData.append(
        "prescription",
        {
          uri: file.uri,
          name: file.name,
          type: file.type,
        }
      );

      // ========================================
      // Upload API
      // ========================================

      const response =
        await uploadPrescription(formData);

      console.log(
        "UPLOAD PRESCRIPTION RESPONSE:",
        response
      );

      if (response.success) {
        Alert.alert(
          "Success",
          "Prescription uploaded successfully.",
          [
            {
              text: "OK",
              onPress: () => {
                handleRemove();
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Upload Failed",
          response.message ||
            "Unable to upload prescription."
        );
      }

    } catch (error) {
      console.error(
        "Prescription Upload Error:",
        error
      );

      Alert.alert(
        "Upload Failed",
        "Something went wrong while uploading the prescription."
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // UI
  // ==========================================

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* =====================================
            HEADER
        ====================================== */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>
              ←
            </Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Upload Prescription
          </Text>

        </View>


        {/* =====================================
            MAIN CARD
        ====================================== */}

        <View style={styles.card}>

          <Text style={styles.title}>
            📷 Upload Prescription
          </Text>

          <Text style={styles.subtitle}>
            Upload your doctor's prescription
            to order medicines easily.
          </Text>


          {/* ===================================
              UPLOAD OPTIONS
          ==================================== */}

          <View style={styles.optionsContainer}>

            {/* CAMERA */}

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleCamera}
            >

              <Text style={styles.optionIcon}>
                📷
              </Text>

              <Text style={styles.optionText}>
                Camera
              </Text>

            </TouchableOpacity>


            {/* GALLERY */}

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleGallery}
            >

              <Text style={styles.optionIcon}>
                🖼️
              </Text>

              <Text style={styles.optionText}>
                Gallery
              </Text>

            </TouchableOpacity>


            {/* PDF */}

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handlePDF}
            >

              <Text style={styles.optionIcon}>
                📄
              </Text>

              <Text style={styles.optionText}>
                PDF
              </Text>

            </TouchableOpacity>

          </View>


          {/* ===================================
              IMAGE PREVIEW
          ==================================== */}

          {preview && (

            <View style={styles.previewContainer}>

              <Text style={styles.previewTitle}>
                Prescription Preview
              </Text>

              <Image
                source={{ uri: preview }}
                style={styles.previewImage}
                resizeMode="contain"
              />

            </View>

          )}


          {/* ===================================
              FILE NAME
          ==================================== */}

          {fileName !== "" && (

            <View style={styles.fileContainer}>

              <Text style={styles.fileLabel}>
                Selected File
              </Text>

              <Text
                style={styles.fileName}
                numberOfLines={2}
              >
                {fileName}
              </Text>

            </View>

          )}


          {/* ===================================
              BUTTONS
          ==================================== */}

          <View style={styles.buttonContainer}>

            <TouchableOpacity
              style={[
                styles.uploadButton,
                loading && styles.disabledButton,
              ]}
              onPress={handleUpload}
              disabled={loading}
            >

              {loading ? (

                <ActivityIndicator
                  size="small"
                  color="#ffffff"
                />

              ) : (

                <Text style={styles.uploadButtonText}>
                  Upload Prescription
                </Text>

              )}

            </TouchableOpacity>


            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemove}
              disabled={loading}
            >

              <Text style={styles.removeButtonText}>
                Remove
              </Text>

            </TouchableOpacity>

          </View>


          {/* ===================================
              IMPORTANT NOTE
          ==================================== */}

          <View style={styles.noteContainer}>

            <Text style={styles.noteTitle}>
              Important
            </Text>

            <Text style={styles.noteText}>
              Please upload a clear and complete
              prescription. Verify medicine details
              before placing your order.
            </Text>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};


export default CustomerPrescription;