import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1e293b",
  },

  addButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },

  searchInput: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 15,
    color: "#1e293b",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 30,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: "#64748b",
  },

  customerCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 8,
    marginVertical: 7,
    padding: 16,
    borderRadius: 14,

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },

  customerInfo: {
    flex: 1,
    marginLeft: 12,
  },

  customerName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e293b",
  },

  customerId: {
    marginTop: 4,
    fontSize: 11,
    color: "#94a3b8",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  activeBadge: {
    backgroundColor: "#dcfce7",
  },

  pendingBadge: {
    backgroundColor: "#fef3c7",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  activeText: {
    color: "#16a34a",
  },

  pendingText: {
    color: "#d97706",
  },

  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 14,
  },

  detailText: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 8,
  },

  actionContainer: {
    flexDirection: "row",
    marginTop: 8,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 6,
  },

  editButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 6,
  },

  deleteButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default styles;