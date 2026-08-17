import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 70,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",

    elevation: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    marginTop: 5,
    fontSize: 12,
    color: "#777777",
    fontWeight: "500",
  },

  activeLabel: {
    color: "#2E7D32",
    fontWeight: "700",
  },
});

export default styles;