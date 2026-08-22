import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  // ==========================================
  // MAIN
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  list: {
    padding: 15,
    paddingBottom: 30,
  },

  emptyList: {
    flexGrow: 1,
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
    color: "#666666",
  },

  // ==========================================
  // ORDER CARD
  // ==========================================

  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  // ==========================================
  // ORDER HEADER
  // ==========================================

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  orderIdLabel: {
    fontSize: 11,
    color: "#888888",
    marginBottom: 3,
  },

  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222222",
    maxWidth: 190,
  },

  // ==========================================
  // STATUS
  // ==========================================

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  // ==========================================
  // INFO ROW
  // ==========================================

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  infoContent: {
    marginLeft: 10,
    flex: 1,
  },

  infoLabel: {
    fontSize: 11,
    color: "#888888",
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  // ==========================================
  // MEDICINES
  // ==========================================

  medicinesSection: {
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 14,
    marginTop: 4,
  },

  medicinesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  medicinesTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333333",
    marginLeft: 8,
  },

  medicineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#F8FAF8",

    padding: 10,
    borderRadius: 8,

    marginBottom: 7,
  },

  medicineInfo: {
    flex: 1,
    paddingRight: 10,
  },

  medicineName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333333",
  },

  medicineQuantity: {
    fontSize: 11,
    color: "#777777",
    marginTop: 3,
  },

  medicinePrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2E7D32",
  },

  noItemsText: {
    fontSize: 13,
    color: "#888888",
    textAlign: "center",
    paddingVertical: 12,
  },

  // ==========================================
  // TOTAL
  // ==========================================

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",

    marginTop: 8,
    paddingTop: 14,
    marginBottom: 14,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555555",
  },

  totalAmount: {
    fontSize: 19,
    fontWeight: "700",
    color: "#2E7D32",
  },

  // ==========================================
  // VIEW DETAILS BUTTON
  // ==========================================

  detailsButton: {
    height: 46,

    backgroundColor: "#2E7D32",

    borderRadius: 10,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 12,
  },

  detailsButtonText: {
    marginLeft: 7,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  // ==========================================
  // APPROVE / REJECT
  // ==========================================

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  approveButton: {
    flex: 1,
    height: 46,

    backgroundColor: "#2E7D32",

    borderRadius: 10,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginRight: 6,
  },

  rejectButton: {
    flex: 1,
    height: 46,

    backgroundColor: "#E53935",

    borderRadius: 10,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginLeft: 6,
  },

  actionButtonText: {
    marginLeft: 6,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  processedText: {
    textAlign: "center",

    fontSize: 13,
    fontWeight: "600",

    color: "#777777",

    paddingTop: 4,
  },

  // ==========================================
  // EMPTY STATE
  // ==========================================

  emptyContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 15,

    fontSize: 18,
    fontWeight: "700",

    color: "#333333",
  },

  emptySubtitle: {
    marginTop: 7,

    fontSize: 13,

    color: "#888888",

    textAlign: "center",
    lineHeight: 20,
  },

});

export default styles;