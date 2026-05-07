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
// 💊 MEDICINE APIs
// =======================

// 👉 GET medicines
export const MedicinesList = async () => {
  const res = await fetch(`${BASE_URL}/medicines/medicine-list`, {
    headers: getHeaders(),
  });
  return res.json();
};

// 👉 ADD medicine
export const addMedicine = async (data) => {
  const res = await fetch(`${BASE_URL}/medicines`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
};

// 👉 DELETE medicine
export const deleteMedicine = async (id) => {
  const res = await fetch(`${BASE_URL}/medicines/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return res.json();
};

// 👉 UPDATE medicine
export const updateMedicine = async (id, data) => {
  const res = await fetch(`${BASE_URL}/medicines/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
};

// =======================
// 🔐 AUTH APIs
// =======================

// 👉 REGISTER (🔥 ONLY FIX HERE)
export const registerUser = async (form) => {
  const payload = {
    name: form.name,
    email: form.email,
    password: form.password,
    role: form.role,
  };

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // ✅ shopId removed
  });

  return res.json();
};

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
// 📦 ORDERS APIs
// =======================

export const getOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`, {
    headers: getHeaders(),
  });

  return res.json();
};

export const updateOrder = async (id, status) => {
  const res = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });

  return res.json();
};

// =======================
// 🛒 CART
// =======================

export const getCart = async () => {
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: getHeaders(),
  });
  return res.json();
};

export const addToCart = async (data) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
};