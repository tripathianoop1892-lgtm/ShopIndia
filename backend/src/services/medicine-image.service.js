import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

export const medicineImageDirectory = path.resolve(
  currentDirectory,
  "../../uploads/medicines"
);

fs.mkdirSync(medicineImageDirectory, { recursive: true });

const extensionsByMimeType = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const hasValidSignature = (file) => {
  const buffer = file?.buffer;
  if (!buffer) return false;

  if (file.mimetype === "image/jpeg") {
    return buffer.length >= 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff;
  }

  if (file.mimetype === "image/png") {
    const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    return buffer.length >= pngSignature.length &&
      buffer.subarray(0, pngSignature.length).equals(pngSignature);
  }

  if (file.mimetype === "image/webp") {
    return buffer.length >= 12 &&
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP";
  }

  return false;
};

const publicServerUrl = (req) => {
  const configuredUrl = process.env.PUBLIC_SERVER_URL?.trim().replace(/\/$/, "");
  if (configuredUrl) return configuredUrl;

  return `${req.protocol}://${req.get("host")}`;
};

export const saveMedicineImage = async (file, req) => {
  if (!file) return "";

  if (!hasValidSignature(file)) {
    const error = new Error("The selected file is not a valid JPG, PNG, or WebP image.");
    error.statusCode = 400;
    throw error;
  }

  const extension = extensionsByMimeType[file.mimetype];
  const filename = `${randomUUID()}${extension}`;
  await fs.promises.writeFile(path.join(medicineImageDirectory, filename), file.buffer, {
    flag: "wx",
  });

  return `${publicServerUrl(req)}/api/medicines/images/${filename}`;
};

const localImageFilename = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") return "";

  try {
    const pathname = new URL(imageUrl, "http://local.invalid").pathname;
    const prefix = "/api/medicines/images/";
    if (!pathname.startsWith(prefix)) return "";

    const filename = path.basename(decodeURIComponent(pathname));
    const isGeneratedFilename =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(jpg|png|webp)$/i.test(filename);

    return isGeneratedFilename && filename === decodeURIComponent(pathname.slice(prefix.length))
      ? filename
      : "";
  } catch {
    return "";
  }
};

export const removeMedicineImage = async (imageUrl) => {
  const filename = localImageFilename(imageUrl);
  if (!filename) return;

  try {
    await fs.promises.unlink(path.join(medicineImageDirectory, filename));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn("Unable to remove medicine image:", error.message);
    }
  }
};
