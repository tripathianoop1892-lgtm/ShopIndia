import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7F6",
  },


  // ==========================================
  // HEADER
  // ==========================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingTop: 45,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },


  menuButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
  },


  headerTitleContainer: {
    flex: 1,
    marginLeft: 14,
  },


  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F1F1F",
  },


  headerSubtitle: {
    fontSize: 13,
    color: "#777777",
    marginTop: 3,
  },


  // ==========================================
  // LIST
  // ==========================================

  list: {
    padding: 16,
    paddingBottom: 30,
  },


  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },


  // ==========================================
  // CARD
  // ==========================================

  prescriptionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3,
  },


  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },


  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
  },


  cardInfo: {
    flex: 1,
    marginLeft: 13,
  },


  customerName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#222222",
  },


  prescriptionId: {
    fontSize: 11,
    color: "#888888",
    marginTop: 5,
  },


  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },


  label: {
    fontSize: 11,
    color: "#888888",
    marginBottom: 3,
  },


  status: {
    fontSize: 14,
    fontWeight: "700",
  },


  pending: {
    color: "#F39C12",
  },


  approved: {
    color: "#008C3A",
  },


  rejected: {
    color: "#E53935",
  },


  // ==========================================
  // EMPTY
  // ==========================================

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },


  emptyIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },


  emptyTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#222222",
    marginBottom: 8,
  },


  emptyText: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    lineHeight: 21,
  },

});


export default styles;