import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// 🔐 TOKEN GENERATE (UPDATED: Binds dynamic shopId sessions for customer roles)
const generateToken = (user, sessionShopId = null) => {
  return jwt.sign(
    {
      _id: user._id, 
      role: user.role,
      name: user.name,
      // 🚀 FIX: If user is a customer, embed the scanned sessionShopId into the JWT payload,
      // otherwise fallback to their permanent profile shopId (for shopkeepers)
      shopId: user.role === "customer" ? sessionShopId : (user.shopId || null),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

// =======================
// REGISTER
// =======================
export const registerUser = async (req, res) => {
  try {
  const {
  email,
  password,
  role,
  name,
  mobile,
  shopName,
    shopId,
   } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        success: false,
        message: "User already exists ❌",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newShopId = null;

    // 🏪 Generate code block exclusively for shopkeeper profiles
    if (role === "shopkeeper") {
      newShopId = "SHOP-" + uuidv4().slice(0, 6);
    }

    const user = await User.create({
  email,
  password: hashedPassword,
  role,
  name,
  mobile: mobile || "",
  shopName: role === "shopkeeper" ? shopName || "" : "",
  shopId: newShopId,
  selectedShopId: role === "customer" ? shopId || null : null,
});

    return res.json({
      success: true,
      message: "Registered Successfully ✅",
      shopId: user.shopId,
    });
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};

// =======================
// LOGIN (FIXED!)
// =======================
export const loginUser = async (req, res) => {
  try {
    const { email, password,} = req.body;

    const user = await User.findOne({ email });
    // ❌ USER NOT FOUND
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Email ❌",
      });
    }

    // 🔐 PASSWORD CHECK
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Wrong Password ❌",
      });
    }

    // 🔥 CUSTOMER DYNAMIC CHECK
   

    // 🔥 TOKEN (Passes the verified session identifier payload down to the signing method)
     const token = generateToken(
  user,
  user.role === "customer" ? user.selectedShopId : null
);

    return res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        // Override returned object so frontend state hooks capture the active session storefront pathing
        shopId:
  user.role === "customer"
    ? user.selectedShopId
    : user.shopId,
      },
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};

// =======================
// FORGOT PASSWORD
// =======================
export const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.json({
        success: false,
        message: "Email & New Password required ❌",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found ❌",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully ✅",
    });
  } catch (err) {
    console.log("FORGOT ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};
 // =======================
// 🔍 SEARCH MEDICAL SHOPS
// =======================
export const searchShops = async (req, res) => {
  try {
    const search = req.query.search?.trim();

    // Search text nahi diya gaya
    if (!search) {
      return res.json({
        success: true,
        shops: [],
      });
    }

    // Shopkeeper ko Shop Name / Mobile / Email se search karo
    const shops = await User.find({
      role: "shopkeeper",
      $or: [
        {
          shopName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          mobile: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    })
      .select("_id name shopName mobile email shopId")
      .limit(10);

    return res.json({
      success: true,
      shops,
    });
  } catch (err) {
    console.log("SEARCH SHOP ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to search shops ❌",
    });
  }
};