import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import styles from "./AddMedicineScreenStyle";
import { addMedicine } from "../../services/api";

const MEDICINE_TYPES = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Injection",
  "Drops",
  "Ointment",
  "Cream",
  "Gel",
  "Lotion",
  "Powder",
  "Spray",
  "Inhaler",
  "Suspension",
  "Solution",
  "Soap",
  "Shampoo",
  "Patch",
  "Suppository",
  "Eye Drops",
  "Ear Drops",
  "Nasal Drops",
  "Softgel",
  "Chewable Tablet",
  "Dispersible Tablet",
  "Effervescent Tablet",
  "Mouth Dissolving Tablet",
  "Lozenge",
  "Mouthwash",
  "Oral Gel",
  "Oral Paste",
  "Nebulizer Solution",
  "Respules",
  "Infusion",
  "IV Fluid",
  "Vaccine",
  "Ampoule",
  "Vial",
  "Sachet",
  "Granules",
  "Oral Powder",
  "Dental Gel",
  "Dental Cream",
  "Liniment",
  "Foam",
  "Medicated Wipes",
  "Enema",
  "Pessary",
  "Implant",
  "Kit",
  "Medical Device",
];

const PACK_TYPES = [
  "Strip",
  "Bottle",
  "Box",
  "Tube",
  "Jar",
  "Vial",
  "Ampoule",
  "Sachet",
  "Pouch",
  "Blister Pack",
  "Carton",
  "Can",
  "Tin",
  "Bag",
  "Bottle with Dropper",
  "Pump Bottle",
  "Roll-On",
  "Spray Bottle",
  "Kit",
  "Single Unit",
];

const BOTTLE_SIZES = [
  "30 ml",
  "60 ml",
  "100 ml",
  "200 ml",
];

const TUBE_SIZES = [
  "10 g",
  "15 g",
  "30 g",
  "50 g",
];

const VOLUMES = [
  "1 ml",
  "2 ml",
  "5 ml",
  "10 ml",
];

