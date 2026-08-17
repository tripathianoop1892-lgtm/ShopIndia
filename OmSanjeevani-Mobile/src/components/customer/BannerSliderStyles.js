import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 20,
  },

  bannerCard: {
    width: width,
    paddingHorizontal: 16,
    position: "relative",
  },

  bannerImage: {
    width: width - 32,
    height: 180,

    borderRadius: 16,

    backgroundColor: "#F5F5F5",
  },

  overlay: {
    position: "absolute",
    left: 32,
    bottom: 18,

    backgroundColor: "rgba(0,0,0,0.35)",

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 10,
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 14,
  },

  dot: {
    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: "#CFCFCF",

    marginHorizontal: 4,
  },

  activeDot: {
    width: 22,
    backgroundColor: "#2E7D32",
  },
});

export default styles;