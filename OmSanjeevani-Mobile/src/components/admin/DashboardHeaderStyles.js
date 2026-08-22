import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",

    elevation: 2,
  },

  appName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563eb",
  },

  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: "#64748b",
  },

  adminContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  adminIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: "#2563eb",

    justifyContent: "center",
    alignItems: "center",
  },

  adminInitial: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },

  adminText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
  },
});

export default styles;