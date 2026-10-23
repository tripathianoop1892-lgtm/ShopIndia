import jwt from "jsonwebtoken";
import User from "../models/user.js";

// =======================
// 🔐 VERIFY TOKEN
// =======================
export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No token
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token, Unauthorized ❌",
      });
    }

    // 🔥 Expect: "Bearer TOKEN"
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format ❌",
      });
    }

    const token = parts[1];

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const activeUser = await User.exists({ _id: decoded._id, status: "Active" });
    if (!activeUser) {
      return res.status(401).json({
        success: false,
        message: "Account is inactive or no longer available.",
      });
    }

    // 🔥 Attach user data
    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token ❌",
    });
  }
};

// =======================
// 🔥 ROLE BASED ACCESS
// =======================
export const checkRole = (...roles) => {
  return (req, res, next) => {
    try {
      // ❌ Safety check
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized ❌",
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access Denied ❌",
        });
      }

      next();

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error ❌",
      });
    }
  };
};
