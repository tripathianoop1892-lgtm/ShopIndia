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
  // Tabs
  // ==========================================

  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  tabButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 8,
  },

  activeTab: {
    backgroundColor: "#2E7D32",
  },

  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333333",
    marginLeft: 6,
    textAlign: "center",
  },

  activeTabText: {
    color: "#FFFFFF",
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
    fontSize: 11,
    color: "#888888",
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
    paddingHorizontal: 11,
    paddingVertical: 6,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  // ==========================================
  // Information
  // ==========================================

  infoRow: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 14,
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

  medicinesSection: {
    backgroundColor: "#F8FAF8",

    borderRadius: 12,

    padding: 12,

    marginTop: 2,
    marginBottom: 15,
  },

  medicinesHeader: {
    flexDirection: "row",
    alignItems: "center",

    paddingBottom: 9,
    marginBottom: 3,

    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  medicinesTitle: {
    fontSize: 15,

    fontWeight: "700",

    color: "#2E7D32",

    marginLeft: 7,
  },

  // ==========================================
  // Medicine Row
  // ==========================================

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

    paddingVertical: 10,
  },

  // ==========================================
  // Total
  // ==========================================

  totalRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingTop: 3,

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
  // View Order Details
  // ==========================================

  detailsButton: {
    minHeight: 44,

    borderRadius: 9,

    backgroundColor: "#2563EB",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 12,

    marginBottom: 12,
  },

  detailsButtonText: {
    color: "#FFFFFF",

    fontSize: 14,

    fontWeight: "700",

    marginLeft: 6,
  },

  // ==========================================
  // Action Buttons
  // ==========================================

  actionRow: {
    flexDirection: "row",

    gap: 10,

    marginTop: 2,
  },

  approveButton: {
    flex: 1,

    minHeight: 44,

    borderRadius: 9,

    backgroundColor: "#16A34A",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 10,
  },

  rejectButton: {
    flex: 1,

    minHeight: 44,

    borderRadius: 9,

    backgroundColor: "#E53935",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 10,
  },

  actionButtonText: {
    color: "#FFFFFF",

    fontSize: 14,

    fontWeight: "700",

    marginLeft: 6,
  },

  processedText: {
    textAlign: "center",

    fontSize: 13,

    color: "#64748B",

    fontWeight: "600",

    paddingVertical: 8,
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

    color: "#777777",

    fontWeight: "500",
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
    fontSize: 21,

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