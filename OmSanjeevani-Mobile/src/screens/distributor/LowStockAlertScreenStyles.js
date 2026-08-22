import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // MAIN CONTAINER
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  // ==========================================
  // LIST
  // ==========================================

  listContent: {
    padding: 16,
    paddingBottom: 40,
  },

  emptyListContent: {
    flexGrow: 1,
    padding: 16,
  },

  // ==========================================
  // HEADER
  // ==========================================

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFF8E1",

    borderWidth: 1,
    borderColor: "#FFE0A3",

    borderRadius: 14,

    padding: 14,

    marginBottom: 16,
  },

  headerIcon: {
    width: 48,
    height: 48,

    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FFF3CD",

    marginRight: 12,
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333333",

    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    color: "#777777",
  },

  // ==========================================
  // MEDICINE CARD
  // ==========================================

  medicineCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    padding: 14,

    marginBottom: 12,

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.08,

    shadowRadius: 3,
  },

  // ==========================================
  // SERIAL NUMBER
  // ==========================================

  serialContainer: {
    width: 38,
    height: 38,

    borderRadius: 19,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F5F7FA",

    marginRight: 12,
  },

  serialText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#555555",
  },

  // ==========================================
  // MEDICINE INFO
  // ==========================================

  medicineInfo: {
    flex: 1,
    marginRight: 10,
  },

  medicineName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333333",

    marginBottom: 5,
  },

  medicineType: {
    fontSize: 12,
    color: "#888888",
  },

  // ==========================================
  // STOCK INFO
  // ==========================================

  stockContainer: {
    minWidth: 70,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFF8E1",

    borderRadius: 12,

    paddingVertical: 8,
    paddingHorizontal: 6,
  },

  stockNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F57C00",

    marginTop: 2,
  },

  stockLabel: {
    fontSize: 9,
    color: "#888888",

    marginTop: 2,

    textAlign: "center",
  },

  // ==========================================
  // LOADING
  // ==========================================

  loadingContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,

    fontSize: 14,
    color: "#777777",
  },

  // ==========================================
  // EMPTY STATE
  // ==========================================

  emptyContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 18,

    fontSize: 21,
    fontWeight: "700",
    color: "#333333",

    textAlign: "center",
  },

  emptySubtitle: {
    marginTop: 8,

    fontSize: 14,
    color: "#888888",

    textAlign: "center",
    lineHeight: 21,
  },
});

export default styles;