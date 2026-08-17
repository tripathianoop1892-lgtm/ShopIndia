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
  // Scroll Content
  // ==========================================

  content: {
    padding: 15,
    paddingBottom: 40,
  },

  // ==========================================
  // Order Information Card
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

  orderHeader: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingBottom: 15,

    marginBottom: 15,

    borderBottomWidth: 1,

    borderBottomColor: "#EEEEEE",
  },

  // ==========================================
  // Order ID
  // ==========================================

  label: {
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
  // Status Badge
  // ==========================================

  statusBadge: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 11,

    paddingVertical: 6,

    borderRadius: 20,

    gap: 6,
  },

  statusText: {
    fontSize: 12,

    fontWeight: "700",
  },

  // ==========================================
  // Information Row
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

  section: {
    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 16,

    marginBottom: 15,

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.08,

    shadowRadius: 3,
  },

  sectionHeader: {
    flexDirection: "row",

    alignItems: "center",

    paddingBottom: 12,

    marginBottom: 4,

    borderBottomWidth: 1,

    borderBottomColor: "#EEEEEE",
  },

  sectionTitle: {
    fontSize: 17,

    fontWeight: "700",

    color: "#2E7D32",

    marginLeft: 8,
  },

  // ==========================================
  // Medicine Row
  // ==========================================

  medicineRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 12,

    borderBottomWidth: 1,

    borderBottomColor: "#F0F0F0",
  },

  medicineInfo: {
    flex: 1,

    marginRight: 12,
  },

  medicineName: {
    fontSize: 15,

    fontWeight: "600",

    color: "#333333",

    marginBottom: 5,
  },

  medicineDetails: {
    fontSize: 13,

    color: "#777777",
  },

  medicineTotal: {
    fontSize: 15,

    fontWeight: "700",

    color: "#2E7D32",
  },

  noItemsText: {
    fontSize: 13,

    color: "#888888",

    textAlign: "center",

    paddingVertical: 15,
  },

  // ==========================================
  // Order Summary
  // ==========================================

  summaryCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 18,

    marginBottom: 15,

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.08,

    shadowRadius: 3,
  },

  summaryTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#222222",

    marginBottom: 12,
  },

  summaryRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 8,
  },

  summaryLabel: {
    fontSize: 14,

    color: "#666666",
  },

  summaryValue: {
    fontSize: 14,

    color: "#333333",

    fontWeight: "600",

    textAlign: "right",

    flexShrink: 1,

    marginLeft: 15,
  },

  divider: {
    height: 1,

    backgroundColor: "#E5E5E5",

    marginVertical: 8,
  },

  // ==========================================
  // Total
  // ==========================================

  totalRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingTop: 8,
  },

  totalLabel: {
    fontSize: 18,

    fontWeight: "700",

    color: "#222222",
  },

  totalAmount: {
    fontSize: 23,

    fontWeight: "700",

    color: "#2E7D32",
  },

  // ==========================================
  // Current Status Card
  // ==========================================

  statusCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 16,

    marginBottom: 20,

    flexDirection: "row",

    alignItems: "center",

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,

      height: 1,
    },

    shadowOpacity: 0.08,

    shadowRadius: 3,
  },

  statusContent: {
    flex: 1,

    marginLeft: 10,
  },

  statusCardTitle: {
    fontSize: 12,

    color: "#888888",

    marginBottom: 4,

    fontWeight: "500",
  },

  statusCardValue: {
    fontSize: 16,

    fontWeight: "700",
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