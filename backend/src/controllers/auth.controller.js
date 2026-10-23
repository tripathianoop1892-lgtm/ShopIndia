import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import OtpVerification from "../models/otpVerification.js";
import { normaliseMobile, sendOtp } from "../services/otp.service.js";
import Order from "../models/Order.js";
import Prescription from "../models/prescription.js";
import Support from "../models/Support.js";

const MINIMUM_PASSWORD_LENGTH = 8;
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getDeactivationBlockers = async (user) => {
  const activeOrderFilter = {
    $or: [{ buyerId: user._id }, { sellerId: user._id }],
    $and: [{
      $or: [
        { status: { $in: ["Pending", "Paid", "Approved"] } },
        { refundStatus: "pending" },
      ],
    }],
  };
  const prescriptionFilter = user.role === "customer"
    ? { customerId: user._id, isDeleted: false, status: { $in: ["Pending", "Verified"] } }
    : user.role === "shopkeeper" && user.shopId
    ? { shopId: user.shopId, isDeleted: false, status: { $in: ["Pending", "Verified"] } }
    : null;

  const [orders, prescriptions, supportTickets] = await Promise.all([
    Order.countDocuments(activeOrderFilter),
    prescriptionFilter ? Prescription.countDocuments(prescriptionFilter) : 0,
    Support.countDocuments({ userId: user._id, status: { $in: ["Pending", "In Progress"] } }),
  ]);

  return [
    orders ? { type: "orders", count: orders, label: `${orders} active order${orders === 1 ? "" : "s"}` } : null,
    prescriptions ? { type: "prescriptions", count: prescriptions, label: `${prescriptions} unfinished prescription${prescriptions === 1 ? "" : "s"}` } : null,
    supportTickets ? { type: "support", count: supportTickets, label: `${supportTickets} open support ticket${supportTickets === 1 ? "" : "s"}` } : null,
  ].filter(Boolean);
};

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
export const requestRegistrationOtp = async (req, res) => {
  try {
    const { channel, email, mobile } = req.body;
    if (!["email", "mobile"].includes(channel)) return res.status(400).json({ success: false, message: "Select email or mobile verification." });
    const contact = channel === "email" ? email?.trim().toLowerCase() : normaliseMobile(mobile || "");
    if (!contact || (channel === "email" && !/^\S+@\S+\.\S+$/.test(contact)) || (channel === "mobile" && !/^\+\d{10,15}$/.test(contact))) return res.status(400).json({ success: false, message: `Enter a valid ${channel === "email" ? "email address" : "mobile number"}.` });
    const exists = await User.findOne(channel === "email" ? { email: contact } : { mobile: contact });
    if (exists) return res.status(409).json({ success: false, message: `This ${channel} is already registered.` });
    const code = String(crypto.randomInt(100000, 1000000));
    await OtpVerification.deleteMany({ contact, channel, purpose: "registration" });
    await OtpVerification.create({ contact, channel, purpose: "registration", codeHash: crypto.createHash("sha256").update(code).digest("hex"), expiresAt: new Date(Date.now() + 10 * 60 * 1000) });
    await sendOtp({ channel, contact, code, purpose: "registration" });
    return res.json({ success: true, message: `OTP sent to your ${channel}.` });
  } catch (error) {
    console.error("OTP REQUEST ERROR:", error);
    return res.status(503).json({ success: false, message: "Unable to send OTP right now." });
  }
};

