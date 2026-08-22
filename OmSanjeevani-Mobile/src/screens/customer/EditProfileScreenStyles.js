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

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
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
    fontSize: 20,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444444",
    marginBottom: 7,
    marginTop: 8,
  },

  input: {
    backgroundColor: "#F8FAF8",

    borderWidth: 1,
    borderColor: "#D9E3DA",

    borderRadius: 10,

    minHeight: 48,

    paddingHorizontal: 14,

    fontSize: 15,
    color: "#222222",
  },

  addressInput: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },

});

export default styles;