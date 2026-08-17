import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 18,

    elevation: 4,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  wishlistButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 5,
  },

  image: {
    width: "100%",
    height: 140,
    resizeMode: "contain",
    marginBottom: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 4,
  },

  company: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 10,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
    color: "#555555",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E7D32",
  },

  mrp: {
    marginLeft: 10,
    fontSize: 15,
    color: "#999999",
    textDecorationLine: "line-through",
  },

  prescriptionBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FF9800",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 12,
  },

  prescriptionText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "700",
  },

  stock: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 15,
  },
});

export default styles;