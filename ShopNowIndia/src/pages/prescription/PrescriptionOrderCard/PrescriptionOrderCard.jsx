import React, { useMemo, useState } from "react";
import "./PrescriptionOrderCard.css";

const PrescriptionOrderCard = ({
  prescriptionOrder = [],
  selectedPrescriptionMedicines = [],
  onToggleMedicine,
  onContinue,
  checkoutMode = false,
  onBackToMedicines,
  onProceedToAddress,
}) => {
  const [quantities, setQuantities] = useState({});

  const selectedItems = prescriptionOrder.filter(
    (item) =>
      item.available &&
      item.matchedMedicine?._id &&
      selectedPrescriptionMedicines.includes(item.matchedMedicine._id)
  );

  const getPrice = (medicine) => {
    return Number(
      medicine?.retailPrice ||
        medicine?.price ||
        medicine?.mrp ||
        0
    );
  };

  const getQuantity = (medicineId) => {
    return quantities[medicineId] || 1;
  };

  const updateQuantity = (medicineId, value) => {
    const quantity = Math.max(1, Number(value) || 1);

    setQuantities((prev) => ({
      ...prev,
      [medicineId]: quantity,
    }));
  };

  const totalAmount = useMemo(() => {
    return selectedItems.reduce((total, item) => {
      const medicine = item.matchedMedicine;
      const medicineId = medicine?._id;

      const price = getPrice(medicine);
      const quantity = quantities[medicineId] || 1;

      return total + price * quantity;
    }, 0);
  }, [selectedItems, quantities]);

  if (!prescriptionOrder.length) return null;

  // ==============================
  // CHECKOUT / ORDER SUMMARY MODE
  // ==============================
  if (checkoutMode) {
    return (
      <div className="prescription-order-card">
        <div className="prescription-order-header">
          <h3>🧾 Prescription Order Summary</h3>

          <p>
            Aapne prescription ke according jo medicines select
            ki hain unka order summary neeche hai.
          </p>
        </div>

        {selectedItems.length === 0 ? (
          <div className="prescription-order-unavailable">
            ❌ Koi medicine select nahi hai.
          </div>
        ) : (
          <>
            <div className="prescription-order-list">
              {selectedItems.map((item, index) => {
                const medicine = item.matchedMedicine;
                const prescriptionMedicine =
                  item.prescriptionMedicine;

                const medicineId = medicine?._id;

                const price = getPrice(medicine);
                const quantity = getQuantity(medicineId);
                const itemTotal = price * quantity;

                return (
                  <div
                    className="prescription-order-item"
                    key={`${medicineId}-${index}`}
                  >
                    <div className="prescription-order-info">
                      <h4>
                        💊{" "}
                        {prescriptionMedicine?.name ||
                          medicine?.name ||
                          "Medicine"}
                      </h4>

                      <div className="prescription-medicine-details">
                        <span>
                          🧪 Salt / Formula:{" "}
                          {prescriptionMedicine?.salt || "-"}
                        </span>

                        <span>
                          💪 Strength:{" "}
                          {prescriptionMedicine?.strength || "-"}
                        </span>

                        <span>
                          💊 Dosage Form:{" "}
                          {prescriptionMedicine?.dosageForm || "-"}
                        </span>

                        <span>
                          📏 Dosage:{" "}
                          {prescriptionMedicine?.dosage || "-"}
                        </span>

                        <span>
                          🕐 Frequency:{" "}
                          {prescriptionMedicine?.frequency || "-"}
                        </span>

                        <span>
                          📅 Duration:{" "}
                          {prescriptionMedicine?.duration || "-"}
                        </span>
                      </div>

                      <div className="prescription-order-available">
                        <strong>₹{price}</strong>

                        <span>
                          ₹{price} × {quantity} = ₹{itemTotal}
                        </span>
                      </div>
                    </div>

                    <div className="prescription-order-select">
                      <label>Quantity</label>

                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          updateQuantity(
                            medicineId,
                            e.target.value
                          )
                        }
                        style={{
                          width: "70px",
                          padding: "8px",
                          border: "1px solid #d0d5dd",
                          borderRadius: "6px",
                          textAlign: "center",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="prescription-order-bottom">
              <div>
                <strong>
                  Total Medicines: {selectedItems.length}
                </strong>

                <br />

                <strong>
                  Total Amount: ₹{totalAmount}
                </strong>
              </div>

              <button
                type="button"
                onClick={onProceedToAddress}
                disabled={!selectedItems.length}
              >
                Proceed to Address →
              </button>
            </div>

            <div
              style={{
                marginTop: "12px",
                textAlign: "left",
              }}
            >
              <button
                type="button"
                onClick={onBackToMedicines}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                ← Back to Medicines
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // ==============================
  // MEDICINE SELECTION MODE
  // ==============================
  return (
    <div className="prescription-order-card">
      <div className="prescription-order-header">
        <h3>🛒 Prescription Order</h3>

        <p>
          Doctor ki prescription ke according medicines verify
          karke order karein.
        </p>
      </div>

      <div className="prescription-order-list">
        {prescriptionOrder.map((item, index) => {
          const medicine = item.matchedMedicine;
          const prescriptionMedicine =
            item.prescriptionMedicine;

          const medicineId = medicine?._id;

          const price = getPrice(medicine);

          const isSelected =
            medicineId &&
            selectedPrescriptionMedicines.includes(medicineId);

          return (
            <div
              className="prescription-order-item"
              key={`${medicineId || "medicine"}-${index}`}
            >
              <div className="prescription-order-info">
                <h4>
                  💊{" "}
                  {prescriptionMedicine?.name ||
                    "Medicine name not detected"}
                </h4>

                <div className="prescription-medicine-details">
                  <span>
                    🧪 Salt / Formula:{" "}
                    {prescriptionMedicine?.salt || "-"}
                  </span>

                  <span>
                    💪 Strength:{" "}
                    {prescriptionMedicine?.strength || "-"}
                  </span>

                  <span>
                    💊 Dosage Form:{" "}
                    {prescriptionMedicine?.dosageForm || "-"}
                  </span>

                  <span>
                    📏 Dosage:{" "}
                    {prescriptionMedicine?.dosage || "-"}
                  </span>

                  <span>
                    🕐 Frequency:{" "}
                    {prescriptionMedicine?.frequency || "-"}
                  </span>

                  <span>
                    📅 Duration:{" "}
                    {prescriptionMedicine?.duration || "-"}
                  </span>
                </div>

                {item.available && medicine ? (
                  <div className="prescription-order-available">
                    <strong>💰 ₹{price}</strong>

                    <span>✅ Available</span>
                  </div>
                ) : (
                  <div className="prescription-order-unavailable">
                    ❌ Not Available
                  </div>
                )}
              </div>

              {item.available && medicine && (
                <div className="prescription-order-select">
                  <label>
                    <input
                      type="checkbox"
                      checked={Boolean(isSelected)}
                      onChange={() =>
                        onToggleMedicine?.(medicineId)
                      }
                    />

                    <span>Select / Add</span>
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="prescription-order-bottom">
        <strong>
          Selected: {selectedPrescriptionMedicines.length} medicine(s)
        </strong>

        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedPrescriptionMedicines.length}
        >
          Continue to Order →
        </button>
      </div>
    </div>
  );
};

export default PrescriptionOrderCard;
