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
  // Dashboard Header
  // ==========================================

  dashboardHeader: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  headerContent: {
    flex: 1,
    marginRight: 10,
  },

  dashboardTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#222222",
  },

  dashboardSubtitle: {
    fontSize: 12,
    color: "#777777",
    marginTop: 6,
    lineHeight: 18,
  },

  historyBadge: {
    backgroundColor: "#E8F5E9",
    borderRadius: 20,

    paddingHorizontal: 10,
    paddingVertical: 8,

    flexDirection: "row",
    alignItems: "center",
  },

  historyText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2E7D32",
    marginLeft: 5,
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

    backgroundColor: "#E3F2FD",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  statIconBoxOrange: {
    width: 42,
    height: 42,
    borderRadius: 12,

    backgroundColor: "#FFF3E0",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  statIconBoxGreen: {
    width: 42,
    height: 42,
    borderRadius: 12,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  statIconBoxPurple: {
    width: 42,
    height: 42,
    borderRadius: 12,

    backgroundColor: "#F3E5F5",

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
  // Workflow
  // ==========================================

  workflowContainer: {
    marginTop: 2,
  },

  sectionCard: {
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
    justifyContent: "space-between",
    alignItems: "center",

    paddingBottom: 14,

    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",

    marginBottom: 14,
  },

  sectionHeaderText: {
    flex: 1,
    marginRight: 10,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#777777",
    marginTop: 4,
    lineHeight: 17,
  },

  selectedDistributor: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2E7D32",
    marginTop: 5,
  },

  // ==========================================
  // Search
  // ==========================================

  searchContainer: {
    height: 46,

    borderWidth: 1,
    borderColor: "#E0E0E0",

    borderRadius: 10,

    backgroundColor: "#F9FAF9",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 13,

    marginBottom: 12,
  },

  searchInput: {
    flex: 1,

    fontSize: 14,
    color: "#333333",

    marginLeft: 8,

    paddingVertical: 0,
  },

  // ==========================================
  // Distributor List
  // ==========================================

  distributorItem: {
    minHeight: 68,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#EEEEEE",

    borderRadius: 12,

    paddingHorizontal: 12,
    paddingVertical: 10,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: 10,
  },

  distributorItemActive: {
    backgroundColor: "#F1F8F2",

    borderColor: "#81C784",
  },

  distributorAvatar: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",
  },

  distributorAvatarActive: {
    backgroundColor: "#2E7D32",
  },

  distributorInfo: {
    flex: 1,
    marginLeft: 11,
    marginRight: 8,
  },

  distributorName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333333",
  },

  distributorRole: {
    fontSize: 10,
    fontWeight: "700",
    color: "#10B981",

    marginTop: 4,

    letterSpacing: 0.5,
  },

  // ==========================================
  // Empty Small
  // ==========================================

  emptySmall: {
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  emptySmallText: {
    fontSize: 13,
    color: "#888888",

    textAlign: "center",

    marginTop: 10,
    lineHeight: 19,
  },

  // ==========================================
  // Medicine Card
  // ==========================================

  medicineCard: {
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#EEEEEE",

    borderRadius: 14,

    padding: 12,

    marginBottom: 12,

    elevation: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  medicineImageBox: {
    width: "100%",
    height: 120,

    backgroundColor: "#F8FAF8",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 12,
  },

  medicineImage: {
    width: "80%",
    height: "90%",
  },

  medicineInfo: {
    width: "100%",
  },

  medicineName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222222",

    lineHeight: 21,
  },

  medicineCompany: {
    fontSize: 12,
    color: "#777777",

    marginTop: 4,
  },

  medicineMeta: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 8,
  },

  metaText: {
    fontSize: 11,
    color: "#666666",
  },

  metaDivider: {
    fontSize: 12,
    color: "#AAAAAA",

    marginHorizontal: 7,
  },

  // ==========================================
  // Medicine Price
  // ==========================================

  priceRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 9,
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E7D32",
  },

  mrp: {
    fontSize: 13,
    color: "#999999",

    textDecorationLine: "line-through",

    marginLeft: 9,
  },

  // ==========================================
  // Stock
  // ==========================================

  stockPill: {
    alignSelf: "flex-start",

    flexDirection: "row",
    alignItems: "center",

    borderRadius: 20,

    paddingHorizontal: 9,
    paddingVertical: 6,

    marginTop: 9,
  },

  stockPillLow: {
    backgroundColor: "#FFF3E0",
  },

  stockPillNormal: {
    backgroundColor: "#E8F5E9",
  },

  stockDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    marginRight: 6,
  },

  stockText: {
    fontSize: 11,
    fontWeight: "600",
  },

  stockTextLow: {
    color: "#E65100",
  },

  stockTextNormal: {
    color: "#2E7D32",
  },

  // ==========================================
  // Order Supplies Button
  // ==========================================

  buyButton: {
    minHeight: 45,

    backgroundColor: "#2E7D32",

    borderRadius: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 13,

    paddingHorizontal: 15,
  },

  buyButtonText: {
    color: "#FFFFFF",

    fontSize: 14,
    fontWeight: "700",

    marginLeft: 7,
  },

  // ==========================================
  // Select Distributor State
  // ==========================================

  selectDistributorState: {
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 50,
    paddingHorizontal: 25,
  },

  selectDistributorTitle: {
    fontSize: 18,
    fontWeight: "700",

    color: "#333333",

    marginTop: 14,
  },

  selectDistributorText: {
    fontSize: 13,

    color: "#777777",

    textAlign: "center",

    lineHeight: 20,

    marginTop: 8,
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
    fontSize: 14,

    color: "#777777",

    marginTop: 12,

    fontWeight: "500",
  },
});

export default styles;