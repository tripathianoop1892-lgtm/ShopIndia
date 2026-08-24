import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#FFFFFF",
    width: 280,
  },

  header: {
    backgroundColor: "#2E7D32",
  },

  drawerLabel: {
    fontSize: 15,
    fontWeight: "500",
  },

  drawerItem: {
    marginHorizontal: 8,
    marginVertical: 3,
    borderRadius: 8,
  },

    drawerContainer: {
    flex: 1,
  },

  logoutButton: {
    marginHorizontal: 12,
    marginVertical: 15,
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 8,
  },

  logoutText: {
    color: "#E53935",
    fontSize: 16,
    fontWeight: "600",
  },

  headerRightContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginRight: 10,
},

headerIconButton: {
  marginLeft: 14,
},
});

export default styles;