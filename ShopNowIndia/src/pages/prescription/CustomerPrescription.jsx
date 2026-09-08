import React, { useEffect, useState } from "react";
import "./CustomerPrescription.css";
import PrescriptionOrderCard from "./PrescriptionOrderCard/PrescriptionOrderCard";
import {
  getCustomerPrescriptions,
  getPrescriptionFile,
  uploadPrescription,
  readPrescription as readPrescriptionAPI,
  deletePrescription,
  MedicinesList,
  addToCart,
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
  const [prescriptionOrder, setPrescriptionOrder] = useState(null);
  const [readPrescriptionCache, setReadPrescriptionCache] = useState({});
  const [selectedPrescriptionMedicines, setSelectedPrescriptionMedicines] = useState([]);
  const [prescriptionCheckoutMode, setPrescriptionCheckoutMode] = useState(false);

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
// DELETE PRESCRIPTION
// =========================
const handleDeletePrescription = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this prescription?"
  );

  if (!confirmed) return;

  try {
    const response = await deletePrescription(id);

    if (!response?.success) {
      throw new Error(
        response?.message || "Unable to delete prescription."
      );
    }

    alert("Prescription deleted successfully.");

    await loadPrescriptions();
  } catch (error) {
    console.error("Delete prescription error:", error);

    alert(
      error?.message ||
        "Unable to delete prescription. Please try again."
    );
  }
};
  // =========================
