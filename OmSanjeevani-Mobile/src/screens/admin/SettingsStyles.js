import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },

  /* ================= HEADER ================= */

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
  },

  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },

  /* ================= SETTING CARD ================= */

  settingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eef0f4",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 18,
  },

  /* ================= FORM ================= */

  formGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 9,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#1f2937",
  },

  textArea: {
    height: 100,
    paddingTop: 12,
  },

  /* ================= BUTTON ================= */

  saveButton: {
    backgroundColor: "#2563eb",
    height: 48,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  saveButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default styles;