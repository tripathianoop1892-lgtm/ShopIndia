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
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
  },

  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },

  exportButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },

  exportButtonText: {
    color: "#ffffff",
    fontSize: 13,
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
    marginBottom: 12,
  },

  filterButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  filterLabel: {
    fontSize: 14,
    color: "#6b7280",
  },

  filterValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },

  listContainer: {
    paddingBottom: 30,
  },

  paymentCard: {
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
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  transactionContainer: {
    flex: 1,
    paddingRight: 10,
  },

  transactionLabel: {
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 4,
  },

  transactionId: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f2937",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  successBadge: {
    backgroundColor: "#dcfce7",
  },

  pendingBadge: {
    backgroundColor: "#fef3c7",
  },

  failedBadge: {
    backgroundColor: "#fee2e2",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  successText: {
    color: "#16a34a",
  },

  pendingText: {
    color: "#d97706",
  },

  failedText: {
    color: "#dc2626",
  },

  detailsContainer: {
    marginTop: 14,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
  },

  detailLabel: {
    fontSize: 13,
    color: "#6b7280",
  },

  detailValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    maxWidth: "60%",
    textAlign: "right",
  },

  amountText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16a34a",
  },

  viewButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },

  viewButtonText: {
    color: "#ffffff",
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

  /* ============ MODALS ============ */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  statusModal: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
  },

  paymentModal: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 22,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 16,
  },

  statusOption: {
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f8fafc",
  },

  selectedStatusOption: {
    backgroundColor: "#dbeafe",
  },

  statusOptionText: {
    fontSize: 15,
    color: "#374151",
  },

  selectedStatusOptionText: {
    color: "#2563eb",
    fontWeight: "700",
  },

  closeModalButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  closeModalButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
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