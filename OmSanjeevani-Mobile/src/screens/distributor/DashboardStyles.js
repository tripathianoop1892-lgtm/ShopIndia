import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  // =========================
  // MAIN CONTAINER
  // =========================

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  // =========================
  // SCROLL CONTENT
  // =========================

  content: {
    padding: 15,
    paddingBottom: 40,
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
    marginTop: 12,
    fontSize: 15,
    color: "#666666",
  },

  // =========================
  // WELCOME SECTION
  // =========================

  welcomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    paddingVertical: 12,

    borderRadius: 14,

    marginBottom: 20,

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 4,
  },

  welcomeText: {
    fontSize: 13,
    color: "#777777",
    marginBottom: 4,
  },

  storeName: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222222",
  },

  // =========================
  // NOTIFICATION ICON
  // =========================

  iconButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#E8F5E9",

    position: "relative",
  },

  notificationBadge: {
    position: "absolute",

    top: -4,
    right: -4,

    minWidth: 19,
    height: 19,

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#E53935",

    paddingHorizontal: 4,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  // =========================
  // SECTION TITLE
  // =========================

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222222",

    marginBottom: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 25,
    marginBottom: 10,
  },

  viewAll: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2E7D32",
  },

  // =========================
  // STATS GRID
  // =========================

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48%",

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    padding: 15,

    marginBottom: 14,

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.06,

    shadowRadius: 4,
  },

  statNumber: {
    fontSize: 25,
    fontWeight: "700",

    color: "#222222",

    marginTop: 10,
  },

  valueNumber: {
    fontSize: 18,
    fontWeight: "700",

    color: "#222222",

    marginTop: 10,
  },

  statLabel: {
    fontSize: 12,
    color: "#777777",

    marginTop: 4,
  },

  // =========================
  // CARD COLORS
  // =========================

  totalCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#1565C0",
  },

  inStockCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#2E7D32",
  },

  lowStockCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#F57C00",
  },

  outStockCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#D32F2F",
  },

  expiryCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#C2185B",
  },

  valueCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#6A1B9A",
  },

  // =========================
  // QUICK ACTIONS
  // =========================

  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 5,
  },

  actionButton: {
    width: "31%",

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    paddingVertical: 16,

    alignItems: "center",

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.06,

    shadowRadius: 4,
  },

  actionText: {
    fontSize: 11,

    fontWeight: "600",

    color: "#333333",

    textAlign: "center",

    marginTop: 7,
  },

  // =========================
  // EMPTY CARD
  // =========================

  emptyCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    paddingVertical: 25,

    paddingHorizontal: 20,

    alignItems: "center",

    elevation: 1,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.05,

    shadowRadius: 3,
  },

  emptyText: {
    fontSize: 13,

    color: "#777777",

    textAlign: "center",

    marginTop: 8,
  },

  // =========================
  // MEDICINE CARD
  // =========================

  medicineCard: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#FFFFFF",

    padding: 14,

    borderRadius: 14,

    marginBottom: 10,

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.05,

    shadowRadius: 3,
  },

  medicineIcon: {
    width: 46,
    height: 46,

    borderRadius: 23,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F5F7FA",

    marginRight: 12,
  },

  medicineInfo: {
    flex: 1,
  },

  medicineName: {
    fontSize: 14,

    fontWeight: "700",

    color: "#333333",

    marginBottom: 4,
  },

  medicineCompany: {
    fontSize: 12,

    color: "#777777",
  },

  // =========================
  // STOCK
  // =========================

  stockContainer: {
    alignItems: "center",
  },

  lowStockText: {
    fontSize: 18,

    fontWeight: "700",

    color: "#F57C00",
  },

  stockLabel: {
    fontSize: 11,

    color: "#888888",

    marginTop: 2,
  },

  // =========================
  // EXPIRY
  // =========================

  expiryDateContainer: {
    alignItems: "flex-end",
  },

  expiryDate: {
    fontSize: 11,

    fontWeight: "600",

    color: "#C2185B",
  },

  // =========================
  // MEDICINE PRICE
  // =========================

  medicinePrice: {
    fontSize: 14,

    fontWeight: "700",

    color: "#2E7D32",

    textAlign: "right",
  },

});

export default styles;