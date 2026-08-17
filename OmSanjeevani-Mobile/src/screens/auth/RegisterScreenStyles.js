import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 30,
    paddingBottom: 50,
  },

  logo: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2E7D32",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#666666",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    marginTop: 20,
    marginBottom: 15,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  footerText: {
    fontSize: 15,
    color: "#666666",
  },

  loginText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E7D32",
    marginLeft: 6,
  },
});

export default styles;