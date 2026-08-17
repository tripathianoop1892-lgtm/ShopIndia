import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // Main Container
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F7F9F8",
  },

  keyboardContainer: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },

  // ==========================================
  // Header
  // ==========================================

  header: {
    marginBottom: 22,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222222",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
  },

  // ==========================================
  // Form
  // ==========================================

  formGroup: {
    marginBottom: 18,
  },

    // ==========================================
  // Individual Sale Checkbox
  // ==========================================

  checkboxRow: {
    minHeight: 52,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,

    paddingHorizontal: 14,

    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 24,
    height: 24,

    borderWidth: 1.5,
    borderColor: "#9E9E9E",
    borderRadius: 5,

    marginRight: 10,

    alignItems: "center",
    justifyContent: "center",
  },

  checkboxSelected: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },

  checkboxTick: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },

  input: {
    minHeight: 52,
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,

    paddingHorizontal: 14,
    paddingVertical: 12,

    fontSize: 15,
    color: "#222222",
  },

  readOnlyInput: {
    backgroundColor: "#F0F2F1",
    color: "#2E7D32",
    fontWeight: "700",
  },

  helperText: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 17,
    color: "#64748B",
  },


  // ==========================================
 // ==========================================
// Dropdown / Select
// ==========================================

dropdownButton: {
  minHeight: 52,

  backgroundColor: "#FFFFFF",

  borderWidth: 1,
  borderColor: "#D9D9D9",
  borderRadius: 10,

  paddingHorizontal: 14,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

dropdownText: {
  flex: 1,

  fontSize: 15,
  color: "#222222",
},

dropdownPlaceholder: {
  color: "#999999",
},

dropdownArrow: {
  marginLeft: 10,

  fontSize: 18,
  color: "#555555",
},

dropdownOverlay: {
  flex: 1,

  backgroundColor: "rgba(0, 0, 0, 0.45)",

  justifyContent: "center",

  paddingHorizontal: 20,
},

dropdownModal: {
  width: "100%",

  maxHeight: "75%",

  backgroundColor: "#FFFFFF",

  borderRadius: 14,

  overflow: "hidden",

  elevation: 8,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.2,
  shadowRadius: 8,
},

dropdownHeader: {
  minHeight: 58,

  paddingHorizontal: 18,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  borderBottomWidth: 1,
  borderBottomColor: "#E5E5E5",

  backgroundColor: "#FFFFFF",
},

dropdownTitle: {
  fontSize: 18,

  fontWeight: "700",

  color: "#222222",
},

dropdownClose: {
  fontSize: 28,

  lineHeight: 30,

  color: "#555555",

  paddingHorizontal: 4,
},

dropdownItem: {
  minHeight: 52,

  paddingHorizontal: 18,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",

  backgroundColor: "#FFFFFF",
},

selectedDropdownItem: {
  backgroundColor: "#E8F5E9",
},

dropdownItemText: {
  flex: 1,

  fontSize: 15,

  color: "#333333",
},

selectedDropdownItemText: {
  color: "#2E7D32",

  fontWeight: "700",
},

dropdownCheck: {
  marginLeft: 10,

  fontSize: 20,

  color: "#2E7D32",

  fontWeight: "700",
},

// ==========================================
// Date Picker
// ==========================================

dateInput: {
  minHeight: 52,

  backgroundColor: "#FFFFFF",

  borderWidth: 1,
  borderColor: "#D9D9D9",
  borderRadius: 10,

  paddingHorizontal: 14,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

dateText: {
  flex: 1,

  fontSize: 15,

  color: "#222222",
},

datePlaceholder: {
  color: "#999999",
},

calendarIcon: {
  marginLeft: 10,

  fontSize: 20,
},
  // ==========================================
  // Add Medicine Button
  // ==========================================

  submitButton: {
    height: 54,

    marginTop: 8,

    borderRadius: 12,

    backgroundColor: "#2E7D32",

    justifyContent: "center",
    alignItems: "center",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  disabledSubmitButton: {
    backgroundColor: "#9E9E9E",
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default styles;