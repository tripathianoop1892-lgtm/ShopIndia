import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // DRAWER CONTAINER
  // ==========================================

  drawerContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
  },

  // ==========================================
  // DRAWER HEADER
  // ==========================================

  drawerHeader: {
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },

  logo: {
    width: 115,
    height: 75,
    marginBottom: 10,
  },

  menuTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#008C3A",
    marginTop: 3,
  },

  menuSubtitle: {
    fontSize: 12,
    color: "#777777",
    marginTop: 5,
  },

  // ==========================================
  // MAIN MENU
  // ==========================================

  menuContainer: {
    paddingTop: 15,
    paddingHorizontal: 10,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 50,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 5,
  },

  menuIcon: {
    width: 30,
    marginRight: 8,
  },

  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  // ==========================================
  // BOTTOM SECTION
  // ==========================================

  bottomContainer: {
    marginTop: "auto",
    paddingHorizontal: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },

  signOutText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#E53935",
  },
});

export default styles;