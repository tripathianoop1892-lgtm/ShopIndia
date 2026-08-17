import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // DRAWER CONTAINER
  // ==========================================

  drawerContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },

  // ==========================================
  // DRAWER HEADER
  // ==========================================

  drawerHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 35,
    paddingBottom: 22,
    paddingHorizontal: 20,
    backgroundColor: "#F4FAF6",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  // ==========================================
  // LOGO
  // ==========================================

  logo: {
    width: 125,
    height: 90,
  },

  // ==========================================
  // BRAND / MENU TITLE
  // ==========================================

  menuTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#008A35",
    marginTop: 5,
  },

  menuSubtitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#777777",
    letterSpacing: 2,
    marginTop: 3,
  },

  // ==========================================
  // MENU CONTAINER
  // ==========================================

  menuContainer: {
    paddingTop: 12,
    paddingHorizontal: 10,
  },

  // ==========================================
  // MENU ITEM
  // ==========================================

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 3,
    borderRadius: 10,
  },

  // ==========================================
  // MENU ICON
  // ==========================================

  menuIcon: {
    width: 28,
    marginRight: 10,
    textAlign: "center",
  },

  // ==========================================
  // MENU TEXT
  // ==========================================

  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
  },

  // ==========================================
  // BOTTOM SECTION
  // ==========================================

  bottomContainer: {
    marginTop: "auto",
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  // ==========================================
  // SIGN OUT TEXT
  // ==========================================

  signOutText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#E53935",
  },
});

export default styles;