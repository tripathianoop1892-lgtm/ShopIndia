import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  scrollContainer: {
    paddingBottom: 30,
  },

  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
  },

  welcomeText: {
    marginTop: 6,
    fontSize: 17,
    fontWeight: "500",
    color: "#64748b",
  },

  metricsContainer: {
    paddingHorizontal: 12,
  },

  section: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    padding: 16,

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 16,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  headerText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },

  orderRow: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  orderColumn: {
    flex: 1,
  },

  customerColumn: {
    flex: 1.2,
  },

  statusColumn: {
    flex: 1.2,
    textAlign: "right",
  },

  orderText: {
    fontSize: 14,
    color: "#334155",
  },

  success: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16a34a",
  },

  pending: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f59e0b",
  },

  cancel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ef4444",
  },

  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 14,

    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  stockName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#334155",
  },

  stockQuantity: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ef4444",
  },
});

export default styles;