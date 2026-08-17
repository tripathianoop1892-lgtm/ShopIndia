import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // MAIN
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7F6",
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    height: 95,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#222222",
  },

  headerRight: {
    width: 42,
  },

  // ==========================================
  // CONTENT
  // ==========================================

  content: {
    padding: 18,
    paddingBottom: 30,
  },

  // ==========================================
  // PROFILE ICON
  // ==========================================

  profileIconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  profileIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#CDEBD7",
  },

  profileTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#222222",
    marginTop: 13,
  },

  profileSubtitle: {
    fontSize: 12,
    color: "#888888",
    marginTop: 5,
    textAlign: "center",
  },

  // ==========================================
  // INPUT
  // ==========================================

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 7,
  },

  inputContainer: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1E5E2",
    borderRadius: 13,
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#222222",
    marginLeft: 10,
    paddingVertical: 8,
  },

  // ==========================================
  // ADDRESS
  // ==========================================

  addressContainer: {
    minHeight: 105,
    alignItems: "flex-start",
    paddingTop: 14,
  },

  addressIcon: {
    marginTop: 2,
  },

  addressInput: {
    minHeight: 75,
  },

  // ==========================================
  // SAVE
  // ==========================================

  saveButton: {
    height: 53,
    borderRadius: 13,
    backgroundColor: "#008C3A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  disabledButton: {
    opacity: 0.7,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 8,
  },

  // ==========================================
  // CANCEL
  // ==========================================

  cancelButton: {
    height: 50,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9DDDA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#555555",
  },

  // ==========================================
  // LOADING
  // ==========================================

  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F7F6",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    fontSize: 14,
    color: "#777777",
    marginTop: 10,
  },

  bottomSpace: {
    height: 20,
  },
});

export default styles;