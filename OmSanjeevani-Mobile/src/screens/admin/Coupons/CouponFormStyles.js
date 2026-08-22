import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 5,
  },

  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  formGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#ffffff",
  },

  helperText: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 5,
  },

  optionRow: {
    flexDirection: "row",
    gap: 10,
  },

  optionButton: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  optionButtonActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  activeStatusButton: {
    backgroundColor: "#16a34a",
    borderColor: "#16a34a",
  },

  inactiveStatusButton: {
    backgroundColor: "#dc2626",
    borderColor: "#dc2626",
  },

  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5563",
  },

  optionTextActive: {
    color: "#ffffff",
  },

  buttonGroup: {
    marginTop: 10,
    gap: 12,
  },

  saveButton: {
    height: 50,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  cancelButton: {
    height: 50,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  cancelButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },

  disabledButton: {
    opacity: 0.6,
  },

  errorBox: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },

  errorText: {
    color: "#dc2626",
    fontSize: 14,
    textAlign: "center",
  },
});

export default styles;