export const registerUser = async (req, res) => {
  try {
  const {
  email,
  password,
  role,
  name,
  mobile,
   shopName,
   industryType,
   companyName,
   shopId,
   verificationChannel,
   otp,
   } = req.body;

    if (!name?.trim() || !password || !["customer", "shopkeeper", "distributor"].includes(role) || !email?.trim() || !mobile?.trim()) return res.status(400).json({ success: false, message: "Name, email, mobile number, password, and role are required." });
    if (role === "shopkeeper" && !["Chemist", "Hospital", "Doctors"].includes(industryType)) return res.status(400).json({ success: false, message: "Select a valid industry type." });
    if (password.length < MINIMUM_PASSWORD_LENGTH) return res.status(400).json({ success: false, message: `Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters.` });
    if (!["email", "mobile"].includes(verificationChannel) || !otp) return res.status(400).json({ success: false, message: "Verify your selected email or mobile number with OTP." });
    const normalEmail = email.trim().toLowerCase();
    const normalMobile = normaliseMobile(mobile);
    const contact = verificationChannel === "email" ? normalEmail : normalMobile;
    const verification = await OtpVerification.findOne({ contact, channel: verificationChannel, purpose: "registration" }).sort({ createdAt: -1 });
    const expectedHash = crypto.createHash("sha256").update(String(otp)).digest("hex");
    if (!verification || verification.expiresAt < new Date() || verification.attempts >= 5 || !crypto.timingSafeEqual(Buffer.from(verification.codeHash), Buffer.from(expectedHash))) {
      if (verification) { verification.attempts += 1; await verification.save(); }
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }

    const exist = await User.findOne({ $or: [{ email: normalEmail }, { mobile: normalMobile }] });
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
  email: normalEmail,
  password: hashedPassword,
  role,
  name,
  mobile: normalMobile,
  shopName: role === "shopkeeper" ? shopName || "" : "",
  industryType: role === "shopkeeper" ? industryType : null,
  companyName: role === "distributor" ? companyName || "" : "",
  shopId: newShopId,
  selectedShopId: role === "customer" ? shopId || null : null,
});
    await OtpVerification.deleteMany({ $or: [{ contact: normalEmail }, { contact: normalMobile }] });

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
    const { email, password } = req.body;

    if (!email?.trim() || typeof password !== "string") {
      return res.status(401).json({ success: false, message: "Invalid email/mobile number or password." });
    }

    const identifier = email?.trim();
    const user = await User.findOne({ $or: [{ email: identifier?.toLowerCase() }, { mobile: normaliseMobile(identifier || "") }] });
    // ❌ USER NOT FOUND
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email/mobile number or password.",
      });
    }

    if (user.status !== "Active") {
      return res.status(403).json({
        success: false,
        message: "This account is deactivated. Contact support to reactivate it.",
      });
    }

    // 🔐 PASSWORD CHECK
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email/mobile number or password.",
      });
    }

    const linkedShop = user.role === "customer" && user.selectedShopId
      ? await User.findOne({ role: "shopkeeper", shopId: user.selectedShopId }).select("shopName name").lean()
      : null;

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
        mobile: user.mobile,
        role: user.role,
        shopName: user.shopName,
        industryType: user.industryType,
        companyName: user.companyName,
        address: user.address,
        warehouseAddress: user.warehouseAddress,
        city: user.city,
        district: user.district,
        state: user.state,
        pincode: user.pincode,
        linkedShopName: linkedShop?.shopName || linkedShop?.name || "",
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

export const getProfile = async (req, res) => {
  try {
    const profile = await User.findById(req.user._id).select("-password -settings").lean();
    if (!profile) return res.status(404).json({ success: false, message: "User not found." });
    const linkedShop = profile.role === "customer" && profile.selectedShopId
      ? await User.findOne({ role: "shopkeeper", shopId: profile.selectedShopId }).select("shopName name").lean()
      : null;
    return res.json({
      success: true,
      user: {
        ...profile,
        shopId: profile.role === "customer" ? profile.selectedShopId : profile.shopId,
        linkedShopName: linkedShop?.shopName || linkedShop?.name || "",
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to load profile." });
  }
};

// =======================
// 🔍 SEARCH MEDICAL SHOPS
// =======================
export const requestPasswordReset = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ success: false, message: "Enter a valid email address." });

    const user = await User.findOne({ email });
    // Keep account existence private while still sending a code for valid users.
    if (user) {
      const code = String(crypto.randomInt(100000, 1000000));
      await OtpVerification.deleteMany({ contact: email, channel: "email", purpose: "password-reset" });
      await OtpVerification.create({ contact: email, channel: "email", purpose: "password-reset", codeHash: crypto.createHash("sha256").update(code).digest("hex"), expiresAt: new Date(Date.now() + 10 * 60 * 1000) });
      await sendOtp({ channel: "email", contact: email, code, purpose: "password-reset" });
    }
    return res.json({ success: true, message: "If an account exists for this email, a reset code has been sent." });
  } catch (error) {
    console.error("PASSWORD RESET REQUEST ERROR:", error);
    return res.status(503).json({ success: false, message: "Unable to send a reset code right now." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) return res.status(400).json({ success: false, message: "Email, reset code, and new password are required." });
    if (newPassword.length < MINIMUM_PASSWORD_LENGTH) return res.status(400).json({ success: false, message: `Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters.` });

    const verification = await OtpVerification.findOne({ contact: email, channel: "email", purpose: "password-reset" }).sort({ createdAt: -1 });
    const expectedHash = crypto.createHash("sha256").update(String(otp)).digest("hex");
    if (!verification || verification.expiresAt < new Date() || verification.attempts >= 5 || verification.codeHash !== expectedHash) {
      if (verification) { verification.attempts += 1; await verification.save(); }
      return res.status(400).json({ success: false, message: "Invalid or expired reset code." });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired reset code." });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    await OtpVerification.deleteMany({ contact: email, channel: "email", purpose: "password-reset" });
    return res.json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error("PASSWORD RESET ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to reset password." });
  }
};

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

    if (search.length > 80) {
      return res.status(400).json({ success: false, message: "Search text is too long." });
    }

    const safeSearch = escapeRegex(search);

    // Shopkeeper ko Shop Name / Mobile / Email se search karo
    const shops = await User.find({
      role: "shopkeeper",
      status: "Active",
      $or: [
        {
          shopName: {
            $regex: safeSearch,
            $options: "i",
          },
        },
        {
          name: {
            $regex: safeSearch,
            $options: "i",
          },
        },
        {
          shopId: {
            $regex: safeSearch,
            $options: "i",
          },
        },
      ],
    })
      .select("_id name shopName shopId")
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
// =======================
// UPDATE PROFILE
// =======================
export const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      shopName,
      industryType,
      companyName,
      address,
      warehouseAddress,
      city,
      district,
      state,
      pincode,
    } = req.body;

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user ❌",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found ❌",
      });
    }

    if (fullName !== undefined) {
      user.name = fullName.trim();
    }

    if (mobile !== undefined && normaliseMobile(mobile) !== user.mobile) {
      return res.status(400).json({ success: false, message: "Mobile number changes require verification." });
    }

    if (email !== undefined && email.trim().toLowerCase() !== user.email) {
      return res.status(400).json({ success: false, message: "Email address changes require verification." });
    }

    if (shopName !== undefined) {
      user.shopName = shopName.trim();
    }

    if (industryType !== undefined && user.role === "shopkeeper") {
      if (!["Chemist", "Hospital", "Doctors"].includes(industryType)) {
        return res.status(400).json({ success: false, message: "Select a valid industry type." });
      }
      user.industryType = industryType;
    }

    if (companyName !== undefined) {
      user.companyName = companyName.trim();
    }

    if (address !== undefined) {
      user.address = address.trim();
    }

    for (const [field, value] of Object.entries({ warehouseAddress, city, district, state, pincode })) {
      if (value !== undefined) user[field] = value.trim();
    }

    await user.save();

    return res.json({
      success: true,
      message: "Profile updated successfully ✅",
      user: {
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        shopName: user.shopName,
        industryType: user.industryType,
        companyName: user.companyName,
        address: user.address,
        warehouseAddress: user.warehouseAddress,
        city: user.city,
        district: user.district,
        state: user.state,
        pincode: user.pincode,
        role: user.role,
        shopId: user.shopId,
      },
    });

  } catch (err) {
    console.log("UPDATE PROFILE ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Unable to update profile ❌",
    });
  }
};

