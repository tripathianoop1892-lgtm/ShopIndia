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
  // Cart List
  // ==========================================

  list: {
    padding: 15,
    paddingBottom: 120,
  },

  emptyList: {
    flexGrow: 1,
  },

  // ==========================================
  // Cart Item
  // ==========================================

  cartItem: {
    flexDirection: "row",

    backgroundColor: "#FFFFFF",

    borderRadius: 15,

    padding: 15,

    marginBottom: 15,

    alignItems: "center",

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
  // Medicine Image
  // ==========================================

  image: {
    width: 80,
    height: 80,

    borderRadius: 10,

    backgroundColor: "#F8F8F8",
  },

  imagePlaceholder: {
    width: 80,
    height: 80,

    borderRadius: 10,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",
  },

  // ==========================================
  // Medicine Details
  // ==========================================

  details: {
    flex: 1,

    marginLeft: 15,

    marginRight: 10,
  },

  name: {
    fontSize: 17,

    fontWeight: "700",

    color: "#222222",
  },

  company: {
    fontSize: 14,

    color: "#777777",

    marginTop: 4,
  },

  price: {
    fontSize: 18,

    fontWeight: "700",

    color: "#2E7D32",

    marginTop: 8,
  },

  // ==========================================
  // Quantity
  // ==========================================

  quantityRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 12,
  },

  qtyButton: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",
  },

  quantity: {
    fontSize: 16,

    fontWeight: "700",

    marginHorizontal: 18,

    color: "#333333",
  },

  // ==========================================
  // Delete
  // ==========================================

  deleteButton: {
    width: 40,
    height: 40,

    justifyContent: "center",
    alignItems: "center",
  },

  // ==========================================
  // Bottom Checkout
  // ==========================================

  bottomContainer: {
    backgroundColor: "#FFFFFF",

    padding: 20,

    borderTopLeftRadius: 20,

    borderTopRightRadius: 20,

    elevation: 10,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: -2,
    },

    shadowOpacity: 0.1,

    shadowRadius: 4,
  },

  totalRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 18,
  },

  totalLabel: {
    fontSize: 18,

    fontWeight: "600",

    color: "#444444",
  },

  totalAmount: {
    fontSize: 24,

    fontWeight: "700",

    color: "#2E7D32",
  },

  // ==========================================
  // Empty Cart
  // ==========================================

  emptyContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 100,

    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 22,

    fontWeight: "700",

    color: "#333333",

    marginTop: 20,
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