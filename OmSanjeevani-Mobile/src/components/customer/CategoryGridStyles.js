import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  header: {
    marginBottom: 14,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
  },

  card: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  iconContainer: {
    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 8,
  },

  title: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333333",

    textAlign: "center",

    paddingHorizontal: 3,
  },
});

export default styles;