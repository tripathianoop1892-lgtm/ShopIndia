import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // Main Container
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  // ==========================================
  // Title Section
  // ==========================================

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
  },

  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222222",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#777777",
  },

  count: {
    minWidth: 32,
    height: 32,

    borderRadius: 16,

    backgroundColor: "#E8F5E9",

    color: "#2E7D32",

    fontSize: 14,
    fontWeight: "700",

    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: 8,
  },

  // ==========================================
  // Medicine List
  // ==========================================

  list: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  // ==========================================
  // Medicine Card
  // ==========================================

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    padding: 16,

    marginBottom: 14,

    borderWidth: 1,
    borderColor: "#E8E8E8",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    marginBottom: 14,
  },

  medicineInfo: {
    flex: 1,
  },

  medicineName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222222",

    marginBottom: 4,
  },

  company: {
    fontSize: 13,
    color: "#666666",

    marginBottom: 8,
  },

  // ==========================================
  // Type Badge
  // ==========================================

  typeBadge: {
    alignSelf: "flex-start",

    backgroundColor: "#E8F5E9",

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 6,
  },

  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2E7D32",
  },

  // ==========================================
  // Information Rows
  // ==========================================

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 8,

    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },

  infoLabel: {
    fontSize: 13,
    color: "#666666",

    flex: 1,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",

    textAlign: "right",
  },

  retailPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E7D32",

    textAlign: "right",
  },

  // ==========================================
  // Low Stock
  // ==========================================

  lowStockText: {
    color: "#D32F2F",
    fontWeight: "700",
  },

  // ==========================================
  // Expiry
  // ==========================================

  expiryBadge: {
    backgroundColor: "#E8F5E9",

    paddingHorizontal: 9,
    paddingVertical: 5,

    borderRadius: 6,

    maxWidth: 180,
  },

  expiryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2E7D32",
  },

  expiredBadge: {
    backgroundColor: "#FFEBEE",
  },

  expiredText: {
    color: "#D32F2F",
  },

  // ==========================================
  // Edit Button
  // ==========================================

  editButton: {
    height: 46,

    marginTop: 14,

    borderRadius: 10,

    backgroundColor: "#2E7D32",

    justifyContent: "center",
    alignItems: "center",
  },

  editButtonText: {
    color: "#FFFFFF",

    fontSize: 14,
    fontWeight: "700",
  },

  // ==========================================
  // Loading
  // ==========================================

  loadingContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 12,

    fontSize: 14,
    color: "#666666",

    textAlign: "center",
  },

  // ==========================================
  // Empty State
  // ==========================================

  emptyContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 30,
    marginTop: 80,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",

    color: "#2E7D32",

    marginBottom: 8,

    textAlign: "center",
  },

  emptySubtitle: {
    fontSize: 14,

    color: "#777777",

    lineHeight: 21,

    textAlign: "center",
  },

  // ==========================================
  // Modal
  // ==========================================

  modalBackdrop: {
    flex: 1,

    backgroundColor: "rgba(0, 0, 0, 0.5)",

    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#FFFFFF",

    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,

    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 30,

    maxHeight: "90%",
  },

  // ==========================================
  // Modal Header
  // ==========================================

  modalHeader: {
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,

    fontWeight: "700",

    color: "#222222",

    marginBottom: 5,
  },

  modalMedicineName: {
    fontSize: 13,

    color: "#777777",
  },

  // ==========================================
  // Modal Fields
  // ==========================================

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,

    fontWeight: "600",

    color: "#333333",

    marginBottom: 7,
  },

  input: {
    height: 50,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#D9D9D9",

    borderRadius: 10,

    paddingHorizontal: 14,

    fontSize: 15,

    color: "#222222",
  },

  readOnlyInput: {
    backgroundColor: "#F0F2F1",

    color: "#2E7D32",

    fontWeight: "700",
  },

  // ==========================================
  // Modal Footer
  // ==========================================

  modalFooter: {
    flexDirection: "row",

    gap: 10,

    marginTop: 6,
  },

  cancelButton: {
    flex: 1,

    height: 50,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: "#D0D0D0",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FFFFFF",
  },

  cancelButtonText: {
    fontSize: 14,

    fontWeight: "600",

    color: "#555555",
  },

  saveButton: {
    flex: 1,

    height: 50,

    borderRadius: 10,

    backgroundColor: "#2E7D32",

    justifyContent: "center",
    alignItems: "center",
  },

  saveButtonText: {
    fontSize: 14,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  disabledButton: {
    backgroundColor: "#9E9E9E",
  },
});

export default styles;