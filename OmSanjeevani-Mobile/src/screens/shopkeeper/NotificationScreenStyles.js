import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F6",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8ECE9",
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F1F7F3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2933",
  },

  clearButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  clearButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D32",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  unreadCard: {
    backgroundColor: "#F2FAF4",
    borderWidth: 1,
    borderColor: "#DCEFE0",
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#263238",
    marginBottom: 5,
  },

  notificationMessage: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
  },

  notificationTime: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 8,
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2E7D32",
    marginLeft: 8,
    marginTop: 5,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#263238",
    marginBottom: 8,
  },

  emptyMessage: {
    fontSize: 15,
    color: "#7A7A7A",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default styles;