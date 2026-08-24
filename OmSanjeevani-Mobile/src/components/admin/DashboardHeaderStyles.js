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

});

export default styles;