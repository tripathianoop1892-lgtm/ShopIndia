import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1f2937",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  addButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  searchInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
    color: "#1f2937",
    marginBottom: 16,
  },

  listContainer: {
    paddingBottom: 30,
  },

  medicineCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eef0f4",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  medicineInfo: {
    flex: 1,
    paddingRight: 10,
  },

  medicineName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },

  company: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  availableBadge: {
    backgroundColor: "#dcfce7",
  },

  lowStockBadge: {
    backgroundColor: "#fee2e2",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  availableText: {
    color: "#16a34a",
  },

  lowStockText: {
    color: "#dc2626",
  },

  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 12,
  },

  detailItem: {
    flex: 1,
  },

  label: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 5,
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },

  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#16a34a",
  },

  idContainer: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },

  idText: {
    fontSize: 11,
    color: "#9ca3af",
  },

  actionContainer: {
    flexDirection: "row",
    marginTop: 14,
    gap: 10,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 8,
  },

  editButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#fee2e2",
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 8,
  },

  deleteButtonText: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "700",
  },

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

  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
  },
});

export default styles;