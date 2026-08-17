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
  // Main List
  // ==========================================

  list: {
    padding: 15,
    paddingBottom: 40,
  },

  // ==========================================
  // Customer / Shop / Address / Payment
  // ==========================================

  section: {
    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    padding: 16,

    marginBottom: 14,

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.08,

    shadowRadius: 3,
  },

  sectionTitle: {
    fontSize: 17,

    fontWeight: "700",

    color: "#2E7D32",

    marginBottom: 10,
  },

  infoText: {
    fontSize: 14,

    color: "#555555",

    lineHeight: 22,

    marginBottom: 3,
  },

  // ==========================================
  // Order Summary Title
  // ==========================================

  orderTitle: {
    fontSize: 20,

    fontWeight: "700",

    color: "#222222",

    marginTop: 5,

    marginBottom: 12,
  },

  // ==========================================
  // Order Item
  // ==========================================

  orderItem: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    padding: 14,

    marginBottom: 10,

    borderWidth: 1,

    borderColor: "#E8E8E8",
  },

  itemInfo: {
    flex: 1,

    marginRight: 12,
  },

  itemName: {
    fontSize: 15,

    fontWeight: "700",

    color: "#222222",

    marginBottom: 5,
  },

  itemDetails: {
    fontSize: 13,

    color: "#777777",
  },

  itemPrice: {
    fontSize: 15,

    fontWeight: "700",

    color: "#2E7D32",
  },

  // ==========================================
  // Order Summary
  // ==========================================

  summaryContainer: {
    backgroundColor: "#FFFFFF",

    borderRadius: 15,

    padding: 18,

    marginTop: 8,

    marginBottom: 20,

    elevation: 3,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,

      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 4,
  },

  summaryRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 8,
  },

  totalText: {
    fontSize: 18,

    fontWeight: "700",

    color: "#222222",
  },

  totalAmount: {
    fontSize: 22,

    fontWeight: "700",

    color: "#2E7D32",
  },

  // ==========================================
  // Empty Checkout
  // ==========================================

  emptyContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 30,

    marginTop: 80,
  },

  emptyText: {
    fontSize: 18,

    fontWeight: "600",

    color: "#777777",

    textAlign: "center",
  },
});

export default styles;