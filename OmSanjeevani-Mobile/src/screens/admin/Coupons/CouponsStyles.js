import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
  },

  subtitle: {
    fontSize: 13,
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
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    marginBottom: 16,
  },

  listContent: {
    paddingBottom: 30,
  },

  couponCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  couponNumber: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 4,
  },

  couponCode: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    letterSpacing: 1,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  activeBadge: {
    backgroundColor: "#dcfce7",
  },

  expiredBadge: {
    backgroundColor: "#fee2e2",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: 14,
    color: "#6b7280",
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  discountValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16a34a",
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 10,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#2563eb",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },

  editButtonText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "700",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#ef4444",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "700",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fb",
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
    fontSize: 15,
    color: "#9ca3af",
  },

  errorBox: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },

  errorText: {
    color: "#dc2626",
    fontSize: 14,
    textAlign: "center",
  },

  retryButton: {
    marginTop: 12,
    backgroundColor: "#dc2626",
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 7,
  },

  retryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default styles;