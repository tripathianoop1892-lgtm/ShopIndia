const readSetting = (name, fallback) => {
  const value = import.meta.env[name]?.trim();
  return value || fallback;
};

export const businessDetails = Object.freeze({
  brandName: "OmSanjeevani",
  ownerName: readSetting("VITE_BUSINESS_OWNER_NAME", "Anoop Kumar Tripathi"),
  businessType: readSetting("VITE_BUSINESS_TYPE", "Individual-owned, unregistered business"),
  businessAddress: readSetting("VITE_BUSINESS_ADDRESS", "Laxmi Nagar, Delhi 110092, India"),
  supportEmail: readSetting("VITE_SUPPORT_EMAIL", "admin@om-sanjeevani.com"),
  supportPhone: readSetting("VITE_SUPPORT_PHONE", "+91 6204872422"),
  website: "https://om-sanjeevani.com",
  businessHours: "Monday to Saturday, 09:00 AM to 06:00 PM IST",
  grievanceOfficer: readSetting("VITE_GRIEVANCE_OFFICER_NAME", "Anoop Kumar Tripathi"),
  grievanceDesignation: readSetting("VITE_GRIEVANCE_OFFICER_DESIGNATION", "Grievance Officer"),
  grievanceEmail: readSetting("VITE_GRIEVANCE_EMAIL", "admin@om-sanjeevani.com"),
  policyUpdatedAt: "5 October 2026",
});
