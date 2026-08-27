const BASE_URL = "http://localhost:5000/api";

// 🔥 COMMON HEADERS (AUTO TOKEN - FIXED)
const getHeaders = () => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// =======================
// 🔐 AUTH APIs
// =======================

// 👉 LOGIN
export const loginUser = async (form) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  return res.json();
};

// 👉 REGISTER
export const registerUser = async (form) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  return res.json();
};

// =======================
// 🔑 FORGOT PASSWORD
// =======================

export const forgotPassword = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      newPassword: password,
    }),
  });

  return res.json();
};

// =======================
// 💊 MEDICINE APIs
// =======================

// 👉 GET DISTRIBUTORS LIST (For Shopkeeper B2B Procurement Lookup)
export const getDistributorsList = async () => {
  const res = await fetch(`${BASE_URL}/medicines/distributors`, { 
    headers: getHeaders() 
  });
  return res.json();
};

// 👉 GET MEDICINES (Supports polymorphic filtering based on query parameters)
export const MedicinesList = async (paramsString = "") => {
  const res = await fetch(`${BASE_URL}/medicines/medicine-list${paramsString}`, {
    headers: getHeaders(),
  });
  return res.json();
};

// 👉 ADD MEDICINE
export const addMedicine = async (data) => {
  const res = await fetch(`${BASE_URL}/medicines`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
};

// 👉 DELETE MEDICINE
export const deleteMedicine = async (id) => {
  const res = await fetch(`${BASE_URL}/medicines/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return res.json();
};

// 👉 UPDATE MEDICINE
export const updateMedicine = async (id, data) => {
  const res = await fetch(`${BASE_URL}/medicines/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
};

// =======================
// 📦 ORDERS APIs
// =======================

// 👉 GET ORDERS (Accepts optional view parameter filters)
export const getOrders = async (viewFilter = "") => {
  const param = viewFilter ? `?view=${viewFilter}` : "";
  const res = await fetch(`${BASE_URL}/orders${param}`, { 
    headers: getHeaders() 
  });
  return res.json();
};

// 👉 Validate Coupon 
export const validateCoupon = async (code, amount ) => {
  const res = await fetch(`${BASE_URL}/admin/coupons/validate`, { 
    method: "POST",
    headers: getHeaders(), 
    body: JSON.stringify({code, amount}),
  });
  return res.json();
};

// 👉 PLACE / CREATE ORDER
export const placeOrder = async (orderPayload) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(orderPayload),
  });
  return res.json();
};

// 👉 UPDATE ORDER STATUS (For Distributors to Approve/Reject B2B Orders)
export const updateOrder = async (id, status) => {
  const res = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  return res.json();
};

// =======================
// 🛒 CART APIs (Persistent Multi-User Cloud Saved)
// =======================

// 👉 GET PERSISTENT ACCOUNT CART
export const getCart = async () => {
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: getHeaders(),
  });
  return res.json();
};

// 👉 ADD TO PERSISTENT CART
export const addToCart = async (cartItemPayload) => {
  const res = await fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(cartItemPayload),
  });
  return res.json();
};

// 👉 REMOVE CART ITEM
export const removeCartItem = async (nameString) => {
  const res = await fetch(`${BASE_URL}/cart/${encodeURIComponent(nameString)}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.json();
};


// Admin Api
export const getCustomers = async () => {
  const res = await fetch(`${BASE_URL}/admin/customers`, {
    headers: getHeaders()
  });
  return res.json(); 
}

export const getShopkeeper = async () => {
  const res = await fetch(`${BASE_URL}/admin/shopkeepers`, {
    headers: getHeaders()
  });
  return res.json(); 
}

export const getDistributors = async () => {
  const res = await fetch(`${BASE_URL}/admin/distributors`, {
    headers: getHeaders()
  });
  return res.json(); 
}

export const getMedicine = async () => {
  const res = await fetch(`${BASE_URL}/admin/medicines`, {
    headers: getHeaders()
  });
  return res.json(); 
}

export const getAdminOrders = async () => {
  const res = await fetch(`${BASE_URL}/admin/orders`, {
    headers: getHeaders()
  });
  return res.json(); 
};

// =======================
// 📄 PRESCRIPTION APIs
// =======================

// 👉 Upload Prescription
export const uploadPrescription = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/prescriptions/upload`, {
    method: "POST",
    headers: token
  ? {
      Authorization: `Bearer ${token}`,
    }
  : {},
    body: formData,
  });

  return res.json();
};

// 👉 Customer Prescription List
export const getCustomerPrescriptions = async (customerId) => {
  const res = await fetch(
    `${BASE_URL}/prescriptions/customer/${customerId}`,
    {
      headers: getHeaders(),
    }
  );

  return res.json();
};

// 👉 Shopkeeper Prescription List
export const getShopkeeperPrescriptions = async (shopId) => {
  const res = await fetch(
    `${BASE_URL}/prescriptions/shopkeeper/${shopId}`,
    {
      headers: getHeaders(),
    }
  );

  return res.json();
};

// 👉 Get Single Prescription
export const getPrescriptionById = async (id) => {
  const res = await fetch(
    `${BASE_URL}/prescriptions/${id}`,
    {
      headers: getHeaders(),
    }
  );

  return res.json();
};

// 👉 Update Prescription Status
export const updatePrescriptionStatus = async (
  id,
  status,
  remarks,
  verifiedBy
) => {
  const res = await fetch(
    `${BASE_URL}/prescriptions/${id}/status`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({
        status,
        remarks,
        verifiedBy,
      }),
    }
  );

  return res.json();
};

