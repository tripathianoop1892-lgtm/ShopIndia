import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads/prescriptions folder automatically
const uploadPath = "uploads/prescriptions";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

// Allowed File Types
const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const allowedFileTypes = {
    ".jpg": ["image/jpeg"],
    ".jpeg": ["image/jpeg"],
    ".png": ["image/png"],
    ".pdf": ["application/pdf"],
  };

  if (allowedFileTypes[extension]?.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only JPG, JPEG, PNG and PDF files are allowed."
    )
  );
};

// Upload Middleware
const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export const uploadPrescriptionFile = (req, res, next) => {
  upload.single("prescription")(req, res, (error) => {
    if (!error) return next();

    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        message: "Prescription file must be 5 MB or smaller.",
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message || "Unable to upload prescription file.",
    });
  });
};

export default upload;
