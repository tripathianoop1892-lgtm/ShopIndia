import React, { useEffect, useRef, useState } from "react";
import "./MedicineImageInput.css";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const MedicineImageInput = ({
  idPrefix,
  imageUrl = "",
  imageFile = null,
  onImageUrlChange,
  onImageFileChange,
}) => {
  const fileInputRef = useRef(null);
  const [localPreview, setLocalPreview] = useState({ file: null, url: "" });
  const [failedPreviewUrl, setFailedPreviewUrl] = useState("");
  const previewUrl = imageFile && localPreview.file === imageFile
    ? localPreview.url
    : imageUrl;

  useEffect(() => {
    const previewToRevoke = localPreview.url;
    return () => {
      if (previewToRevoke) URL.revokeObjectURL(previewToRevoke);
    };
  }, [localPreview.url]);

  useEffect(() => {
    if (!imageFile && fileInputRef.current) fileInputRef.current.value = "";
  }, [imageFile]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      onImageFileChange(null);
      return;
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      event.target.value = "";
      onImageFileChange(null);
      alert("Please select a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      event.target.value = "";
      onImageFileChange(null);
      alert("Medicine image must be 5 MB or smaller.");
      return;
    }

    setLocalPreview({ file, url: URL.createObjectURL(file) });
    onImageFileChange(file);
  };

  const clearSelectedFile = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    onImageFileChange(null);
  };

  return (
    <div className="medicine-image-input">
      <label htmlFor={`${idPrefix}-file`}>Medicine image</label>
      <input
        ref={fileInputRef}
        id={`${idPrefix}-file`}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
      />
      <small>Upload JPG, PNG, or WebP. Maximum size: 5 MB.</small>

      {imageFile && (
        <button type="button" className="medicine-image-clear" onClick={clearSelectedFile}>
          Remove selected file
        </button>
      )}

      <span className="medicine-image-divider">or use an image URL</span>
      <input
        id={`${idPrefix}-url`}
        type="url"
        value={imageUrl}
        onChange={(event) => onImageUrlChange(event.target.value)}
        placeholder="Paste an HTTPS image URL"
      />

      {previewUrl && failedPreviewUrl !== previewUrl && (
        <div className="medicine-image-preview">
          <img
            src={previewUrl}
            alt="Medicine preview"
            onError={() => setFailedPreviewUrl(previewUrl)}
          />
        </div>
      )}
    </div>
  );
};

export default MedicineImageInput;
