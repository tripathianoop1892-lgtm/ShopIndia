import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 14,
    overflow: "hidden",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  bannerImage: {
    width: "100%",
    height: 150,
  },

  imagePlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: "#e2e8f0",

    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    fontSize: 14,
    color: "#64748b",
  },

  content: {
    padding: 14,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#1e293b",
    marginRight: 10,
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

  actionContainer: {
    flexDirection: "row",
    marginTop: 14,
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