import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
 container: {
  marginTop: StatusBar.currentHeight || 0,
  position: "relative",
  minHeight: 108,

  flexDirection: "row",
  alignItems: "center",

  paddingHorizontal: 16,
  paddingVertical: 12,

  backgroundColor: "#FFFFFF",

  borderBottomWidth: 1,
  borderBottomColor: "#EEEEEE",

  elevation: 3,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.08,
  shadowRadius: 3,
},
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  logo: {
    width: 45,
    height: 45,
    marginRight: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E7D32",
  },

  userName: {
    fontSize: 13,
    color: "#666666",
    marginTop: 2,
  },

rightSection: {
  position: "absolute",

  right: 8,
  top: 10,

  flexDirection: "column",
  alignItems: "center",
},

iconButton: {
  width: 42,
  height: 42,

  justifyContent: "center",
  alignItems: "center",

  marginBottom: 4,

  borderRadius: 21,

  backgroundColor: "#F5F7FA",
},
});

export default styles;