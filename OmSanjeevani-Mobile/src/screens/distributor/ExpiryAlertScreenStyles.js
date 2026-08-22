import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  // =========================
  // HEADER
  // =========================

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222222",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 20,
    color: "#777777",
  },

  // =========================
// EXPORT PDF BUTTON
// =========================

exportButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: "#2E7D32",

  marginTop: 14,
  paddingVertical: 12,
  paddingHorizontal: 18,

  borderRadius: 10,

  elevation: 2,

  shadowColor: "#000",

  shadowOffset: {
    width: 0,
    height: 2,
  },

  shadowOpacity: 0.12,

  shadowRadius: 3,
},

exportButtonText: {
  marginLeft: 8,

  fontSize: 15,
  fontWeight: "700",

  color: "#FFFFFF",
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
    fontSize: 14,
    color: "#777777",
  },

  // =========================
  // ALERT CARD
  // =========================

  alertCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    padding: 15,

    marginBottom: 12,

    borderLeftWidth: 4,
    borderLeftColor: "#C2185B",

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.08,

    shadowRadius: 3,
  },

  iconContainer: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "#FCE4EC",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  medicineInfo: {
    flex: 1,
  },

  medicineName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",

    marginBottom: 5,
  },

  expiryText: {
    fontSize: 13,
    color: "#777777",
  },

  daysContainer: {
    alignItems: "flex-end",
    marginLeft: 10,
  },

  daysNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#C2185B",
  },

  daysLabel: {
    fontSize: 11,
    color: "#888888",
    marginTop: 2,
  },

  // =========================
  // EMPTY STATE
  // =========================

  emptyContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 30,

    marginTop: 80,
  },

  emptyTitle: {
    marginTop: 18,

    fontSize: 20,
    fontWeight: "700",

    color: "#333333",

    textAlign: "center",
  },

  emptyText: {
    marginTop: 8,

    fontSize: 14,

    lineHeight: 21,

    color: "#777777",

    textAlign: "center",
  },
});

export default styles;