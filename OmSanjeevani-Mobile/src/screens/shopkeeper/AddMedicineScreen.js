import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import styles from "./AddMedicineScreenStyles";
import { addMedicine } from "../../services/api";
import DateTimePicker from "@react-native-community/datetimepicker";

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

               const SELLING_UNITS = [
                               "Pack",
                               "Tablet",
                               "Capsule",
                               "Bottle",
                               "Tube",
                               "Vial",
                               "Ampoule",
                               "Sachet",
                               "Piece",
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
    sellingUnit: "Pack",
    individualSaleAllowed: false,
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
  const [openSelect, setOpenSelect] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateField, setDateField] = useState(null);

  // ==========================================
  // Calculate Retail Offer Price
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
  // Handle Input Change
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

    // Reset conditional fields when Pack Type changes
    if (name === "packType") {
      updatedForm.bottleSize = "";
      updatedForm.tubeSize = "";
      updatedForm.volume = "";

      // Pack size is used as Tablets Per Strip
      // only for Strip.
      if (value !== "Strip") {
        updatedForm.packSize = "";
      }
    }

    setForm(updatedForm);
  };
  
   // ==========================================
// Date Picker
// ==========================================

const formatDate = (date) => {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const openDatePicker = (field) => {
  setDateField(field);
  setShowDatePicker(true);
};

const handleDateChange = (
  event,
  selectedDate
) => {
  setShowDatePicker(false);

  if (!selectedDate || !dateField) {
    return;
  }

  const formattedDate =
    formatDate(selectedDate);

  handleChange(
    dateField,
    formattedDate
  );

  setDateField(null);
};
  // ==========================================
  // Submit Medicine
  // ==========================================

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      Alert.alert("Validation", "Please enter medicine name.");
      return;
    }

    if (!form.mrp.trim()) {
      Alert.alert("Validation", "Please enter MRP.");
      return;
    }

    if (!form.discount.trim()) {
      Alert.alert("Validation", "Please enter discount.");
      return;
    }

    if (!form.stock.trim()) {
      Alert.alert("Validation", "Please enter stock quantity.");
      return;
    }

    if (!form.expDate.trim()) {
      Alert.alert("Validation", "Please enter expiry date.");
      return;
    }

    // ==========================================
    // Offer Price Validation
    // ==========================================

    if (Number(form.offerPrice) > Number(form.mrp)) {
      Alert.alert(
        "Invalid Price",
        "Offer price cannot exceed MRP."
      );
      return;
    }

    // ==========================================
    // Discount Validation
    // ==========================================

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

    // ==========================================
    // Stock Validation
    // ==========================================

    if (Number(form.stock) < 0) {
      Alert.alert(
        "Invalid Stock",
        "Stock cannot be negative."
      );
      return;
    }

    // ==========================================
    // Date Validation
    // ==========================================

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
      // Same payload structure as Web
      // ==========================================

      const dataToSend = {
        name: form.name.trim(),
        company: form.company.trim(),
        type: form.type,
        strength: form.strength.trim(),

        packSize: Number(form.packSize),
        packType: form.packType,
        sellingUnit: form.sellingUnit,
        individualSaleAllowed: form.individualSaleAllowed,
        mrp: Number(form.mrp),
        offerPrice: Number(form.offerPrice),
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

        // Reset form
        setForm({
          name: "",
          company: "",
          type: "",
          strength: "",
          packSize: "",
          packType: "",
          sellingUnit: "Pack",
individualSaleAllowed: false,
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
      console.error("Add Medicine Error:", error);

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
      <Text style={styles.label}>{label}</Text>

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

    {/* DROPDOWN BUTTON */}

    <TouchableOpacity
      style={styles.dropdownButton}
      activeOpacity={0.8}
      onPress={() => setOpenSelect(name)}
    >
      <Text
        style={[
          styles.dropdownText,
          !form[name] && styles.dropdownPlaceholder,
        ]}
      >
        {form[name] || placeholder}
      </Text>

      <Text style={styles.dropdownArrow}>
        ▼
      </Text>
    </TouchableOpacity>


    {/* DROPDOWN MODAL */}

    <Modal
      visible={openSelect === name}
      transparent
      animationType="fade"
      onRequestClose={() => setOpenSelect(null)}
    >

      <View style={styles.dropdownOverlay}>

        <View style={styles.dropdownModal}>

          {/* HEADER */}

          <View style={styles.dropdownHeader}>

            <Text style={styles.dropdownTitle}>
              {label}
            </Text>

            <TouchableOpacity
              onPress={() => setOpenSelect(null)}
            >
              <Text style={styles.dropdownClose}>
                ×
              </Text>
            </TouchableOpacity>

          </View>


          {/* OPTIONS */}

          <FlatList
            data={options}
            keyExtractor={(item, index) =>
              `${item}-${index}`
            }
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            renderItem={({ item }) => {

              const selected =
                form[name] === item;

              return (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    selected &&
                      styles.selectedDropdownItem,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {

                    handleChange(
                      name,
                      item
                    );

                    setOpenSelect(null);
                  }}
                >

                  <Text
                    style={[
                      styles.dropdownItemText,
                      selected &&
                        styles.selectedDropdownItemText,
                    ]}
                  >
                    {item}
                  </Text>

                  {selected && (
                    <Text style={styles.dropdownCheck}>
                      ✓
                    </Text>
                  )}

                </TouchableOpacity>
              );
            }}
          />

        </View>

      </View>

    </Modal>

  </View>
);

  return (
  <SafeAreaView style={styles.container}>

    {showDatePicker && (
      <DateTimePicker
        value={new Date()}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />
    )}

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
          {/* =====================================
              Header
          ====================================== */}

          <View style={styles.header}>
            <View>
              <Text style={styles.title}>
                💊 Add Medicine
              </Text>

              <Text style={styles.subtitle}>
                Fill all medicine details carefully
                to add retail inventory.
              </Text>
            </View>
          </View>

          {/* =====================================
              Medicine Name
          ====================================== */}

          {renderInput(
            "Medicine Name",
            "name",
            "Enter medicine name"
          )}

          {/* =====================================
              Company
          ====================================== */}

          {renderInput(
            "Company",
            "company",
            "Enter company name"
          )}

          {/* =====================================
              Medicine Type
          ====================================== */}

          {renderSelect(
            "Medicine Type",
            "type",
            MEDICINE_TYPES,
            "Select Medicine Type"
          )}

          {/* =====================================
              Medicine Image URL
          ====================================== */}

          {renderInput(
            "Medicine Image URL",
            "image",
            "Paste image URL",
            "url"
          )}

          {/* =====================================
              Strength
          ====================================== */}

          {renderInput(
            "Strength",
            "strength",
            "e.g. 650mg"
          )}

          {/* =====================================
              Pack Type
          ====================================== */}

          {renderSelect(
            "Pack Type",
            "packType",
            PACK_TYPES,
            "Select Pack Type"
          )}
        


{renderSelect(
  "Selling Unit",
  "sellingUnit",
  SELLING_UNITS,
  "Select Selling Unit"
)}
          {(
  form.sellingUnit === "Tablet" ||
  form.sellingUnit === "Capsule" ||
  form.sellingUnit === "Piece"
) && (
  <View style={styles.formGroup}>
    <Text style={styles.label}>
      Allow Individual Sale
    </Text>

    <TouchableOpacity
      style={styles.checkboxRow}
      activeOpacity={0.8}
      onPress={() =>
        handleChange(
          "individualSaleAllowed",
          !form.individualSaleAllowed
        )
      }
    >
      <View
        style={[
          styles.checkbox,
          form.individualSaleAllowed &&
            styles.checkboxSelected,
        ]}
      >
        {form.individualSaleAllowed && (
          <Text style={styles.checkboxTick}>
            ✓
          </Text>
        )}
      </View>

      <Text style={styles.checkboxText}>
        Customer can buy individual units
      </Text>
    </TouchableOpacity>
  </View>
)} 

          {/* =====================================
              Strip → Tablets Per Strip
          ====================================== */}

          {form.packType === "Strip" &&
            renderInput(
              "Tablets Per Strip",
              "packSize",
              "e.g. 10",
              "numeric"
            )}

          {/* =====================================
              Bottle Size
          ====================================== */}

          {form.packType === "Bottle" &&
            renderSelect(
              "Bottle Size",
              "bottleSize",
              BOTTLE_SIZES,
              "Select Bottle Size"
            )}

          {/* =====================================
              Tube Size
          ====================================== */}

          {form.packType === "Tube" &&
            renderSelect(
              "Tube Size",
              "tubeSize",
              TUBE_SIZES,
              "Select Tube Size"
            )}

          {/* =====================================
              Vial / Ampoule Volume
          ====================================== */}

          {(form.packType === "Vial" ||
            form.packType === "Ampoule") &&
            renderSelect(
              "Volume",
              "volume",
              VOLUMES,
              "Select Volume"
            )}

          {/* =====================================
              MRP
          ====================================== */}

          {renderInput(
            "MRP ₹",
            "mrp",
            "Enter MRP",
            "decimal-pad"
          )}

          {/* =====================================
              Discount
          ====================================== */}

          {renderInput(
            "Discount %",
            "discount",
            "Enter discount",
            "decimal-pad"
          )}

          {/* =====================================
              Retail Selling Price
          ====================================== */}

          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Retail Selling Price ₹
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
              Auto-calculated retail cost for
              consumers.
            </Text>
          </View>

          {/* =====================================
              Stock
          ====================================== */}

          {renderInput(
            "Stock Quantity",
            "stock",
            "Enter stock",
            "numeric"
          )}

          {/* =====================================
              Batch
          ====================================== */}

          {renderInput(
            "Batch Number",
            "batch",
            "Enter batch number"
          )}

          {/* =====================================
              Manufacturing Date
          ====================================== */}

         <View style={styles.formGroup}>

  <Text style={styles.label}>
    Manufacturing Date
  </Text>

  <TouchableOpacity
    style={styles.dateInput}
    activeOpacity={0.8}
    onPress={() =>
      openDatePicker("mfgDate")
    }
  >
    <Text
      style={[
        styles.dateText,
        !form.mfgDate &&
          styles.datePlaceholder,
      ]}
    >
      {form.mfgDate ||
        "Select manufacturing date"}
    </Text>

    <Text style={styles.calendarIcon}>
      📅
    </Text>
  </TouchableOpacity>

</View>

          {/* =====================================
              Expiry Date
          ====================================== */}

          <View style={styles.formGroup}>

  <Text style={styles.label}>
    Expiry Date
  </Text>

  <TouchableOpacity
    style={styles.dateInput}
    activeOpacity={0.8}
    onPress={() =>
      openDatePicker("expDate")
    }
  >
    <Text
      style={[
        styles.dateText,
        !form.expDate &&
          styles.datePlaceholder,
      ]}
    >
      {form.expDate ||
        "Select expiry date"}
    </Text>

    <Text style={styles.calendarIcon}>
      📅
    </Text>
  </TouchableOpacity>

</View>

          {/* =====================================
              Add Medicine Button
          ====================================== */}

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