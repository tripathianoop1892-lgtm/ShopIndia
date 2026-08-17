import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // MAIN CONTAINER
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  scrollContent: {
    paddingBottom: 35,
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    height: 65,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F2",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "800",
    color: "#222222",
  },

  headerSpacer: {
    width: 42,
  },

  // ==========================================
  // SECTION TITLE
  // ==========================================

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#333333",
    marginTop: 24,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  // ==========================================
  // CARD
  // ==========================================

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 16,
    paddingHorizontal: 16,

    elevation: 2,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  // ==========================================
  // SETTING ROW
  // ==========================================

  settingRow: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  settingInfo: {
    flex: 1,
    marginLeft: 13,
    marginRight: 8,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
  },

  settingSubtitle: {
    fontSize: 12,
    color: "#777777",
    marginTop: 4,
    lineHeight: 17,
  },

  // ==========================================
  // ICON
  // ==========================================

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  blueIcon: {
    backgroundColor: "#E8F1FC",
  },

  greenIcon: {
    backgroundColor: "#E8F6ED",
  },

  // ==========================================
  // DIVIDER
  // ==========================================

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },

  // ==========================================
  // ACTION ROW
  // ==========================================

  actionRow: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
  },

  // ==========================================
  // INFORMATION ROW
  // ==========================================

  infoRow: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
  },

  versionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#777777",
  },

  // ==========================================
  // RESET SETTINGS BUTTON
  // ==========================================

  resetButton: {
    marginHorizontal: 16,
    marginTop: 25,
    height: 52,
    borderRadius: 13,

    borderWidth: 1,
    borderColor: "#F0B5B5",

    backgroundColor: "#FFF5F5",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  resetText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#D32F2F",
  },

  // ==========================================
  // FOOTER
  // ==========================================

  footerText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 14,
    fontWeight: "700",
    color: "#008A35",
  },

  footerSubText: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 11,
    color: "#888888",
    letterSpacing: 1.5,
  },
});

export default styles;