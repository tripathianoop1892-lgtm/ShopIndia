import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 40,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  logo: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },

  textContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#444",
  },

  appName: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
    fontWeight: "600",
  },

  description: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 24,
    paddingHorizontal: 10,
  },

  buttonContainer: {
    marginBottom: 20,
  },

  loginButton: {
    height: 55,
    backgroundColor: "#2E7D32",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  registerButton: {
    height: 55,
    borderWidth: 2,
    borderColor: "#2E7D32",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  registerButtonText: {
    color: "#2E7D32",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default styles;