import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  scrollContainer: {
    flexGrow: 1,
   
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  logo: {
    width: 150,
    height: 150,
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
    marginBottom: 35,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
    marginTop: 8,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#222222",
    marginBottom: 18,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    height: 55,
    marginBottom: 18,
  },

  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#222222",
  },

  forgotPassword: {
    color: "#2E7D32",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "right",
    marginBottom: 25,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  footerText: {
    fontSize: 15,
    color: "#666666",
  },

  registerText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E7D32",
    marginLeft: 5,
  },
});

export default styles;