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