import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 18,
  },
});

export default styles;