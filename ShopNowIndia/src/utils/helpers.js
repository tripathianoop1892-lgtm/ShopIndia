// छोटा ID दिखाने के लिए
export const shortId = (id) => {
  return id?.slice(-4);
};

// Status color
export const statusColor = (status) => {
  if (status === "Paid") return "#2563eb";
  switch (status) {
    case "Pending":
      return "orange";
    case "Approved":
      return "green";
    case "Rejected":
      return "red";
    default:
      return "black";
  }
};

// Date format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
