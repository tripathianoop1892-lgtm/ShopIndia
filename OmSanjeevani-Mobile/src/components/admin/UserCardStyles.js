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
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },

  userInfo: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1e293b",
  },

  role: {
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

  details: {
    gap: 8,
  },

  detailText: {
    fontSize: 14,
    color: "#475569",
  },
});

export default styles;