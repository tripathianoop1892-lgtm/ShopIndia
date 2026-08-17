import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 35,
    paddingHorizontal: 10,
  },

  backToLogin: {
    marginTop: 25,
    alignSelf: "center",
  },

  backToLoginText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2E7D32",
  },
});

export default styles;