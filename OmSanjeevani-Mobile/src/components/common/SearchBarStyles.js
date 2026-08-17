import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 16,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E0E0E0",

    borderRadius: 12,

    paddingHorizontal: 14,
    height: 52,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  searchIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#222222",
    paddingVertical: 0,
  },

  filterButton: {
    width: 52,
    height: 52,

    marginLeft: 10,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 12,

    backgroundColor: "#2E7D32",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
});

export default styles;