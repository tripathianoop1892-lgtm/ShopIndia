import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // Main Container
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 15,
    paddingBottom: 40,
  },

  // ==========================================
  // Marketplace Header
  // ==========================================

  marketplaceHeader: {
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

  dashboardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222222",
  },

  shopIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  shopIdText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2E7D32",
    marginLeft: 6,
  },

  // ==========================================
  // Statistics
  // ==========================================

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  statCard: {
    width: "48%",
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
    shadowOpacity: 0.07,
    shadowRadius: 3,
  },

  statIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  statTitle: {
    fontSize: 12,
    color: "#777777",
    fontWeight: "600",
    marginBottom: 5,
  },

  statValue: {
    fontSize: 21,
    color: "#222222",
    fontWeight: "700",
  },

  statSubtitle: {
    fontSize: 11,
    color: "#999999",
    marginTop: 4,
  },

  // ==========================================
  // Procurement Banner
  // ==========================================

  promoBanner: {
    backgroundColor: "#E8F5E9",
    borderRadius: 16,
    padding: 16,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#C8E6C9",
  },

  promoContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  promoBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 4,
  },

  promoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B5E20",
  },

  promoSubtitle: {
    fontSize: 11,
    color: "#557A58",
    marginTop: 4,
    lineHeight: 16,
  },

  historyButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  historyButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  // ==========================================
  // Loading
  // ==========================================

  loadingContainer: {
    minHeight: 250,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    fontSize: 14,
    color: "#777777",
    marginTop: 12,
  },

  // ==========================================
  // Catalog Header
  // ==========================================

  catalogHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 12,
  },

  catalogTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222222",
  },

  catalogCount: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2E7D32",
  },

  // ==========================================
  // Medicine Card
  // ==========================================

  medicineCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,

    marginBottom: 15,

    overflow: "hidden",

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

  imageContainer: {
    height: 170,
    backgroundColor: "#F8FAF8",

    justifyContent: "center",
    alignItems: "center",
  },

  medicineImage: {
    width: "85%",
    height: "90%",
  },

  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    fontSize: 12,
    color: "#999999",
    marginTop: 6,
  },

  // ==========================================
  // Medicine Body
  // ==========================================

  medicineBody: {
    padding: 15,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  medicineName: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
    lineHeight: 22,
  },

  stockDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
  },

  company: {
    fontSize: 13,
    color: "#777777",
    marginTop: 5,
  },

  // ==========================================
  // Specifications
  // ==========================================

  specifications: {
    backgroundColor: "#F8FAF8",
    borderRadius: 10,

    padding: 10,
    marginTop: 12,
  },

  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 4,
  },

  specLabel: {
    fontSize: 12,
    color: "#888888",
  },

  specValue: {
    fontSize: 12,
    color: "#444444",
    fontWeight: "600",
    textAlign: "right",
    maxWidth: "60%",
  },

  // ==========================================
  // Price
  // ==========================================

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 14,
  },

  mrpText: {
    fontSize: 12,
    color: "#777777",
  },

  mrpStrike: {
    textDecorationLine: "line-through",
    color: "#999999",
  },

  priceText: {
    fontSize: 13,
    color: "#555555",
    marginTop: 3,
  },

  priceValue: {
    fontSize: 21,
    fontWeight: "700",
    color: "#2E7D32",
  },

  discountBadge: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,

    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  discountText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2E7D32",
  },

  // ==========================================
  // Add To Basket
  // ==========================================

  addButton: {
    minHeight: 46,

    marginHorizontal: 15,
    marginBottom: 15,

    borderRadius: 10,

    backgroundColor: "#2E7D32",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 15,
  },

  addButtonActive: {
    backgroundColor: "#1565C0",
  },

  addButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 7,
  },

  // ==========================================
  // Empty State
  // ==========================================

  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,

    paddingVertical: 50,
    paddingHorizontal: 25,

    alignItems: "center",
    justifyContent: "center",

    marginTop: 10,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#333333",
    marginTop: 15,
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
  },
    // ==========================================
  // Quantity Selector
  // ==========================================

  quantityContainer: {
    marginTop: 12,
    marginBottom: 10,
  },

  quantityLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 6,
  },

  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F7F9F8",

    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,

    minHeight: 42,
  },

  quantityButton: {
    width: 42,
    height: 42,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#E8F5E9",
    borderRadius: 8,
  },

  quantityValue: {
    minWidth: 50,

    textAlign: "center",

    fontSize: 16,
    fontWeight: "700",

    color: "#222222",
  },
});

export default styles;