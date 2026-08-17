import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    minHeight: 55,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#D9D9D9",

    borderRadius: 12,

    paddingHorizontal: 15,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#222222",
    paddingVertical: 14,
  },

  multilineContainer: {
    alignItems: "flex-start",
    minHeight: 120,
    paddingTop: 12,
  },

  multilineInput: {
    textAlignVertical: "top",
    minHeight: 100,
  },

  eyeButton: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
});

export default styles;