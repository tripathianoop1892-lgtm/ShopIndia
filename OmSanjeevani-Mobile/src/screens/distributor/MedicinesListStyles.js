import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666666",
  },

  searchContainer: {
    marginBottom: 16,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 70,
    paddingHorizontal: 20,
  },

  emptyText: {
    marginTop: 12,
    fontSize: 15,
    color: "#777777",
    textAlign: "center",
  },

  medicineCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  medicineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  medicineInfo: {
    flex: 1,
    paddingRight: 10,
  },

  medicineName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
  },

  medicineType: {
    fontSize: 13,
    color: "#777777",
    marginTop: 4,
  },

  checkboxContainer: {
    padding: 3,
  },

  detailsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 12,
  },

  detailBox: {
    width: "50%",
    marginBottom: 12,
  },

  detailLabel: {
    fontSize: 11,
    color: "#888888",
    marginBottom: 3,
  },

  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  priceText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E7D32",
  },

  stockText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1565C0",
  },

  expiryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#C62828",
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#222222",
    backgroundColor: "#FAFAFA",
  },

  fullInput: {
    width: "100%",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 12,
    marginTop: 4,
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#E8F5E9",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    marginLeft: 8,
  },

  editButtonText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "700",
    color: "#2E7D32",
  },

  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#2E7D32",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    marginLeft: 8,
  },

  saveButtonText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFEBEE",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    marginLeft: 8,
  },

  deleteButtonText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "700",
    color: "#D32F2F",
  },
});

export default styles;