import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 18,
  },
  label: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  industryOptions: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  industryOption: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  industryOptionSelected: {
    borderColor: "#2E7D32",
    backgroundColor: "#E8F5E9",
  },
  industryOptionText: {
    color: "#555555",
    fontSize: 13,
    fontWeight: "600",
  },
  industryOptionTextSelected: {
    color: "#2E7D32",
  },
});

export default styles;
