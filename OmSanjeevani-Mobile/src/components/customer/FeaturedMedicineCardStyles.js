import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: 220,
    marginRight: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#E8E8E8",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  imageContainer: {
    height: 150,
    backgroundColor: "#F8FAF8",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  image: {
    width: "85%",
    height: "85%",
  },

  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,

    backgroundColor: "#E8F5E9",

    justifyContent: "center",
    alignItems: "center",
  },

  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,

    paddingHorizontal: 8,
    paddingVertical: 5,

    borderRadius: 6,

    backgroundColor: "#2E7D32",
  },

  discountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  content: {
    padding: 12,
  },

  medicineName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",

    minHeight: 40,
    lineHeight: 20,
  },

  company: {
    marginTop: 4,

    fontSize: 12,
    color: "#777777",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 8,
  },

  price: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2E7D32",
  },

  mrp: {
    marginLeft: 8,

    fontSize: 12,
    color: "#999999",

    textDecorationLine: "line-through",
  },

  stock: {
    marginTop: 5,

    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "600",
  },

  outOfStock: {
    color: "#D32F2F",
  },

  cartButton: {
    marginTop: 10,

    height: 40,

    borderRadius: 9,

    backgroundColor: "#2E7D32",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 6,
  },

  disabledCartButton: {
    backgroundColor: "#BDBDBD",
  },

  cartButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});

export default styles;