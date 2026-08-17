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
    fontSize: 21,
    fontWeight: "700",
    color: "#222222",
  },

  count: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2E7D32",
  },

  // ==========================================
  // Medicine List
  // ==========================================

  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
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
    borderColor: "#E5E7EB",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  // ==========================================
  // Card Header
  // ==========================================

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    marginBottom: 14,
  },

  nameContainer: {
    flexDirection: "row",
    alignItems: "flex-start",

    flex: 1,
    marginRight: 10,
  },

  checkbox: {
    width: 24,
    height: 24,

    borderWidth: 1.5,
    borderColor: "#BDBDBD",

    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
    marginTop: 2,

    backgroundColor: "#FFFFFF",
  },

  checkboxSelected: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  nameArea: {
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
  },

  // ==========================================
  // Type Badge
  // ==========================================

  typeBadge: {
    backgroundColor: "#E8F5E9",

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 7,
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
    alignItems: "center",

    minHeight: 52,

    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },

  label: {
    width: 110,

    fontSize: 13,
    fontWeight: "500",

    color: "#666666",
  },

  value: {
    flex: 1,

    fontSize: 14,
    fontWeight: "600",

    color: "#333333",

    textAlign: "right",
  },

  price: {
    flex: 1,

    fontSize: 15,
    fontWeight: "700",

    color: "#2E7D32",

    textAlign: "right",
  },

  // ==========================================
  // Edit Input
  // ==========================================

  editInput: {
    flex: 1,

    minHeight: 42,

    borderWidth: 1,
    borderColor: "#D1D5DB",

    borderRadius: 8,

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 10,

    fontSize: 14,
    color: "#222222",

    textAlign: "right",
  },

  // ==========================================
  // Action Buttons
  // ==========================================

  actionContainer: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    marginTop: 15,
  },

  editButton: {
    flex: 1,

    height: 46,

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

  deleteButton: {
    flex: 1,

    height: 46,

    borderRadius: 10,

    backgroundColor: "#D32F2F",

    justifyContent: "center",
    alignItems: "center",
  },

  deleteButtonText: {
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
});

export default styles;