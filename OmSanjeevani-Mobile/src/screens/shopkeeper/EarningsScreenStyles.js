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
  // CONTENT
  // ==========================================

  content: {
    padding: 16,
    paddingBottom: 40,
  },


  // ==========================================
  // TOTAL
  // ==========================================

  totalCard: {
    backgroundColor: "#008C3A",
    borderRadius: 20,
    padding: 22,
    marginBottom: 18,
  },


  totalIcon: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: "#007A32",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },


  totalLabel: {
    fontSize: 15,
    color: "#E8F7ED",
    fontWeight: "600",
  },


  totalValue: {
    fontSize: 34,
    color: "#FFFFFF",
    fontWeight: "900",
    marginTop: 4,
  },


  totalSubtitle: {
    fontSize: 13,
    color: "#D8F0DF",
    marginTop: 7,
    lineHeight: 19,
  },


  // ==========================================
  // GRID
  // ==========================================

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },


  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 16,
    marginBottom: 14,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 5,

    elevation: 2,
  },


  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EAF7EE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },


  statTitle: {
    fontSize: 13,
    color: "#777777",
    fontWeight: "600",
  },


  statValue: {
    fontSize: 22,
    color: "#222222",
    fontWeight: "800",
    marginTop: 5,
  },


  statSubtitle: {
    fontSize: 11,
    color: "#999999",
    marginTop: 4,
  },


  // ==========================================
  // INFO
  // ==========================================

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#EAF7EE",
    borderRadius: 15,
    padding: 16,
    marginTop: 5,
  },


  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#477053",
    lineHeight: 19,
    marginLeft: 10,
  },

});


export default styles;