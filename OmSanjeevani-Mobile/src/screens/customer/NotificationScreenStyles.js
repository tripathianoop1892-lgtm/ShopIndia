import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  list: {
    padding: 16,
    paddingBottom: 30,
  },

  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 5,
  },

  message: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 22,
  },

  time: {
    fontSize: 12,
    color: "#999999",
    marginTop: 8,
    fontWeight: "500",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333333",
    marginTop: 20,
  },

  emptySubtitle: {
    fontSize: 15,
    color: "#777777",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
});

export default styles;