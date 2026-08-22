import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // MAIN CONTAINER
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 15,
    paddingBottom: 40,
  },

  // ==========================================
  // LOADING
  // ==========================================

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#777777",
  },

  // ==========================================
  // PROFILE HEADER
  // ==========================================

  profileHeader: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 22,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 12,
  },

  profileTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222222",
  },

  profileSubtitle: {
    fontSize: 13,
    color: "#777777",
    textAlign: "center",
    marginTop: 5,
  },

  // ==========================================
  // SECTION
  // ==========================================

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 10,
  },

  // ==========================================
  // FORM CARD
  // ==========================================

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 16,

    marginBottom: 22,

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.07,

    shadowRadius: 3,
  },

  formGroup: {
    marginBottom: 18,
  },

  formGroupLast: {
    marginBottom: 0,
  },

  // ==========================================
  // LABEL
  // ==========================================

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444444",
    marginBottom: 8,
  },

  // ==========================================
  // INPUT
  // ==========================================

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
    backgroundColor: "#F1F3F2",
    color: "#777777",
  },

  textArea: {
    minHeight: 90,
    paddingTop: 13,
  },

  // ==========================================
  // SAVE BUTTON
  // ==========================================

  saveButton: {
    height: 54,

    backgroundColor: "#2E7D32",

    borderRadius: 12,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 5,
    marginBottom: 20,

    elevation: 3,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.12,

    shadowRadius: 4,
  },

  disabledButton: {
    backgroundColor: "#9E9E9E",
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 8,
  },
});

export default styles;