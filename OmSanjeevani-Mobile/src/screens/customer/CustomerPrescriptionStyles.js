import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  // ==========================================
  // MAIN CONTAINER
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F7FAF8",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F7F3",
    marginRight: 12,
  },

  backText: {
    fontSize: 27,
    color: "#008A35",
    fontWeight: "600",
    marginTop: -2,
  },

  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    color: "#222222",
  },

  // ==========================================
  // MAIN CARD
  // ==========================================

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 18,
    padding: 18,
    borderRadius: 16,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3,
  },

  // ==========================================
  // TITLE
  // ==========================================

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#008A35",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#666666",
    marginBottom: 20,
  },

  // ==========================================
  // UPLOAD OPTIONS
  // ==========================================

  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  optionButton: {
    width: "31%",
    minHeight: 95,
    borderWidth: 1,
    borderColor: "#DDE9E1",
    borderRadius: 12,
    backgroundColor: "#F8FCF9",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },

  optionIcon: {
    fontSize: 30,
    marginBottom: 7,
  },

  optionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333333",
  },

  // ==========================================
  // IMAGE PREVIEW
  // ==========================================

  previewContainer: {
    marginTop: 5,
    marginBottom: 18,
  },

  previewTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 10,
  },

  previewImage: {
    width: "100%",
    height: 260,
    borderRadius: 12,
    backgroundColor: "#F4F4F4",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  // ==========================================
  // SELECTED FILE
  // ==========================================

  fileContainer: {
    backgroundColor: "#F4FAF6",
    borderWidth: 1,
    borderColor: "#DDE9E1",
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
  },

  fileLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#777777",
    marginBottom: 5,
  },

  fileName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    lineHeight: 20,
  },

  // ==========================================
  // BUTTON CONTAINER
  // ==========================================

  buttonContainer: {
    marginTop: 4,
  },

  // ==========================================
  // UPLOAD BUTTON
  // ==========================================

  uploadButton: {
    minHeight: 50,
    borderRadius: 10,
    backgroundColor: "#008A35",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  disabledButton: {
    opacity: 0.6,
  },

  // ==========================================
  // REMOVE BUTTON
  // ==========================================

  removeButton: {
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },

  removeButtonText: {
    color: "#E53935",
    fontSize: 15,
    fontWeight: "700",
  },

  // ==========================================
  // IMPORTANT NOTE
  // ==========================================

  noteContainer: {
    marginTop: 22,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#FFF8E8",
    borderWidth: 1,
    borderColor: "#F2E2B5",
  },

  noteTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#8A6500",
    marginBottom: 6,
  },

  noteText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#665A3C",
  },

});

export default styles;