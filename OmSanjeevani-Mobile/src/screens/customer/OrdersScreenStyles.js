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
  // Orders List
  // ==========================================

  list: {
    padding: 15,
    paddingBottom: 40,
  },

  emptyList: {
    flexGrow: 1,
  },

  // ==========================================
  // Order Card
  // ==========================================

  orderCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 16,

    marginBottom: 15,

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
  // Order Header
  // ==========================================

  orderHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingBottom: 14,

    marginBottom: 14,

    borderBottomWidth: 1,

    borderBottomColor: "#EEEEEE",
  },

  orderIdLabel: {
    fontSize: 12,

    color: "#777777",

    marginBottom: 4,

    fontWeight: "500",
  },

  orderId: {
    fontSize: 14,

    color: "#222222",

    fontWeight: "700",
  },

  // ==========================================
  // Status
  // ==========================================

  statusBadge: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    paddingHorizontal: 10,

    paddingVertical: 6,

    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,

    fontWeight: "700",
  },

  // ==========================================
  // General Information
  // ==========================================

  infoRow: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 13,
  },

  infoContent: {
    flex: 1,

    marginLeft: 10,
  },

  infoLabel: {
    fontSize: 11,

    color: "#888888",

    marginBottom: 2,

    fontWeight: "500",
  },

  infoValue: {
    fontSize: 14,

    color: "#333333",

    fontWeight: "600",
  },

  // ==========================================
  // Medicines Section
  // ==========================================

  itemsSection: {
    backgroundColor: "#F8FAF8",

    borderRadius: 12,

    padding: 12,

    marginTop: 3,

    marginBottom: 15,
  },

  itemsHeader: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 10,

    paddingBottom: 8,

    borderBottomWidth: 1,

    borderBottomColor: "#E5E7EB",
  },

  itemsTitle: {
    fontSize: 15,

    fontWeight: "700",

    color: "#2E7D32",

    marginLeft: 7,
  },

  medicineRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 9,

    borderBottomWidth: 1,

    borderBottomColor: "#EEEEEE",
  },

  medicineInfo: {
    flex: 1,

    marginRight: 10,
  },

  medicineName: {
    fontSize: 14,

    fontWeight: "600",

    color: "#333333",

    marginBottom: 3,
  },

  medicineQuantity: {
    fontSize: 12,

    color: "#777777",
  },

  medicinePrice: {
    fontSize: 14,

    fontWeight: "700",

    color: "#2E7D32",
  },

  noItemsText: {
    fontSize: 13,

    color: "#888888",

    textAlign: "center",

    paddingVertical: 8,
  },

  // ==========================================
  // Total
  // ==========================================

  totalRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingTop: 5,

    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 16,

    fontWeight: "600",

    color: "#444444",
  },

  totalAmount: {
    fontSize: 21,

    fontWeight: "700",

    color: "#2E7D32",
  },

  // ==========================================
  // Details Button
  // ==========================================

  detailsButton: {
    marginTop: 2,
  },

  // ==========================================
  // Empty Orders
  // ==========================================

  emptyContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 30,

    marginTop: 80,
  },

  emptyTitle: {
    fontSize: 22,

    fontWeight: "700",

    color: "#333333",

    marginTop: 20,

    textAlign: "center",
  },

  emptySubtitle: {
    fontSize: 15,

    color: "#777777",

    textAlign: "center",

    marginTop: 10,

    lineHeight: 22,
  },
});

export default styles;