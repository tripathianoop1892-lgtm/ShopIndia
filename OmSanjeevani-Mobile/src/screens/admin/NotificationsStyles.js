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

  sendButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },

  sendButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  searchInput: {
    height: 48,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#1f2937",
    marginBottom: 16,
  },

  listContainer: {
    paddingBottom: 30,
  },

  notificationCard: {
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
  },

  notificationInfo: {
    flex: 1,
    paddingRight: 10,
  },

  notificationTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f2937",
  },

  receiver: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 5,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  sentBadge: {
    backgroundColor: "#dcfce7",
  },

  pendingBadge: {
    backgroundColor: "#fef3c7",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  sentText: {
    color: "#16a34a",
  },

  pendingText: {
    color: "#d97706",
  },

  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },

  dateLabel: {
    fontSize: 13,
    color: "#6b7280",
  },

  dateText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },

  actionContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  viewButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 8,
  },

  viewButtonText: {
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

  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
  },

  /* ============ MODAL ============ */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 22,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 20,
  },

  modalLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
    marginTop: 12,
  },

  modalValue: {
    fontSize: 16,
    color: "#1f2937",
    marginTop: 4,
  },

  closeButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 24,
  },

  closeButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default styles;