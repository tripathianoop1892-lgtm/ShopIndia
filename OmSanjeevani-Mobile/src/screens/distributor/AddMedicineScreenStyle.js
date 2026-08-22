import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // MAIN
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
  // HEADER
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
  // FORM
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
  // DROPDOWN BUTTON
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
    fontSize: 14,
    color: "#666666",
    marginLeft: 10,
  },

  // ==========================================
  // DROPDOWN MODAL
  // ==========================================

  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  dropdownModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    maxHeight: "75%",
    overflow: "hidden",
  },

  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  dropdownTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
  },

  dropdownClose: {
    fontSize: 30,
    lineHeight: 30,
    color: "#777777",
  },

  dropdownItem: {
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectedDropdownItem: {
    backgroundColor: "#E8F5E9",
  },

  dropdownItemText: {
    fontSize: 15,
    color: "#333333",
  },

  selectedDropdownItemText: {
    color: "#2E7D32",
    fontWeight: "700",
  },

  dropdownCheck: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
  },

  // ==========================================
  // DATE INPUT
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
    fontSize: 20,
    marginLeft: 10,
  },

  // ==========================================
  // SUBMIT BUTTON
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