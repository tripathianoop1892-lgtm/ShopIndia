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
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 18,

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  avatarContainer: {
    width: 90,
    height: 90,

    borderRadius: 45,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 14,
  },

  avatarText: {
    fontSize: 34,
    fontWeight: "700",
    color: "#2E7D32",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
    textAlign: "center",
  },

  email: {
    marginTop: 5,
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
  },

  roleBadge: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
  },

  roleText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2E7D32",
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 18,

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
    fontSize: 15,
    fontWeight: "700",
    color: "#333333",

    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
    paddingVertical: 14,

    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  lastInfoRow: {
    borderBottomWidth: 0,
  },

  iconContainer: {
    width: 38,
    height: 38,

    borderRadius: 10,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: "#888888",
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
  },

  editButton: {
    height: 54,

    backgroundColor: "#2E7D32",

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 4,

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  editButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default styles;