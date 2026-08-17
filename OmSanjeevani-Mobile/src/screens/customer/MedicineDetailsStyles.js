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
  // Content
  // ==========================================

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // ==========================================
  // Medicine Image
  // ==========================================

  image: {
    width: "100%",
    height: 250,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    marginBottom: 20,
  },

  imagePlaceholder: {
    width: "100%",
    height: 250,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    marginBottom: 20,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  imagePlaceholderText: {
    fontSize: 60,
  },

  // ==========================================
  // Medicine Name
  // ==========================================

  name: {
    fontSize: 24,

    fontWeight: "700",

    color: "#222222",

    marginBottom: 6,
  },

  company: {
    fontSize: 16,

    color: "#666666",

    marginBottom: 18,
  },

  // ==========================================
  // Type & Strength
  // ==========================================

  infoRow: {
    flexDirection: "row",

    gap: 12,

    marginBottom: 18,
  },

  infoBox: {
    flex: 1,

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    padding: 14,

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  infoLabel: {
    fontSize: 12,

    color: "#777777",

    marginBottom: 5,

    fontWeight: "500",
  },

  infoValue: {
    fontSize: 15,

    color: "#222222",

    fontWeight: "700",
  },

  // ==========================================
  // Price
  // ==========================================

  priceRow: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 8,
  },

  price: {
    fontSize: 28,

    fontWeight: "700",

    color: "#2E7D32",
  },

  mrp: {
    fontSize: 18,

    color: "#999999",

    textDecorationLine: "line-through",

    marginLeft: 12,
  },

  discount: {
    alignSelf: "flex-start",

    backgroundColor: "#E8F5E9",

    color: "#2E7D32",

    fontSize: 13,

    fontWeight: "700",

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 6,

    marginBottom: 10,
  },

  // ==========================================
  // Stock
  // ==========================================

  stock: {
    fontSize: 15,

    fontWeight: "700",

    marginBottom: 20,
  },

  // ==========================================
  // Information Sections
  // ==========================================

  section: {
    backgroundColor: "#FFFFFF",

    borderRadius: 15,

    padding: 16,

    marginBottom: 16,

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

    marginBottom: 8,
  },

  sectionText: {
    fontSize: 15,

    color: "#555555",

    lineHeight: 24,
  },

  // ==========================================
  // Prescription
  // ==========================================

  prescriptionBox: {
    backgroundColor: "#FFF3E0",

    borderWidth: 1,

    borderColor: "#FFB74D",

    borderRadius: 12,

    padding: 15,

    marginBottom: 20,
  },

  prescriptionText: {
    fontSize: 15,

    fontWeight: "700",

    color: "#E65100",
  },

  // ==========================================
  // Empty State
  // ==========================================

  emptyContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 20,
  },

  emptyText: {
    fontSize: 18,

    color: "#777777",

    textAlign: "center",
  },
});

export default styles;