// READ PRESCRIPTION
// =========================
const handleReadPrescription = async (prescription) => {
  try {
    setReading(true);
   const cached = readPrescriptionCache[prescription._id];

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

if (cached && Date.now() - cached.cachedAt < CACHE_DURATION) {
  setReadPrescription({
    ...prescription,
    extracted: cached.extracted,
    readError: null,
  });

  setReading(false);
  return;
}

if (cached) {
  setReadPrescriptionCache((prev) => {
    const updated = { ...prev };
    delete updated[prescription._id];
    return updated;
  });
}

    // Open reader modal immediately
    setReadPrescription({
      ...prescription,
      extracted: null,
      readError: null,
    });

    // Actual backend OCR / AI API
    const response = await readPrescriptionAPI(prescription._id);

    if (!response?.success) {
      throw new Error(
        response?.message || "Unable to read prescription."
      );
    }
    
    const extractedData = response.extracted || response.data || null;
setReadPrescriptionCache((prev) => ({
  ...prev,
  [prescription._id]: {
    extracted: extractedData,
    cachedAt: Date.now(),
  },
}));
    setReadPrescription((prev) => ({
      ...prev,
      extracted: response.extracted || response.data || null,
      readError: null,
    }));
  } catch (error) {
    console.error("Read prescription error:", error);

    setReadPrescription((prev) => ({
      ...prev,
      extracted: null,
      readError:
        error.message ||
        "Prescription could not be read. Please check the original prescription.",
    }));
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
// ORDER MEDICINES FROM PRESCRIPTION
// =========================
const handleOrderMedicines = async () => {
  try {
    const extractedMedicines =
      readPrescription?.extracted?.medicines;

    if (!extractedMedicines?.length) {
      alert("Prescription में कोई medicine detect नहीं हुई.");
      return;
    }

    // Customer ke current shop ka medicine catalog
   const catalog = await MedicinesList();

const customerMedicines = Array.isArray(catalog)
  ? catalog
  : Array.isArray(catalog?.medicines)
  ? catalog.medicines
  : Array.isArray(catalog?.data)
  ? catalog.data
  : Array.isArray(catalog?.data?.medicines)
  ? catalog.data.medicines
  : [];

      if (!customerMedicines.length) {
      alert("Customer dashboard में कोई medicine उपलब्ध नहीं है.");
      return;
    }

    const orderMedicines = extractedMedicines.map(
      (prescriptionMedicine) => {
        const prescriptionName = String(
          prescriptionMedicine?.name || ""
        )
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");

        const prescriptionStrength = String(
          prescriptionMedicine?.strength || ""
        )
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");

        const prescriptionForm = String(
          prescriptionMedicine?.dosageForm || ""
        )
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");

        const matchedMedicine = customerMedicines.find(
          (medicine) => {
            const medicineName = String(
              medicine?.name || ""
            )
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "");

            const medicineStrength = String(
              medicine?.strength || ""
            )
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "");

            const medicineType = String(
              medicine?.type || ""
            )
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "");

            const nameMatch =
              medicineName === prescriptionName;

            const strengthMatch =
              !prescriptionStrength ||
              !medicineStrength ||
              medicineStrength === prescriptionStrength;

            const formMatch =
              !prescriptionForm ||
              !medicineType ||
              medicineType === prescriptionForm;

            return (
              nameMatch &&
              strengthMatch &&
              formMatch
            );
          }
        );

        return {
          prescriptionMedicine,
          matchedMedicine: matchedMedicine || null,
          available: Boolean(matchedMedicine),
        };
      }
    );

    setPrescriptionOrder(orderMedicines);

    // Available medicines ko automatically select karna
    const availableMedicineIds = orderMedicines
      .filter(
        (item) =>
          item.available &&
          item.matchedMedicine?._id
      )
      .map(
        (item) => item.matchedMedicine._id
      );

    setSelectedPrescriptionMedicines(
      availableMedicineIds
    );
  } catch (error) {
    console.error(
      "Order medicines error:",
      error
    );

    alert(
      error?.message ||
        "Prescription medicines check नहीं हो सकीं."
    );
  }
};  
const togglePrescriptionMedicine = (medicineId) => {
  setSelectedPrescriptionMedicines((prev) =>
    prev.includes(medicineId)
      ? prev.filter((id) => id !== medicineId)
      : [...prev, medicineId]
  );
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

                      {/* DELETE PRESCRIPTION */}
               <button
              type="button"
              className="prescription-delete-button"
              onClick={() =>
             handleDeletePrescription(prescription._id)
                 }
               >
             🗑 Delete Prescription
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

{/* READ ERROR */}
{!reading && readPrescription.readError && (
  <div className="prescription-read-error">
    <div className="read-icon">⚠️</div>

    <h4>Prescription read नहीं हो पाई</h4>

    <p>{readPrescription.readError}</p>

    <p className="read-warning">
      कृपया original prescription को ध्यान से देखें या
      साफ image/PDF upload करें।
    </p>

    <button
      type="button"
      className="prescription-read-retry"
      onClick={() => handleReadPrescription(readPrescription)}
    >
      🔄 Try Again
    </button>
  </div>
)}

            {/* Future OCR result */}
            {!reading &&
  !readPrescription.extracted &&
  !readPrescription.readError && (

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
  💊 {medicine.name || "Medicine name not detected"}
</strong>

<span>
  🧪 Salt / Formula: {medicine.salt || "-"}
</span>

<span>
  💪 Strength: {medicine.strength || "-"}
</span>

<span>
  💊 Dosage Form: {medicine.dosageForm || "-"}
</span>

<span>
  📏 Dosage: {medicine.dosage || "-"}
</span>

<span>
  🕐 Frequency: {medicine.frequency || "-"}
</span>

<span>
  📅 Duration: {medicine.duration || "-"}
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
            
         {prescriptionOrder && (
  <PrescriptionOrderCard
    prescriptionOrder={prescriptionOrder}
    selectedPrescriptionMedicines={
      selectedPrescriptionMedicines
    }
    onToggleMedicine={
      togglePrescriptionMedicine
    }
    onContinue={() => {
      setPrescriptionCheckoutMode(true);
    }}
    checkoutMode={prescriptionCheckoutMode}
    onBackToMedicines={() => {
      setPrescriptionCheckoutMode(false);
    }}
    onProceedToAddress={() => {
      alert("Address step next.");
    }}
  />
)}
            <div className="prescription-read-footer">

  <button
  type="button"
  onClick={handleOrderMedicines}
>
  🛒 Order Medicines
</button>

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