const splitOrigins = (value = "") =>
  value
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

const isHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

export const getAllowedOrigins = () => {
  const configured = splitOrigins(process.env.CORS_ORIGINS);
  if (configured.length > 0) return configured;

  if (process.env.NODE_ENV !== "production") {
    return ["http://localhost:5173", "http://127.0.0.1:5173"];
  }

  return [];
};

export const validateEnvironment = () => {
  const errors = [];
  const required = ["MONGO_URI", "JWT_SECRET"];

  for (const name of required) {
    if (!process.env[name]?.trim()) errors.push(`${name} is required.`);
  }

  if (process.env.NODE_ENV === "production") {
    if ((process.env.JWT_SECRET || "").length < 32) {
      errors.push("JWT_SECRET must contain at least 32 characters in production.");
    }
    if (getAllowedOrigins().length === 0) {
      errors.push("CORS_ORIGINS must list the HTTPS website origin in production.");
    }
    if (!isHttpsUrl(process.env.PUBLIC_SERVER_URL)) {
      errors.push("PUBLIC_SERVER_URL must be a valid HTTPS URL in production.");
    }
  }

  const razorpayValues = [
    process.env.RAZORPAY_KEY_ID?.trim(),
    process.env.RAZORPAY_KEY_SECRET?.trim(),
  ];
  if (razorpayValues.some(Boolean) && !razorpayValues.every(Boolean)) {
    errors.push("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be configured together.");
  }

  if (errors.length > 0) {
    throw new Error(`Invalid environment configuration:\n- ${errors.join("\n- ")}`);
  }
};

