import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7F6",
  },


  // ==========================================
  // HEADER
  // ==========================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingTop: 45,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },


  menuButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
  },


  headerTitleContainer: {
    flex: 1,
    marginLeft: 14,
  },


  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F1F1F",
  },


  headerSubtitle: {
    fontSize: 13,
    color: "#777777",
    marginTop: 3,
  },


  // ==========================================
  // CONTENT
  // ==========================================

  content: {
    padding: 16,
    paddingBottom: 40,
  },


  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#333333",
    marginTop: 8,
    marginBottom: 10,
    marginLeft: 4,
  },


  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    paddingHorizontal: 15,
    marginBottom: 18,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,

    elevation: 2,
  },


  // ==========================================
  // SETTING ROW
  // ==========================================

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },


  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },


  settingIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
  },


  settingInfo: {
    flex: 1,
    marginLeft: 13,
    marginRight: 10,
  },


  settingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
  },


  settingSubtitle: {
    fontSize: 12,
    color: "#888888",
    marginTop: 4,
    lineHeight: 17,
  },


  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },


  // ==========================================
  // VERSION
  // ==========================================

  version: {
    textAlign: "center",
    color: "#999999",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
  },

});


export default styles;