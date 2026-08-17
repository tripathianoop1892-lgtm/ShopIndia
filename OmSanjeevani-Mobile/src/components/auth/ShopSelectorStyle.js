import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // =========================
  // TITLE
  // =========================

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginLeft: 8,
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
    marginLeft: 2,
  },

  // =========================
  // SEARCH BOX
  // =========================

  searchBox: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#222",
    paddingVertical: 0,
  },

  // =========================
  // STATUS
  // =========================

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  statusText: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
    marginBottom: 8,
  },

  // =========================
  // SEARCH RESULTS
  // =========================

  resultsContainer: {
    marginTop: 5,
    marginBottom: 10,
  },

  shopCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  shopInfo: {
    flex: 1,
    paddingRight: 10,
  },

  shopNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  shopName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginLeft: 7,
    flexShrink: 1,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  detailText: {
    fontSize: 13,
    color: "#555",
    marginLeft: 7,
    flexShrink: 1,
  },

  shopId: {
    fontSize: 12,
    color: "#777",
    marginTop: 8,
    fontWeight: "600",
  },

  // =========================
  // SELECT BUTTON
  // =========================

  selectButton: {
    backgroundColor: "#008F3C",
    minWidth: 72,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  selectButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  // =========================
  // SELECTED SHOP
  // =========================

  selectedShop: {
    backgroundColor: "#EAF8EF",
    borderWidth: 1,
    borderColor: "#008F3C",
    borderRadius: 14,
    padding: 15,
    marginTop: 8,
    marginBottom: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectedTitle: {
    fontSize: 13,
    color: "#008F3C",
    fontWeight: "600",
    marginBottom: 4,
  },

  selectedName: {
    fontSize: 16,
    color: "#222",
    fontWeight: "700",
    marginBottom: 4,
  },

  selectedId: {
    fontSize: 12,
    color: "#555",
    fontWeight: "600",
  },

  checkCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#008F3C",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});

export default styles;