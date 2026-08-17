import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ==========================================
  // MAIN CONTAINER
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#F5F7F6",
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    height: 95,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#222222",
  },

  editHeaderButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
  },

  // ==========================================
  // CONTENT
  // ==========================================

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  // ==========================================
  // PROFILE CARD
  // ==========================================

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 16,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,

    elevation: 2,
  },

  profileIcon: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#EAF7EE",
    borderWidth: 2,
    borderColor: "#CDEBD7",
    alignItems: "center",
    justifyContent: "center",
  },

  userName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#222222",
    marginTop: 13,
    textAlign: "center",
  },

  roleText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#008C3A",
    letterSpacing: 1,
    marginTop: 6,
  },

  // ==========================================
  // SECTION
  // ==========================================

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#222222",
    marginBottom: 15,
  },

  // ==========================================
  // INFORMATION ROW
  // ==========================================

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoLabel: {
    fontSize: 11,
    color: "#888888",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333333",
    lineHeight: 19,
  },

  // ==========================================
  // EDIT BUTTON
  // ==========================================

  editButton: {
    height: 53,
    borderRadius: 13,
    backgroundColor: "#008C3A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 8,
  },

  // ==========================================
  // LOADING
  // ==========================================

  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F7F6",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    fontSize: 14,
    color: "#777777",
    marginTop: 10,
  },

  // ==========================================
  // BOTTOM SPACE
  // ==========================================

  bottomSpace: {
    height: 25,
  },
});

export default styles;