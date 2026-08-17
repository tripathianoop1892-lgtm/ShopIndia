import AsyncStorage from "@react-native-async-storage/async-storage";
// ==========================================
// Om Sanjeevani API Service
// ==========================================

// Backend Server
const API_BASE_URL =
  "http://10.122.13.76:5000/api";

// ==========================================
// Common API Request
// ==========================================

const apiRequest = async (
  endpoint,
  options = {}
) => {
  try {
    const token =
  await AsyncStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        method: options.method || "GET",

        headers: {
  "Content-Type": "application/json",

  ...(token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {}),

  ...(options.headers || {}),
},

        body:
          options.body !== undefined
            ? JSON.stringify(options.body)
            : undefined,
      }
    );

    console.log(
      "API URL:",
      `${API_BASE_URL}${endpoint}`
    );

    console.log(
      "API STATUS:",
      response.status
    );

    const contentType =
      response.headers.get(
        "content-type"
      );

    console.log(
      "API CONTENT TYPE:",
      contentType
    );

    const text =
      await response.text();

    console.log(
      "API RESPONSE:",
      text
    );

    if (
      !contentType?.includes(
        "application/json"
      )
    ) {
      throw new Error(
        `Server returned non-JSON response. Status: ${response.status}`
      );
    }

    return JSON.parse(text);

  } catch (error) {
    console.error(
      "API Request Error:",
      error
    );

    throw error;
  }
};

// ==========================================
// REGISTER USER
// POST /api/auth/register
// ==========================================

export const registerUser = async ({
  email,
  password,
  role,
  name,
  mobile,
  state,
  district,
  city,
  pincode,
  address,
  shopId,
  shopName,
  gstNumber,
  drugLicense,
  companyName,
  warehouseAddress,
}) => {

  return await apiRequest(
    "/auth/register",
    {
      method: "POST",

      body: {
        email,
        password,
        role,
        name,
        mobile,
        state,
        district,
        city,
        pincode,
        address,
        shopId,
        shopName,
        gstNumber,
        drugLicense,
        companyName,
        warehouseAddress,
      },
    }
  );
};

// ==========================================
// LOGIN USER
// POST /api/auth/login
// ==========================================

export const loginUser = async ({
  email,
  password,
  shopId,
}) => {

  return await apiRequest(
    "/auth/login",
    {
      method: "POST",

      body: {
        email,
        password,

        ...(shopId
          ? {
              shopId,
            }
          : {}),
      },
    }
  );
};

// ==========================================
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// ==========================================

export const forgotPassword = async ({
  email,
  newPassword,
}) => {

  return await apiRequest(
    "/auth/forgot-password",
    {
      method: "POST",

      body: {
        email,
        newPassword,
      },
    }
  );
};

// ==========================================
// SEARCH MEDICAL SHOPS
// GET /api/auth/shops
// ==========================================

export const searchShops = async (
  search
) => {

  const encodedSearch =
    encodeURIComponent(search);

  return await apiRequest(
    `/auth/shops?search=${encodedSearch}`,
    {
      method: "GET",
    }
  );
};

// ==========================================
// GET MEDICINES
// GET /api/medicines/medicine-list
// ==========================================

export const MedicinesList = async (query = "") => {
  return await apiRequest(
    `/medicines/medicine-list${query}`,
    {
      method: "GET",
    }
  );
};


// ==========================================
// ADD MEDICINE
// POST /api/medicines
// ==========================================

export const addMedicine = async (medicine) => {
  return await apiRequest(
    "/medicines",
    {
      method: "POST",
      body: medicine,
    }
  );
};

// ==========================================
// GET CART
// GET /api/cart
// ==========================================

export const getCart = async () => {

  return await apiRequest(
    "/cart",
    {
      method: "GET",
    }
  );
};

// ==========================================
// ADD TO CART
// POST /api/cart/add
// ==========================================

export const addToCart = async (
  medicine
) => {

  return await apiRequest(
    "/cart/add",
    {
      method: "POST",

      body: medicine,
    }
  );
};

// ==========================================
// REMOVE CART ITEM
// DELETE /api/cart/:name
// ==========================================

export const removeCartItem = async (
  name
) => {

  const encodedName =
    encodeURIComponent(name);

  return await apiRequest(
    `/cart/${encodedName}`,
    {
      method: "DELETE",
    }
  );
};

// ==========================================
// GET ORDERS
// GET /api/orders
// ==========================================

export const getOrders = async (view = "") => {
  const query = view
    ? `?view=${encodeURIComponent(view)}`
    : "";

  return await apiRequest(
    `/orders${query}`,
    {
      method: "GET",
    }
  );
};

// ==========================================
// UPDATE ORDER STATUS
// PUT /api/orders/:id
// ==========================================

export const updateOrder = async (id, status) => {
  return await apiRequest(
    `/orders/${id}`,
    {
      method: "PUT",
      body: {
        status,
      },
    }
  );
};

// ==========================================
// CREATE ORDER
// POST /api/orders
// ==========================================

export const createOrder = async ({
  items,
  sellerId,
  subtotal,
  deliveryCharge,
  platformFee,
  couponCode,
}) => {
  return await apiRequest(
    "/orders",
    {
      method: "POST",
      body: {
        items,
        sellerId,
        subtotal,
        deliveryCharge,
        platformFee,
        couponCode,
      },
    }
  );
};

// ==========================================
// UPDATE MEDICINE
// PUT /api/medicines/:id
// ==========================================

export const updateMedicine = async (id, data) => {
  return await apiRequest(
    `/medicines/${id}`,
    {
      method: "PUT",
      body: data,
    }
  );
};



// ==========================================
// 📄 UPLOAD PRESCRIPTION
// POST /api/prescriptions/upload
// ==========================================

export const uploadPrescription = async (formData) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/prescriptions/upload`,
      {
        method: "POST",

        headers: {
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },

        body: formData,
      }
    );

    const contentType =
      response.headers.get("content-type");

    const text = await response.text();

    console.log(
      "PRESCRIPTION API STATUS:",
      response.status
    );

    console.log(
      "PRESCRIPTION API RESPONSE:",
      text
    );

    if (!contentType?.includes("application/json")) {
      throw new Error(
        `Server returned non-JSON response. Status: ${response.status}`
      );
    }

    return JSON.parse(text);
  } catch (error) {
    console.error(
      "PRESCRIPTION UPLOAD ERROR:",
      error
    );

    throw error;
  }
};
// ==========================================
// DEFAULT EXPORT
// ==========================================

export default {
  registerUser,
  loginUser,
  forgotPassword,
  searchShops,

  MedicinesList,
  addMedicine,

  getCart,
  addToCart,
  removeCartItem,

  getOrders,
  updateOrder,
  updateMedicine,
  createOrder,
  uploadPrescription,
};