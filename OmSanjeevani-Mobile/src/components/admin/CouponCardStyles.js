import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginVertical: 8,
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

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  codeContainer: {
    flex: 1,
  },

  code: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },

  type: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748b",
  },

  statusBadge: {
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
    fontWeight: "600",
  },

  activeText: {
    color: "#16a34a",
  },

  inactiveText: {
    color: "#dc2626",
  },

  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 14,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: "#64748b",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
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