export default function AddMedicineScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    type: "",
    strength: "",
    packSize: "",
    packType: "",
    bottleSize: "",
    tubeSize: "",
    volume: "",
    mrp: "",
    offerPrice: "",
    discount: "",
    stock: "",
    batch: "",
    image: "",
    mfgDate: "",
    expDate: "",
  });

  const [loading, setLoading] = useState(false);

  // ==========================================
  // Calculate Wholesale Offer Price
  // ==========================================

  const calculateOfferPrice = (mrpValue, discountValue) => {
    const mrpNumber = Number(mrpValue);
    const discountNumber = Number(discountValue);

    if (
      mrpValue === "" ||
      discountValue === "" ||
      Number.isNaN(mrpNumber) ||
      Number.isNaN(discountNumber)
    ) {
      return "";
    }

    if (discountNumber < 0 || discountNumber > 100) {
      return "";
    }

    const calculated =
      mrpNumber * (1 - discountNumber / 100);

    return calculated >= 0
      ? calculated.toFixed(2)
      : "";
  };

  // ==========================================
  // Handle Change
  // ==========================================

  const handleChange = (name, value) => {
    const updatedForm = {
      ...form,
      [name]: value,
    };

    if (name === "mrp" || name === "discount") {
      updatedForm.offerPrice = calculateOfferPrice(
        name === "mrp" ? value : form.mrp,
        name === "discount" ? value : form.discount
      );
    }

    if (name === "packType") {
      updatedForm.bottleSize = "";
      updatedForm.tubeSize = "";
      updatedForm.volume = "";

      if (value !== "Strip") {
        updatedForm.packSize = "";
      }
    }

    setForm(updatedForm);
  };

  // ==========================================
  // Submit Medicine
  // ==========================================

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      Alert.alert(
        "Validation",
        "Please enter medicine name."
      );
      return;
    }

    if (!form.mrp.trim()) {
      Alert.alert(
        "Validation",
        "Please enter MRP."
      );
      return;
    }

    if (!form.discount.trim()) {
      Alert.alert(
        "Validation",
        "Please enter discount."
      );
      return;
    }

    if (!form.stock.trim()) {
      Alert.alert(
        "Validation",
        "Please enter stock quantity."
      );
      return;
    }

    if (!form.expDate.trim()) {
      Alert.alert(
        "Validation",
        "Please enter expiry date."
      );
      return;
    }

    // Offer Price Validation
    if (Number(form.offerPrice) > Number(form.mrp)) {
      Alert.alert(
        "Invalid Price",
        "Offer price cannot exceed MRP."
      );
      return;
    }

    // Discount Validation
    if (
      Number(form.discount) < 0 ||
      Number(form.discount) > 100
    ) {
      Alert.alert(
        "Invalid Discount",
        "Discount must be between 0 and 100."
      );
      return;
    }

    // Stock Validation
    if (Number(form.stock) < 0) {
      Alert.alert(
        "Invalid Stock",
        "Stock cannot be negative."
      );
      return;
    }

    // Date Validation
    if (
      form.mfgDate &&
      form.expDate &&
      new Date(form.expDate) <= new Date(form.mfgDate)
    ) {
      Alert.alert(
        "Invalid Date",
        "Expiry date must be after manufacturing date."
      );
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // Distributor Web Payload
      // ==========================================

      const dataToSend = {
        name: form.name.trim(),
        company: form.company.trim(),
        type: form.type,
        strength: form.strength.trim(),

        packSize: Number(form.packSize),
        packType: form.packType,

        mrp: Number(form.mrp),
        price: Number(form.offerPrice),
        discount: Number(form.discount),

        stock: Number(form.stock),

        batch: form.batch.trim(),
        image: form.image.trim(),

        mfd: form.mfgDate,
        expiry: form.expDate,
      };

      // ==========================================
      // Backend API
      // ==========================================

      const res = await addMedicine(dataToSend);

      if (res && res.success) {
        Alert.alert(
          "Success",
          "Medicine Added Successfully ✅"
        );

        setForm({
          name: "",
          company: "",
          type: "",
          strength: "",
          packSize: "",
          packType: "",
          bottleSize: "",
          tubeSize: "",
          volume: "",
          mrp: "",
          offerPrice: "",
          discount: "",
          stock: "",
          batch: "",
          image: "",
          mfgDate: "",
          expDate: "",
        });
      } else {
        Alert.alert(
          "Error",
          res?.message || "Error adding medicine."
        );
      }
    } catch (error) {
      console.error(
        "Distributor Add Medicine Error:",
        error
      );

      Alert.alert(
        "Error",
        "Error adding medicine."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Reusable Input
  // ==========================================

  const renderInput = (
    label,
    name,
    placeholder,
    keyboardType = "default"
  ) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={form[name]}
        onChangeText={(value) =>
          handleChange(name, value)
        }
        keyboardType={keyboardType}
      />
    </View>
  );

  // ==========================================
  // Reusable Select
  // ==========================================

  const renderSelect = (
    label,
    name,
    options,
    placeholder
  ) => (
    <View style={styles.formGroup}>
      <Text style={styles.label}>
        {label}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.selectScroll}
      >
        <View style={styles.optionRow}>
          {options.map((option) => {
            const selected =
              form[name] === option;

            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selected &&
                    styles.selectedOptionButton,
                ]}
                onPress={() =>
                  handleChange(name, option)
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    selected &&
                      styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {!form[name] && (
        <Text style={styles.selectPlaceholder}>
          {placeholder}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}

          <View style={styles.header}>
            <Text style={styles.title}>
              💊 Add Medicine
            </Text>

            <Text style={styles.subtitle}>
              Fill all details carefully to seed
              wholesale stock.
            </Text>
          </View>

          {/* Medicine Name */}

          {renderInput(
            "Medicine Name",
            "name",
            "Enter medicine name"
          )}

          {/* Company */}

          {renderInput(
            "Company",
            "company",
            "Enter company name"
          )}

          {/* Medicine Type */}

          {renderSelect(
            "Medicine Type",
            "type",
            MEDICINE_TYPES,
            "Select Medicine Type"
          )}

          {/* Medicine Image */}

          {renderInput(
            "Medicine Image URL",
            "image",
            "Paste image URL",
            "url"
          )}

          {/* Strength */}

          {renderInput(
            "Strength",
            "strength",
            "e.g. 650mg"
          )}

          {/* Pack Type */}

          {renderSelect(
            "Pack Type",
            "packType",
            PACK_TYPES,
            "Select Pack Type"
          )}

          {/* Tablets Per Strip */}

          {form.packType === "Strip" &&
            renderInput(
              "Tablets Per Strip",
              "packSize",
              "e.g. 10",
              "numeric"
            )}

          {/* Bottle Size */}

          {form.packType === "Bottle" &&
            renderSelect(
              "Bottle Size",
              "bottleSize",
              BOTTLE_SIZES,
              "Select Bottle Size"
            )}

          {/* Tube Size */}

          {form.packType === "Tube" &&
            renderSelect(
              "Tube Size",
              "tubeSize",
              TUBE_SIZES,
              "Select Tube Size"
            )}

          {/* Vial / Ampoule Volume */}

          {(form.packType === "Vial" ||
            form.packType === "Ampoule") &&
            renderSelect(
              "Volume",
              "volume",
              VOLUMES,
              "Select Volume"
            )}

          {/* MRP */}

          {renderInput(
            "MRP ₹",
            "mrp",
            "Enter MRP",
            "decimal-pad"
          )}

          {/* Discount */}

          {renderInput(
            "Discount %",
            "discount",
            "Enter discount",
            "decimal-pad"
          )}

          {/* Wholesale Offer Price */}

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Wholesale Offer Price ₹
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.readOnlyInput,
              ]}
              value={form.offerPrice}
              placeholder="Auto calculated"
              placeholderTextColor="#999999"
              editable={false}
            />

            <Text style={styles.helperText}>
              Auto-calculated wholesale listing
              cost.
            </Text>
          </View>

          {/* Stock */}

          {renderInput(
            "Stock Quantity",
            "stock",
            "Enter stock",
            "numeric"
          )}

          {/* Batch */}

          {renderInput(
            "Batch Number",
            "batch",
            "Enter batch number"
          )}

          {/* Manufacturing Date */}

          {renderInput(
            "Manufacturing Date",
            "mfgDate",
            "YYYY-MM-DD"
          )}

          {/* Expiry Date */}

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Expiry Date
            </Text>

            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#999999"
              value={form.expDate}
              onChangeText={(value) =>
                handleChange(
                  "expDate",
                  value
                )
              }
            />
          </View>

          {/* Add Medicine Button */}

          <TouchableOpacity
            style={[
              styles.submitButton,
              loading &&
                styles.disabledSubmitButton,
            ]}
            activeOpacity={0.8}
            disabled={loading}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              {loading
                ? "Adding Medicine..."
                : "Add Medicine"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}