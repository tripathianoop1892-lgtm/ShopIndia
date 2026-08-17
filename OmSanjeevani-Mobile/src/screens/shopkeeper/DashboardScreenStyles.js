import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // MAIN CONTAINER
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7F6",
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  menuButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
  },

  headerInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#222222",
  },

  subtitle: {
    fontSize: 12,
    color: "#777777",
    lineHeight: 17,
    marginTop: 4,
  },

  orderBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#EAF7EE",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },

  orderBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#008C3A",
    marginLeft: 4,
  },

  // ==========================================
  // STATS
  // ==========================================

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
    paddingBottom: 5,
  },

  statCard: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,

    elevation: 2,
  },

  statHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  statLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: "600",
    color: "#777777",
    lineHeight: 16,
    marginRight: 5,
  },

  statValue: {
    fontSize: 23,
    fontWeight: "900",
    color: "#222222",
    marginTop: 10,
  },

  statUnit: {
    fontSize: 11,
    color: "#999999",
    marginTop: 3,
  },

  // ==========================================
  // WORKFLOW
  // ==========================================

  workflowContainer: {
    paddingHorizontal: 16,
  },

  distributorSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    marginBottom: 15,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  medicineSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    marginBottom: 15,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#222222",
    marginBottom: 12,
  },

  selectedDistributor: {
    fontSize: 13,
    fontWeight: "600",
    color: "#008C3A",
    marginTop: -5,
    marginBottom: 12,
  },

  // ==========================================
  // SEARCH
  // ==========================================

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7F6",
    borderWidth: 1,
    borderColor: "#E1E5E2",
    borderRadius: 12,
    minHeight: 46,
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#222222",
    marginLeft: 9,
    paddingVertical: 8,
  },

  // ==========================================
  // DISTRIBUTOR
  // ==========================================

  distributorItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 13,
    padding: 12,
    marginBottom: 10,
  },

  activeDistributorItem: {
    borderColor: "#008C3A",
    backgroundColor: "#F0FAF3",
  },

  distributorIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
  },

  activeDistributorIcon: {
    backgroundColor: "#D9F2E1",
  },

  distributorInfo: {
    flex: 1,
    marginLeft: 11,
    marginRight: 8,
  },

  distributorName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
  },

  distributorRole: {
    fontSize: 9,
    fontWeight: "800",
    color: "#008C3A",
    letterSpacing: 0.5,
    marginTop: 4,
  },

  // ==========================================
  // MEDICINE CARD
  // ==========================================

  medicineCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 15,
    padding: 13,
    marginBottom: 12,
  },

  medicineIcon: {
    width: 62,
    height: 62,
    borderRadius: 14,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
  },

  medicineInfo: {
    flex: 1,
    marginLeft: 12,
  },

  medicineName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#222222",
  },

  companyText: {
    fontSize: 11,
    color: "#777777",
    marginTop: 3,
  },

  tagsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  tag: {
    backgroundColor: "#F2F5F3",
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,
    marginRight: 6,
  },

  tagText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#666666",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  price: {
    fontSize: 18,
    fontWeight: "900",
    color: "#008C3A",
  },

  mrp: {
    fontSize: 11,
    color: "#999999",
    textDecorationLine: "line-through",
    marginLeft: 7,
  },

  stockPill: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: 7,
  },

  normalStockPill: {
    backgroundColor: "#EAF7EE",
  },

  lowStockPill: {
    backgroundColor: "#FFF2E2",
  },

  stockText: {
    fontSize: 10,
    fontWeight: "700",
  },

  normalStockText: {
    color: "#008C3A",
  },

  lowStockText: {
    color: "#E67E00",
  },

  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#008C3A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },

  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 6,
  },

  // ==========================================
  // EMPTY STATES
  // ==========================================

  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAF9",
    borderRadius: 13,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  emptyText: {
    fontSize: 13,
    color: "#888888",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 19,
  },

  selectionState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 45,
    paddingHorizontal: 20,
  },

  selectionIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  selectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#222222",
    textAlign: "center",
  },

  selectionText: {
    fontSize: 13,
    color: "#888888",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
  },

  // ==========================================
  // LOADING
  // ==========================================

  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F7F6",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    fontSize: 14,
    color: "#777777",
    marginTop: 12,
  },

  // ==========================================
  // BOTTOM SPACE
  // ==========================================

  bottomSpace: {
    height: 30,
  },
});

export default styles;