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
  // Wishlist List
  // ==========================================

  list: {
    padding: 15,
    paddingBottom: 40,
  },

  emptyList: {
    flexGrow: 1,
  },

  // ==========================================
  // Wishlist Card
  // ==========================================

  card: {
    flexDirection: "row",

    backgroundColor: "#FFFFFF",

    borderRadius: 15,

    padding: 15,

    marginBottom: 15,

    alignItems: "flex-start",

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
    width: 85,
    height: 85,

    borderRadius: 10,

    backgroundColor: "#F8F8F8",
  },

  imagePlaceholder: {
    width: 85,
    height: 85,

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

    marginLeft: 14,

    marginRight: 8,
  },

  name: {
    fontSize: 17,

    fontWeight: "700",

    color: "#222222",

    marginBottom: 4,
  },

  company: {
    fontSize: 14,

    color: "#777777",

    marginBottom: 7,
  },

  price: {
    fontSize: 18,

    fontWeight: "700",

    color: "#2E7D32",

    marginBottom: 5,
  },

  // ==========================================
  // Stock
  // ==========================================

  stock: {
    fontSize: 13,

    fontWeight: "600",

    marginBottom: 12,
  },

  // ==========================================
  // Remove Wishlist
  // ==========================================

  removeButton: {
    width: 40,
    height: 40,

    justifyContent: "center",
    alignItems: "center",
  },

  // ==========================================
  // Empty Wishlist
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