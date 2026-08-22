import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  // NOTIFICATION CARD
  // ==========================================

  notificationCard: {
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
  // ICON
  // ==========================================

  iconContainer: {
    width: 48,
    height: 48,

    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  // ==========================================
  // NOTIFICATION CONTENT
  // ==========================================

  notificationContent: {
    flex: 1,
    marginRight: 8,
  },

  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 5,
  },

  notificationTitle: {
    flex: 1,

    fontSize: 15,
    fontWeight: "700",
    color: "#333333",

    marginRight: 8,
  },

  notificationDate: {
    fontSize: 10,
    color: "#999999",
  },

  notificationMessage: {
    fontSize: 13,
    color: "#777777",
    lineHeight: 19,
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

    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
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