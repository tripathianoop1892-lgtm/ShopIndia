import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
  },

  totalReviews: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },

  searchInput: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 15,
    color: "#1e293b",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 30,
  },

  reviewCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 8,
    marginVertical: 7,
    padding: 16,
    borderRadius: 14,

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "700",
  },

  userInfo: {
    flex: 1,
    marginLeft: 12,
  },

  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
  },

  date: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748b",
  },

  ratingContainer: {
    backgroundColor: "#fef3c7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  rating: {
    fontSize: 13,
    fontWeight: "600",
    color: "#92400e",
  },

  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 14,
  },

  reviewText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#475569",
  },

  actionContainer: {
    flexDirection: "row",
    marginTop: 16,
  },

  viewButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 6,
  },

  viewButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 6,
  },

  deleteButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },

  emptyContainer: {
    paddingTop: 80,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#64748b",
  },
});

export default styles;