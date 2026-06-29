import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

<<<<<<< HEAD
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
=======
// 🔐 TOKEN GENERATE
const generateToken = (user) => {

  return jwt.sign(
    {
      _id: user._id, // 🔥 FINAL FIX
      role: user.role,
      name: user.name,
      shopId: user.shopId || null,
    },

    process.env.JWT_SECRET,

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    {
      expiresIn: "1d",
    }
  );
};

// =======================
// REGISTER
// =======================
export const registerUser = async (req, res) => {
<<<<<<< HEAD
  try {
    const { email, password, role, name } = req.body;

    const exist = await User.findOne({ email });
=======

  try {

    const {
      email,
      password,
      role,
      name,
    } = req.body;

    const exist = await User.findOne({ email });

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    if (exist) {
      return res.json({
        success: false,
        message: "User already exists ❌",
      });
    }

<<<<<<< HEAD
    const hashedPassword = await bcrypt.hash(password, 10);
    let newShopId = null;

    // 🏪 Generate code block exclusively for shopkeeper profiles
    if (role === "shopkeeper") {
      newShopId = "SHOP-" + uuidv4().slice(0, 6);
=======
    const hashedPassword =
      await bcrypt.hash(password, 10);

    let newShopId = null;

    // 🏪 SHOPKEEPER
    if (role === "shopkeeper") {
      newShopId =
        "SHOP-" + uuidv4().slice(0, 6);
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      name,
<<<<<<< HEAD
      shopId: newShopId, // Customer stays cleanly as null in DB
=======
      shopId: newShopId,
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    });

    return res.json({
      success: true,
      message: "Registered Successfully ✅",
      shopId: user.shopId,
    });
<<<<<<< HEAD
  } catch (err) {
    console.log("REGISTER ERROR:", err);
=======

  } catch (err) {

    console.log("REGISTER ERROR:", err);

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    return res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};

// =======================
<<<<<<< HEAD
// LOGIN (FIXED!)
// =======================
export const loginUser = async (req, res) => {
  try {
    const { email, password, shopId } = req.body;

    const user = await User.findOne({ email });
=======
// LOGIN
// =======================
export const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
      shopId,
    } = req.body;

    const user = await User.findOne({ email });

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    // ❌ USER NOT FOUND
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Email ❌",
      });
    }

    // 🔐 PASSWORD CHECK
<<<<<<< HEAD
    const isMatch = await bcrypt.compare(password, user.password);
=======
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Wrong Password ❌",
      });
    }

<<<<<<< HEAD
    // 🔥 CUSTOMER DYNAMIC CHECK
    if (user.role === "customer") {
=======
    // 🔥 CUSTOMER ONLY
    if (user.role === "customer") {

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
      if (!shopId) {
        return res.json({
          success: false,
          message: "Shop ID required ❌",
        });
      }

<<<<<<< HEAD
      // 🚀 THE FIX: Verify that the submitted Shop ID belongs to a real, valid shopkeeper in the system
      const verifiedShopExists = await User.findOne({ shopId: shopId.trim(), role: "shopkeeper" });
      if (!verifiedShopExists) {
        return res.json({
          success: false,
          message: "Wrong Shop ID ❌ This Store Code does not exist.",
=======
      if (user.shopId !== shopId) {
        return res.json({
          success: false,
          message: "Wrong Shop ID ❌",
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
        });
      }
    }

<<<<<<< HEAD
    // 🔥 TOKEN (Passes the verified session identifier payload down to the signing method)
    const token = generateToken(user, shopId ? shopId.trim() : null);
=======
    // 🔥 TOKEN
    const token = generateToken(user);
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

    return res.json({
      success: true,
      token,
<<<<<<< HEAD
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        // Override returned object so frontend state hooks capture the active session storefront pathing
        shopId: user.role === "customer" ? shopId.trim() : user.shopId,
      },
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
=======
      user,
    });

  } catch (err) {

    console.log("LOGIN ERROR:", err);

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
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
<<<<<<< HEAD
  try {
    const { email, newPassword } = req.body;
=======

  try {

    const {
      email,
      newPassword,
    } = req.body;
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

    if (!email || !newPassword) {
      return res.json({
        success: false,
<<<<<<< HEAD
        message: "Email & New Password required ❌",
=======
        message:
          "Email & New Password required ❌",
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
      });
    }

    const user = await User.findOne({ email });
<<<<<<< HEAD
=======

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    if (!user) {
      return res.json({
        success: false,
        message: "User not found ❌",
      });
    }

<<<<<<< HEAD
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
=======
    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    await user.save();

    return res.json({
      success: true,
<<<<<<< HEAD
      message: "Password updated successfully ✅",
    });
  } catch (err) {
    console.log("FORGOT ERROR:", err);
=======
      message:
        "Password updated successfully ✅",
    });

  } catch (err) {

    console.log("FORGOT ERROR:", err);

>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
    return res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};