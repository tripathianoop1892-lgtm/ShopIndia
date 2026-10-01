import path from "path";
import { fileURLToPath } from "url";

const configDirectory = path.dirname(fileURLToPath(import.meta.url));

export const backendDirectory = path.resolve(configDirectory, "../..");
export const prescriptionUploadDirectory = path.join(
  backendDirectory,
  "uploads",
  "prescriptions"
);

