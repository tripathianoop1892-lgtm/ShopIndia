import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 12,
  },

  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  roleButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },

  selectedRole: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },

  roleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  selectedRoleText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

export default styles;