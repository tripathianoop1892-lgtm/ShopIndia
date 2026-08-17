import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#2E7D32",
    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 15,
    marginBottom: 10,

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },

  disabledButton: {
    backgroundColor: "#A5D6A7",
    elevation: 0,
    shadowOpacity: 0,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default styles;