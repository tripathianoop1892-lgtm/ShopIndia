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
  // Select / Options
  // ==========================================

  selectScroll: {
    flexGrow: 0,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,

    marginRight: 8,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
  },

  selectedOptionButton: {
    backgroundColor: "#E8F5E9",
    borderColor: "#2E7D32",
  },

  optionText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#555555",
  },

  selectedOptionText: {
    color: "#2E7D32",
    fontWeight: "700",
  },

  selectPlaceholder: {
    marginTop: 8,
    fontSize: 12,
    color: "#999999",
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