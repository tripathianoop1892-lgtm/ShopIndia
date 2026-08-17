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
    paddingBottom: 45,
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

  headerTextContainer: {
    flex: 1,
    marginRight: 12,
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

  refreshButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#C8E6C9",
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

  statIconGreen: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  statIconBlue: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: "#E3F2FD",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  statIconOrange: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: "#FFF3E0",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  statIconRed: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: "#FFEBEE",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  statIconPurple: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: "#F3E5F5",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  statIconTeal: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: "#E0F2F1",

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
    fontSize: 22,
    color: "#222222",

    fontWeight: "700",
  },

  statValueSmall: {
    fontSize: 18,
    color: "#222222",

    fontWeight: "700",
  },

  statSubtitle: {
    fontSize: 11,
    color: "#999999",

    marginTop: 4,
  },

  // ==========================================
  // Section Card
  // ==========================================

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

    alignItems: "center",

    justifyContent: "space-between",

    paddingBottom: 13,

    marginBottom: 12,

    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",

    flex: 1,
  },

  sectionTitle: {
    fontSize: 17,

    fontWeight: "700",

    color: "#222222",

    marginLeft: 7,
  },

  sectionCount: {
    minWidth: 28,
    height: 28,

    paddingHorizontal: 8,

    borderRadius: 14,

    backgroundColor: "#E8F5E9",

    color: "#2E7D32",

    textAlign: "center",

    textAlignVertical: "center",

    fontSize: 12,

    fontWeight: "700",

    overflow: "hidden",
  },

  // ==========================================
  // Alert Count
  // ==========================================

  alertCountBadge: {
    minWidth: 30,
    height: 30,

    paddingHorizontal: 8,

    borderRadius: 15,

    backgroundColor: "#FFF3E0",

    justifyContent: "center",
    alignItems: "center",
  },

  alertCountText: {
    fontSize: 12,

    fontWeight: "700",

    color: "#E65100",
  },

  // ==========================================
  // Alert Item
  // ==========================================

  alertItem: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#FAFAFA",

    borderRadius: 12,

    padding: 12,

    marginBottom: 10,
  },

  alertIconOrange: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: "#FFF3E0",

    justifyContent: "center",
    alignItems: "center",
  },

  alertIconRed: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: "#FFEBEE",

    justifyContent: "center",
    alignItems: "center",
  },

  alertContent: {
    flex: 1,

    marginLeft: 11,
  },

  alertTitle: {
    fontSize: 14,

    fontWeight: "700",

    color: "#333333",

    marginBottom: 3,
  },

  alertText: {
    fontSize: 12,

    color: "#777777",

    lineHeight: 18,
  },

  noAlertContainer: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#E8F5E9",

    borderRadius: 11,

    padding: 13,
  },

  noAlertText: {
    flex: 1,

    fontSize: 13,

    color: "#2E7D32",

    fontWeight: "600",

    marginLeft: 8,
  },

  // ==========================================
  // Medicine Card
  // ==========================================

  medicineCard: {
    backgroundColor: "#FAFAFA",

    borderRadius: 12,

    padding: 13,

    marginBottom: 10,

    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  medicineTopRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  medicineIcon: {
    width: 43,
    height: 43,

    borderRadius: 11,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",
  },

  medicineInfo: {
    flex: 1,

    marginLeft: 10,

    marginRight: 8,
  },

  medicineName: {
    fontSize: 14,

    fontWeight: "700",

    color: "#333333",

    lineHeight: 19,
  },

  medicineCompany: {
    fontSize: 11,

    color: "#888888",

    marginTop: 3,
  },

  // ==========================================
  // Stock Badge
  // ==========================================

  stockBadge: {
    borderRadius: 15,

    paddingHorizontal: 9,

    paddingVertical: 6,
  },

  stockBadgeGood: {
    backgroundColor: "#E8F5E9",
  },

  stockBadgeLow: {
    backgroundColor: "#FFF3E0",
  },

  stockBadgeOut: {
    backgroundColor: "#FFEBEE",
  },

  stockBadgeText: {
    fontSize: 10,

    fontWeight: "700",
  },

  // ==========================================
  // Medicine Details
  // ==========================================

  medicineDetails: {
    flexDirection: "row",

    justifyContent: "space-between",

    backgroundColor: "#FFFFFF",

    borderRadius: 9,

    padding: 10,

    marginTop: 12,
  },

  detailItem: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 10,

    color: "#999999",

    marginBottom: 3,
  },

  detailValue: {
    fontSize: 12,

    fontWeight: "700",

    color: "#444444",
  },

  // ==========================================
  // Empty Section
  // ==========================================

  emptySection: {
    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 30,
  },

  emptySectionText: {
    fontSize: 13,

    color: "#777777",

    marginTop: 9,

    textAlign: "center",
  },

  // ==========================================
  // Manage Inventory
  // ==========================================

  manageButton: {
    minHeight: 48,

    backgroundColor: "#2E7D32",

    borderRadius: 11,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 15,

    marginBottom: 10,
  },

  manageButtonText: {
    color: "#FFFFFF",

    fontSize: 14,

    fontWeight: "700",

    marginHorizontal: 9,
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