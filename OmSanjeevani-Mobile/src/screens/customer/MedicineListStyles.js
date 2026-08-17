import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222222",
  },

  count: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "600",
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    marginTop: 80,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 10,
  },

  emptySubtitle: {
    fontSize: 15,
    color: "#777777",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default styles;