export const getAccountSettings = async (req, res) => {
  const user = await User.findById(req.user._id).select("settings");
  return res.json({ success: true, data: user?.settings || {} });
};

export const updateAccountSettings = async (req, res) => {
  try {
    if (req.body.newPassword) {
      if (!req.body.currentPassword || req.body.newPassword.length < MINIMUM_PASSWORD_LENGTH || req.body.newPassword !== req.body.confirmPassword) return res.status(400).json({ success: false, message: `Enter the current password and matching new password of at least ${MINIMUM_PASSWORD_LENGTH} characters.` });
      const account = await User.findById(req.user._id);
      if (!await bcrypt.compare(req.body.currentPassword, account.password)) return res.status(400).json({ success: false, message: "Current password is incorrect." });
      account.password = await bcrypt.hash(req.body.newPassword, 10);
      await account.save();
    }
    const allowed = ["emailAlerts", "orderUpdates", "lowStockWarning", "autoRefreshCatalog", "defaultMarkup", "minimumB2BOrder", "autoApproveReorders"];
    const settings = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const user = await User.findByIdAndUpdate(req.user._id, { $set: Object.fromEntries(Object.entries(settings).map(([key, value]) => [`settings.${key}`, value])) }, { new: true, runValidators: true }).select("settings");
    return res.json({ success: true, data: user.settings });
  } catch {
    return res.status(500).json({ success: false, message: "Unable to save settings." });
  }
};

export const getAccountDeactivationCheck = async (req, res) => {
  try {
    const account = await User.findById(req.user._id).select("role shopId status");
    if (!account) return res.status(404).json({ success: false, message: "User not found." });
    if (account.role === "admin") return res.status(403).json({ success: false, message: "Administrator accounts cannot be self-deactivated." });

    const blockers = await getDeactivationBlockers(account);
    return res.json({
      success: true,
      canDeactivate: blockers.length === 0,
      blockers,
      message: blockers.length
        ? `Complete or resolve ${blockers.map((item) => item.label).join(", ")} before deactivating your account.`
        : "No pending work was found. Your account can be deactivated.",
    });
  } catch (error) {
    console.error("DEACTIVATION CHECK ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to check account activity." });
  }
};

export const deactivateAccount = async (req, res) => {
  try {
    if (req.body.confirmation !== "DEACTIVATE") {
      return res.status(400).json({ success: false, message: "Account deactivation was not confirmed." });
    }

    const account = await User.findById(req.user._id).select("role shopId status");
    if (!account) return res.status(404).json({ success: false, message: "User not found." });
    if (account.role === "admin") return res.status(403).json({ success: false, message: "Administrator accounts cannot be self-deactivated." });

    const blockers = await getDeactivationBlockers(account);
    if (blockers.length) {
      return res.status(409).json({
        success: false,
        canDeactivate: false,
        blockers,
        message: `Complete or resolve ${blockers.map((item) => item.label).join(", ")} before deactivating your account.`,
      });
    }

    account.status = "Inactive";
    await account.save();
    return res.json({ success: true, message: "Your account has been deactivated successfully." });
  } catch (error) {
    console.error("ACCOUNT DEACTIVATION ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to deactivate the account." });
  }
};
