import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 16,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 5,
  },

  searchInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    marginBottom: 16,
  },

  listContent: {
    paddingBottom: 30,
  },

  categoryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  idBox: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#eff6ff",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  idText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563eb",
  },

  categoryInfo: {
    flex: 1,
  },

  categoryName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f2937",
    textTransform: "capitalize",
  },

  medicineCount: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 5,
  },

  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },

  loadingText: {
    fontSize: 15,
    color: "#6b7280",
    marginTop: 12,
  },

  errorText: {
    fontSize: 15,
    color: "#dc2626",
    textAlign: "center",
  },

  emptyText: {
    fontSize: 15,
    color: "#9ca3af",
  },
});

export default styles;