import React, { useState } from "react";
import "./CustomerPrescription.css";
import { uploadPrescription } from "../../services/api";

const CustomerPrescription = () => {
  const [image, setImage] = useState(null);
const [fileName, setFileName] = useState("");
const [file, setFile] = useState(null);
const [loading, setLoading] = useState(false);
 const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setFileName(file.name);
  setFile(file);

  if (file.type.startsWith("image")) {
    setImage(URL.createObjectURL(file));
  } else {
    setImage(null);
  }
};
const handleUpload = async () => {
  if (!file) {
    alert("Please select a prescription first.");
    return;
  }

  try {
    setLoading(true);
    

    const user = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();

    formData.append("prescription", file);
    formData.append("customerId", user._id);
    formData.append("customerName", user.name);
    formData.append("shopId", user.shopId);

    const data = await uploadPrescription(formData);

    if (data.success) {
      alert("Prescription uploaded successfully.");

      setImage(null);
      setFile(null);
      setFileName("");
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Upload failed.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="prescription-container">

      <div className="prescription-card">

        <h2>📷 Upload Prescription</h2>

        <p className="subtitle">
          Upload your doctor's prescription to order medicines easily.
        </p>

        <div className="upload-options">

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

              <label className="upload-btn-box">

                         🖼 Gallery

                <input
                    type="file"
                    accept="image/*"
                     hidden
                    onChange={handleFileChange}
                         />

                     </label>

                  <label className="upload-btn-box">

                           📄 PDF

                   <input
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={handleFileChange}
                             />

                       </label>

                   </div>

        {image && (
          <div className="preview">
            <img src={image} alt="Prescription Preview" />
          </div>
        )}
                    {fileName && (
                    <p className="filename">
                    Selected File : {fileName}
                  </p>
        )}
        <div className="button-group">
          <button
               className="upload-btn"
               onClick={handleUpload}
                >
               {loading ? "Uploading..." : "Upload Prescription"}
               </button>

          <button
            className="remove-btn"
                 onClick={() => {
                                 setImage(null);
                                  setFile(null);
                                setFileName("");
                     }}
               >
                           Remove
                        </button>
        </div>

        <div className="note">
          <h4>Important</h4>

          <p>
            Please upload a clear and complete prescription.
            Verify medicine details before placing your order.
          </p>
        </div>

      </div>

    </div>
  );
};

export default CustomerPrescription;