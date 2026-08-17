import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },

  textContainer: {
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2E7D32",
    letterSpacing: 0.5,
    marginBottom: 10,
  },

  tagline: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});

export default styles;