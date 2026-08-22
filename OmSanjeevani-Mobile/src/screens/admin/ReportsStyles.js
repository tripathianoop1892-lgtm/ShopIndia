import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  listContainer: {
    paddingBottom: 30,
  },

  /* ================= HEADER ================= */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
  },

  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },

  refreshButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },

  refreshButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },

  headerButtons: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
},

exportButton: {
  backgroundColor: "#16a34a",
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 8,
},

exportButtonText: {
  color: "#ffffff",
  fontSize: 13,
  fontWeight: "700",
},

  /* ================= SECTIONS ================= */

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 12,
    marginTop: 8,
  },

  /* ================= REPORT CARDS ================= */

  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  reportCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderTopWidth: 5,
    borderWidth: 1,
    borderColor: "#eef0f4",
  },

  cardTitle: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
  },

  cardValue: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1f2937",
  },

  /* Card Colors */

  greenCard: {
    borderTopColor: "#16a34a",
  },

  blueCard: {
    borderTopColor: "#2563eb",
  },

  purpleCard: {
    borderTopColor: "#7c3aed",
  },

  orangeCard: {
    borderTopColor: "#f59e0b",
  },

  redCard: {
    borderTopColor: "#ef4444",
  },

  cyanCard: {
    borderTopColor: "#06b6d4",
  },

  tealCard: {
    borderTopColor: "#14b8a6",
  },

  pinkCard: {
    borderTopColor: "#e11d48",
  },

  /* ================= SALES SUMMARY ================= */

  salesCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eef0f4",
  },

  salesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    marginBottom: 12,
  },

  salesDate: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f2937",
  },

  successBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  successText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16a34a",
  },

  salesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  salesLabel: {
    fontSize: 13,
    color: "#6b7280",
  },

  salesValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  netRevenue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#16a34a",
  },

  /* ================= INVENTORY ================= */

  inventoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  inventoryCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eef0f4",
  },

  inventoryTitle: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },

  inventoryValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
  },

  /* ================= LOADING ================= */

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#6b7280",
  },

  /* ================= EMPTY ================= */

  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 15,
    color: "#9ca3af",
  },
});

export default styles;