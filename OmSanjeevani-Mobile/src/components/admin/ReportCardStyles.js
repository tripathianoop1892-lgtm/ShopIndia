import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 18,
    borderRadius: 14,

    borderLeftWidth: 5,

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#64748b",
  },

  value: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 8,
  },

  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 6,
  },
});

export default styles;