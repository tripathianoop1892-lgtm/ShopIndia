import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // MAIN
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  // ==========================================
  // SECTION TITLE
  // ==========================================

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
    marginTop: 8,
    marginBottom: 10,
  },

  // ==========================================
  // SETTINGS CARD
  // ==========================================

  settingsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 22,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  // ==========================================
  // SETTING ROW
  // ==========================================

  settingRow: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 15,
    paddingVertical: 16,

    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  // ==========================================
  // ICON
  // ==========================================

  iconContainer: {
    width: 44,
    height: 44,

    borderRadius: 12,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  // ==========================================
  // TEXT CONTENT
  // ==========================================

  settingContent: {
    flex: 1,
    marginRight: 8,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },

  settingSubtitle: {
    fontSize: 12,
    color: "#888888",
    lineHeight: 17,
  },

  // ==========================================
  // LOGOUT
  // ==========================================

  logoutButton: {
    height: 54,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#FFCDD2",

    borderRadius: 12,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 8,

    elevation: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  logoutText: {
    marginLeft: 8,

    fontSize: 16,
    fontWeight: "700",
    color: "#E53935",
  },
});

export default styles;