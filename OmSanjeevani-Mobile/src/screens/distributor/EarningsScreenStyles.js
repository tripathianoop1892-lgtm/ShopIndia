import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 15,
    paddingBottom: 40,
  },

  // =========================
  // SUMMARY CARDS
  // =========================

  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  summaryCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  totalCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#2E7D32",
  },

  pendingCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#F57C00",
  },

  summaryLabel: {
    fontSize: 12,
    color: "#777777",
    marginBottom: 8,
  },

  summaryAmount: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222222",
  },

  // =========================
  // SECTION
  // =========================

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222222",
    marginLeft: 8,
  },

  // =========================
  // EARNING CARD
  // =========================

  earningCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },

  earningHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingBottom: 10,
    marginBottom: 10,

    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333333",
  },

  dateText: {
    fontSize: 11,
    color: "#888888",
    marginTop: 3,
  },

  earningAmount: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2E7D32",
  },

  // =========================
  // SHOP INFO
  // =========================

  shopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  shopInfo: {
    flex: 1,
    marginLeft: 10,
  },

  shopName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  medicineCount: {
    fontSize: 12,
    color: "#777777",
    marginTop: 3,
  },

  // =========================
  // STATUS
  // =========================

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  // =========================
  // EMPTY STATE
  // =========================

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 60,
    paddingHorizontal: 25,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",

    marginTop: 15,
  },

  emptyText: {
    fontSize: 13,
    color: "#777777",

    textAlign: "center",

    marginTop: 7,
    lineHeight: 20,
  },

  // =========================
  // LOADING
  // =========================

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#777777",
  },
});

export default styles;