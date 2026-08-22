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

  bannerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  bannerImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
    marginBottom: 12,
  },

  bannerInfo: {
    marginBottom: 12,
  },

  bannerNumber: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 4,
  },

  bannerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  activeBadge: {
    backgroundColor: "#dcfce7",
  },

  inactiveBadge: {
    backgroundColor: "#fee2e2",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  activeText: {
    color: "#16a34a",
  },

  inactiveText: {
    color: "#dc2626",
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
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

  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 15,
    color: "#9ca3af",
  },
});

export default styles;