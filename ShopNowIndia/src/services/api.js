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
<<<<<<< HEAD
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
=======
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
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  });

  return res.json();
};

<<<<<<< HEAD
// 👉 REGISTER
export const registerUser = async (form) => {
=======
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

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
<<<<<<< HEAD
=======
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
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
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
<<<<<<< HEAD
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
=======
// 📦 ORDERS APIs
// =======================

export const getOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders`, {
    headers: getHeaders(),
  });

  return res.json();
};

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
export const updateOrder = async (id, status) => {
  const res = await fetch(`${BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
<<<<<<< HEAD
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
=======

  return res.json();
};

// 👉 PLACE ORDER
export const placeOrder = async (data) => {

  const res = await fetch(
    `${BASE_URL}/orders`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

  return res.json();
};
// =======================
// 🛒 CART APIs
// =======================
// =======================
// 🛒 CART APIs
// =======================

// 👉 GET CART
export const getCart = async () => {

  const res = await fetch(
    "http://localhost:5000/cart"
  );

  return res.json();
};

// 👉 ADD TO CART
export const addToCart = async (data) => {

  const res = await fetch(
    "http://localhost:5000/cart/add",
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  return res.json();
};

// 👉 REMOVE CART ITEM
<<<<<<< HEAD
export const removeCartItem = async (nameString) => {
  const res = await fetch(`${BASE_URL}/cart/${encodeURIComponent(nameString)}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.json();
};
=======
export const removeCartItem = async (name) => {

  const res = await fetch(
    `http://localhost:5000/cart/${name}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  return res.json();
};
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
