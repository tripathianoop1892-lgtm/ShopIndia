import React, { useEffect, useState } from "react";
import "./CustomerPrescription.css";
import {
  getCustomerPrescriptions,
  getPrescriptionFile,
  uploadPrescription,
} from "../../services/api";

const CustomerPrescription = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);

  // Read Prescription modal
  const [readPrescription, setReadPrescription] = useState(null);
  const [reading, setReading] = useState(false);

  const loadPrescriptions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!user?._id) return;

      const response = await getCustomerPrescriptions(user._id);

      if (response.success) {
        setPrescriptions(response.prescriptions || []);
      }
    } catch (error) {
      console.error("Load prescriptions error:", error);
    }
  };

  useEffect(() => {
    loadPrescriptions();
  }, []);

  // =========================
  // SELECT FILE
  // =========================
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // File validation
    const isImage = selectedFile.type.startsWith("image/");
    const isPdf = selectedFile.type === "application/pdf";

    if (!isImage && !isPdf) {
      alert("Please select an image or PDF prescription.");
      return;
    }

    // Maximum 10 MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("Prescription file must be less than 10 MB.");
      return;
    }

    // Remove previous preview
    if (image) {
      URL.revokeObjectURL(image);
    }

    setFileName(selectedFile.name);
    setFile(selectedFile);

    if (isImage) {
      setImage(URL.createObjectURL(selectedFile));
    } else {
      setImage(null);
    }
  };

  // =========================
  // UPLOAD
  // =========================
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a prescription first.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!user?._id) {
        alert("Please login again.");
        return;
      }

      /*
       * Existing project currently uses user.shopId.
       * Later selected medical shop can be connected here.
       */
      if (!user?.shopId) {
        alert("Please select a medical shop first.");
        return;
      }

      const formData = new FormData();

      formData.append("prescription", file);
      formData.append("customerId", user._id);
      formData.append("customerName", user.name || "");
      formData.append("shopId", user.shopId);

      const data = await uploadPrescription(formData);

      if (data.success) {
        alert("Prescription uploaded successfully.");

        if (image) {
          URL.revokeObjectURL(image);
        }

        setImage(null);
        setFile(null);
        setFileName("");

        await loadPrescriptions();
      } else {
        alert(data.message || "Unable to upload prescription.");
      }
    } catch (error) {
      console.error("Upload prescription error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN ORIGINAL PRESCRIPTION
  // =========================
  const openPrescription = async (id) => {
    try {
      const response = await getPrescriptionFile(id);

      if (!response.ok) {
        throw new Error("Unable to open prescription file.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      window.open(url, "_blank", "noopener,noreferrer");

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60_000);
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to open prescription.");
    }
  };

  // =========================
  // READ PRESCRIPTION
  // =========================
  const handleReadPrescription = async (prescription) => {
    try {
      setReading(true);
      setReadPrescription({
        ...prescription,
        extracted: null,
      });

      /*
       * IMPORTANT:
       *
       * Actual OCR / AI reading will be connected here.
       *
       * Example future API:
       *
       * const response = await readPrescription(prescription._id);
       *
       * setReadPrescription({
       *   ...prescription,
       *   extracted: response.data
       * });
       *
       * For now we do NOT create fake medicine details.
       */

      await new Promise((resolve) => setTimeout(resolve, 500));

      setReadPrescription((prev) => ({
        ...prev,
        extracted: null,
      }));
    } catch (error) {
      console.error("Read prescription error:", error);

      alert("Unable to read prescription.");
      setReadPrescription(null);
    } finally {
      setReading(false);
    }
  };

  // =========================
  // CLOSE READ MODAL
  // =========================
  const closeReadPrescription = () => {
    setReadPrescription(null);
  };

  // =========================
  // REMOVE SELECTED FILE
  // =========================
  const removeSelectedFile = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }

    setImage(null);
    setFile(null);
    setFileName("");
  };

  return (
    <div className="prescription-container">
      <div className="prescription-card">

        {/* =========================
            HEADER
        ========================== */}
        <h2>📷 Upload Prescription</h2>

        <p className="subtitle">
          Upload your doctor's prescription to order medicines easily.
        </p>

        {/* =========================
            UPLOAD OPTIONS
        ========================== */}
        <div className="upload-options">

          {/* Camera */}
          <label className="upload-btn-box">
            📷 Camera

            <input
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={handleFileChange}
            />
          </label>

          {/* Gallery */}
          <label className="upload-btn-box">
            🖼 Gallery

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </label>

          {/* PDF */}
          <label className="upload-btn-box">
            📄 PDF

            <input
              type="file"
              accept=".pdf,application/pdf"
              hidden
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* =========================
            PREVIEW
        ========================== */}
        {image && (
          <div className="preview">
            <img
              src={image}
              alt="Prescription Preview"
            />
          </div>
        )}

        {/* Selected file */}
        {fileName && (
          <p className="filename">
            Selected File: <strong>{fileName}</strong>
          </p>
        )}

        {/* =========================
            BUTTONS
        ========================== */}
        <div className="button-group">

          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={loading || !file}
          >
            {loading ? "Uploading..." : "Upload Prescription"}
          </button>

          <button
            className="remove-btn"
            onClick={removeSelectedFile}
            disabled={!file}
          >
            Remove
          </button>

        </div>

        {/* =========================
            IMPORTANT NOTE
        ========================== */}
        <div className="note">
          <h4>Important</h4>

          <p>
            Please upload a clear and complete prescription.
            Verify medicine details before placing your order.
          </p>

          <p>
            🔍 Prescription reading is only for assistance.
            Always verify the prescription with your doctor or pharmacist.
          </p>
        </div>

        {/* =========================
            PRESCRIPTION HISTORY
        ========================== */}
        <div className="prescription-history">

          <div className="prescription-history-header">
            <h3>Your prescriptions</h3>

            <button
              type="button"
              onClick={loadPrescriptions}
            >
              Refresh
            </button>
          </div>

          {prescriptions.length ? (

            <div className="prescription-history-list">

              {prescriptions.map((prescription) => (

                <div
                  className="prescription-history-row"
                  key={prescription._id}
                >

                  <div className="prescription-history-info">

                    <strong>
                      {prescription.fileType === "pdf"
                        ? "📄 PDF prescription"
                        : "🖼 Image prescription"}
                    </strong>

                    <span>
                      Uploaded{" "}
                      {prescription.createdAt
                        ? new Date(
                            prescription.createdAt
                          ).toLocaleDateString("en-IN")
                        : "-"}
                    </span>

                    <div className="prescription-actions">

                      {/* VIEW ORIGINAL */}
                      <button
                        type="button"
                        className="prescription-file-button"
                        onClick={() =>
                          openPrescription(prescription._id)
                        }
                      >
                        👁 View Prescription
                      </button>

                      {/* READ PRESCRIPTION */}
                      <button
                        type="button"
                        className="prescription-read-button"
                        onClick={() =>
                          handleReadPrescription(prescription)
                        }
                      >
                        🔍 Read Prescription
                      </button>

                    </div>

                  </div>

                  <span
                    className={`prescription-status ${(
                      prescription.status || "Pending"
                    )
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {prescription.status || "Pending"}
                  </span>

                </div>

              ))}

            </div>

          ) : (

            <p className="prescription-empty">
              No prescriptions uploaded yet.
            </p>

          )}

        </div>
      </div>

      {/* =================================================
          READ PRESCRIPTION MODAL
      ================================================== */}
      {readPrescription && (

        <div
          className="prescription-read-overlay"
          onClick={closeReadPrescription}
        >

          <div
            className="prescription-read-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="prescription-read-header">

              <div>
                <h3>🔍 Read Prescription</h3>

                <p>
                  {readPrescription.fileType === "pdf"
                    ? "PDF Prescription"
                    : "Image Prescription"}
                </p>
              </div>

              <button
                type="button"
                className="prescription-close-btn"
                onClick={closeReadPrescription}
              >
                ✕
              </button>

            </div>

            {/* Loading */}
            {reading && (
              <div className="prescription-reading-loader">
                <div className="prescription-spinner"></div>

                <h4>Reading prescription...</h4>

                <p>
                  Please wait while we process the prescription.
                </p>
              </div>
            )}

            {/* Future OCR result */}
            {!reading && !readPrescription.extracted && (

              <div className="prescription-read-empty">

                <div className="read-icon">
                  🔍
                </div>

                <h4>Prescription Reader</h4>

                <p>
                  Medicine names, dosage, duration and doctor's
                  instructions will appear here after the
                  prescription is processed.
                </p>

                <div className="read-info-box">

                  <strong>What will be detected?</strong>

                  <ul>
                    <li>💊 Medicine name</li>
                    <li>🔢 Dosage</li>
                    <li>🕐 Frequency</li>
                    <li>📅 Duration</li>
                    <li>📝 Doctor's instructions</li>
                  </ul>

                </div>

                <p className="read-warning">
                  ⚠️ Always compare the extracted information
                  with the original prescription.
                </p>

              </div>

            )}

            {/* =================================================
                FUTURE EXTRACTED DATA
                ================================================= */}
            {!reading && readPrescription.extracted && (

              <div className="prescription-extracted-data">

                <h4>Prescription Details</h4>

                {readPrescription.extracted.doctorName && (
                  <div className="read-detail-row">
                    <span>Doctor</span>
                    <strong>
                      {readPrescription.extracted.doctorName}
                    </strong>
                  </div>
                )}

                {readPrescription.extracted.medicines?.map(
                  (medicine, index) => (

                    <div
                      className="medicine-read-card"
                      key={index}
                    >

                      <strong>
                        💊 {medicine.name}
                      </strong>

                      <span>
                        Dosage: {medicine.dosage || "-"}
                      </span>

                      <span>
                        Frequency: {medicine.frequency || "-"}
                      </span>

                      <span>
                        Duration: {medicine.duration || "-"}
                      </span>

                    </div>

                  )
                )}

                {readPrescription.extracted.instructions && (
                  <div className="read-instructions">
                    <strong>📝 Instructions</strong>

                    <p>
                      {readPrescription.extracted.instructions}
                    </p>
                  </div>
                )}

              </div>

            )}

            <div className="prescription-read-footer">

              <button
                type="button"
                onClick={() =>
                  openPrescription(readPrescription._id)
                }
              >
                👁 View Original
              </button>

              <button
                type="button"
                onClick={closeReadPrescription}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default CustomerPrescription;