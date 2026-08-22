import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  /* ================= HEADER ================= */

  header: {
    marginBottom: 18,
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

  /* ================= SEARCH ================= */

  searchInput: {
    height: 48,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#1f2937",
    marginBottom: 16,
  },

  /* ================= TICKET LIST ================= */

  listContainer: {
    paddingBottom: 30,
  },

  ticketCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#eef0f4",
  },

  ticketTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  ticketId: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563eb",
  },

  ticketName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },

  ticketRole: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 10,
  },

  ticketSubject: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
    marginBottom: 14,
  },

  /* ================= STATUS ================= */

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffff",
  },

  pendingStatus: {
    backgroundColor: "#f59e0b",
  },

  progressStatus: {
    backgroundColor: "#2563eb",
  },

  resolvedStatus: {
    backgroundColor: "#16a34a",
  },

  /* ================= VIEW BUTTON ================= */

  viewButton: {
    backgroundColor: "#2563eb",
    height: 42,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  viewButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  /* ================= LOADING ================= */

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6b7280",
  },

  /* ================= EMPTY ================= */

  emptyContainer: {
    paddingVertical: 50,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 15,
    color: "#9ca3af",
  },

  /* ================= MODAL ================= */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
    maxHeight: "90%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1f2937",
  },

  modalTicketId: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },

  closeButton: {
    fontSize: 25,
    fontWeight: "600",
    color: "#6b7280",
  },

  /* ================= TICKET DETAILS ================= */

  detailLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
    marginTop: 10,
    marginBottom: 5,
  },

  detailText: {
    fontSize: 15,
    color: "#1f2937",
  },

  messageBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },

  /* ================= STATUS BUTTONS ================= */

  statusButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  pendingButton: {
    backgroundColor: "#f59e0b",
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 7,
  },

  progressButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 7,
  },

  resolvedButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 7,
  },

  statusButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },

  /* ================= REPLY ================= */

  replyInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    minHeight: 90,
    padding: 12,
    fontSize: 14,
    color: "#1f2937",
  },

  replyButton: {
    backgroundColor: "#2563eb",
    height: 48,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },

  replyButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default styles;