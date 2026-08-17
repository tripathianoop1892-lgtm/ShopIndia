import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 6,
  },

  mobile: {
    fontSize: 15,
    color: "#666666",
    marginBottom: 4,
  },

  email: {
    fontSize: 15,
    color: "#666666",
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 15,
  },

  info: {
    fontSize: 15,
    color: "#555555",
    marginBottom: 10,
    lineHeight: 22,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 15,
    fontWeight: "500",
  },
});

export default styles;