// 👉 Delete Prescription
export const deletePrescription = async (id) => {
  const res = await fetch(
    `${BASE_URL}/prescriptions/${id}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  return res.json();
};

// 👉 Restore Prescription
export const restorePrescription = async (id) => {
  const res = await fetch(
    `${BASE_URL}/prescriptions/${id}/restore`,
    {
      method: "PATCH",
      headers: getHeaders(),
    }
  );

  return res.json();
};
 // =======================
// 🏪 SEARCH MEDICAL SHOPS
// =======================
export const searchShops = async (search) => {
  const res = await fetch(
    `${BASE_URL}/auth/shops?search=${encodeURIComponent(search)}`
  );

  return res.json();
};

export const getCoupons = async () => {
  const res = await fetch(`${BASE_URL}/admin/coupons`, {
    headers: getHeaders()
  });
  return res.json();
};

export const createCoupon = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/coupons`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateCoupon = async (id, data) => {
  const res = await fetch(`${BASE_URL}/admin/coupons/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCoupon = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/coupons/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.json();
};

export const getCategorySummary = async () => {
  const res = await fetch(`${BASE_URL}/admin/categories`, {
    headers: getHeaders()
  });
  return res.json();
}

// =======================
// 📊 REPORT APIs
// =======================

// Dashboard Summary
export const getDashboardReport = async () => {
  const res = await fetch(`${BASE_URL}/admin/reports/dashboard`, {
    headers: getHeaders(),
  });

  return res.json();
};

// Sales Report
export const getSalesReport = async () => {
  const res = await fetch(`${BASE_URL}/admin/reports/sales`, {
    headers: getHeaders(),
  });

  return res.json();
};

// CSV Export
export const downloadSalesReport = async () => {
  const res = await fetch(`${BASE_URL}/admin/reports/sales`, {
    headers: getHeaders(),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  const rows = [
    [
      "Date",
      "Orders",
      "Revenue",
      "Discount",
      "Net Revenue",
      "Status",
    ],
  ];

  data.data.forEach((item) => {
    rows.push([
      item.date,
      item.orders,
      item.revenue,
      item.discount,
      item.netRevenue,
      item.status,
    ]);
  });

  const csv = rows
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `Sales_Report_${new Date()
    .toISOString()
    .split("T")[0]}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};

// Fetch Admin Reviews
export const getReviews = async () => {
  const res = await fetch(`${BASE_URL}/reviews/admin`, {
    headers: getHeaders()
  });
  return res.json();
};

// Update Review Status
export const updateReviewState = async (id, status) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status })
  });
  return res.json();
};

// Delete Review
export const removeReview = async (id) => {
  const res = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  return res.json();
};

// POST a new customer review
export const submitReview = async (reviewPayload) => {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(reviewPayload),
  });
  return res.json();
};

// Fetch Entity's Received Reviews (For Shopkeepers & Distributors)
export const getMyReviews = async () => {
  const res = await fetch(`${BASE_URL}/reviews/me`, {
    headers: getHeaders()
  });
  return res.json();
};

// =======================
// ADMIN USER MANAGEMENT
// =======================
export const createManagedUser = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/users`, { method: "POST", headers: getHeaders(), body: JSON.stringify(data) });
  return res.json();
};

export const updateManagedUser = async (id, data) => {
  const res = await fetch(`${BASE_URL}/admin/users/${id}`, { method: "PATCH", headers: getHeaders(), body: JSON.stringify(data) });
  return res.json();
};

export const deleteManagedUser = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/users/${id}`, { method: "DELETE", headers: getHeaders() });
  return res.json();
};

// =======================
// BANNERS
// =======================
export const getBanners = async () => {
  const res = await fetch(`${BASE_URL}/admin/banner`, { headers: getHeaders() });
  return res.json();
};

export const getActiveBanners = async () => {
  const res = await fetch(`${BASE_URL}/admin/banner/active`);
  return res.json();
};

export const createBanner = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/banner`, { method: "POST", headers: getHeaders(), body: JSON.stringify(data) });
  return res.json();
};

export const updateBanner = async (id, data) => {
  const res = await fetch(`${BASE_URL}/admin/banner/${id}`, { method: "PUT", headers: getHeaders(), body: JSON.stringify(data) });
  return res.json();
};

export const deleteBanner = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/banner/${id}`, { method: "DELETE", headers: getHeaders() });
  return res.json();
};

// =======================
// SUPPORT
// =======================
export const getSupportTickets = async () => {
  const res = await fetch(`${BASE_URL}/support`, { headers: getHeaders() });
  return res.json();
};

export const updateSupportTicketStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/support/${id}/status`, { method: "PATCH", headers: getHeaders(), body: JSON.stringify({ status }) });
  return res.json();
};

export const replySupportTicket = async (id, reply) => {
  const res = await fetch(`${BASE_URL}/support/${id}/reply`, { method: "POST", headers: getHeaders(), body: JSON.stringify({ reply }) });
  return res.json();
};

// =======================
// ADMIN NOTIFICATIONS
// =======================
export const getAdminNotifications = async () => {
  const res = await fetch(`${BASE_URL}/admin/notifications`, { headers: getHeaders() });
  return res.json();
};

export const createAdminNotification = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/notifications`, { method: "POST", headers: getHeaders(), body: JSON.stringify(data) });
  return res.json();
};

export const deleteAdminNotification = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/notifications/${id}`, { method: "DELETE", headers: getHeaders() });
  return res.json();
};
