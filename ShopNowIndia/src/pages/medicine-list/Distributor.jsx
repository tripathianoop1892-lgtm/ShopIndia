import React, { useEffect, useState } from "react";
import "./Distributor.css";
import {
  updateMedicine,
  MedicinesList,
  deleteMedicine
} from "../../services/api";
import MedicineImageInput from "../../components/MedicineImageInput/MedicineImageInput";

const Distributor = () => {

  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [editId, setEditId] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [imageFiles, setImageFiles] = useState({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchData();
  }, []);

  // FETCH DATA
  async function fetchData() {

    try {

      const res = await MedicinesList();

      console.log("Medicine API Response:", res);

      // 🔥 FIXED
      setMedicines(

        Array.isArray(res?.medicines)
          ? res.medicines
          : Array.isArray(res)
          ? res
          : []

      );

    } catch (err) {

      console.log(err);
      setMedicines([]);

    }
  };

  // SEARCH
  const filteredData = search

    ? medicines.filter(
        (item) =>

          item.name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

          item.type
            ?.toLowerCase()
            .includes(search.toLowerCase())
      )

    : medicines;

  // CHANGE INPUT
  const handleChange = (e, id, field) => {

    const value = e.target.value;

    setMedicines((prev) =>

      prev.map((item) =>

        item._id === id

          ? {
              ...item,
              [field]: value
            }

          : item
      )
    );
  };

  // SAVE
  const handleSave = async (id) => {

    try {

      const med = medicines.find(
        (m) => m._id === id
      );

      const response = await updateMedicine(id, {
        ...med,
        imageFile: imageFiles[id] || null,
      });

      if (!response?.success) {
        alert(response?.message || "Unable to update medicine");
        return;
      }

      setEditId(null);
      setImageFiles((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });

      fetchData();

    } catch (err) {

      console.log(err);

    }
  };

  // SELECT CHECKBOX
  const toggleSelect = (id) => {

    setSelectedMedicines((prev) =>

      prev.includes(id)

        ? prev.filter(
            (item) => item !== id
          )

        : [...prev, id]
    );
  };

  // DELETE
  const handleDelete = async (id) => {

    try {

      const confirmDelete =
        window.confirm(
          "Delete this medicine?"
        );

      if (!confirmDelete) return;

      await deleteMedicine(id);

      fetchData();

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div className="medicine-container">

      <h2>
        My Medicines
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search medicine..."
        className="search-bar"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* TABLE */}
      <div className="medicine-table-scroll" role="region" aria-label="Medicine inventory table" tabIndex="0">
      <table>

        <thead>

          <tr>

            <th>Medicine</th>
            <th>Image</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
            <th>MFD</th>
            <th>Expiry</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredData.length > 0 ? (

            filteredData.map((m) => (

              <tr key={m._id}>

                {/* NAME */}
                <td className="medicine-name">

                  <input
                    type="checkbox"
                    checked={selectedMedicines.includes(m._id)}
                    onChange={() =>
                      toggleSelect(m._id)
                    }
                  />

                  {m.name}

                </td>

                <td>
                  {editId === m._id ? (
                    <MedicineImageInput
                      idPrefix={`distributor-edit-image-${m._id}`}
                      imageUrl={m.image || ""}
                      imageFile={imageFiles[m._id] || null}
                      onImageUrlChange={(image) => {
                        setMedicines((current) => current.map((item) =>
                          item._id === m._id ? { ...item, image } : item
                        ));
                      }}
                      onImageFileChange={(file) => {
                        setImageFiles((current) => ({ ...current, [m._id]: file }));
                      }}
                    />
                  ) : m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      className="medicine-list-image"
                      onError={(event) => { event.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    "—"
                  )}
                </td>

                {/* TYPE */}
                <td>

                  {editId === m._id ? (

                    <input
                      type="text"
                      value={m.type || ""}
                      onChange={(e) =>
                        handleChange(
                          e,
                          m._id,
                          "type"
                        )
                      }
                    />

                  ) : (

                    m.type || "N/A"

                  )}

                </td>

                {/* PRICE */}
                <td>

                  {editId === m._id ? (

                    <input
                      type="number"
                      value={
                        m.offerPrice ||
                        m.price ||
                        m.mrp ||
                        0
                      }
                      onChange={(e) =>
                        handleChange(
                          e,
                          m._id,
                          "offerPrice"
                        )
                      }
                    />

                  ) : (

                    <>₹{
                      m.offerPrice ||
                      m.price ||
                      m.mrp ||
                      0
                    }</>

                  )}

                </td>

                {/* STOCK */}
                <td>

                  {editId === m._id ? (

                    <input
                      type="number"
                      value={m.stock || ""}
                      onChange={(e) =>
                        handleChange(
                          e,
                          m._id,
                          "stock"
                        )
                      }
                    />

                  ) : (

                    m.stock

                  )}

                </td>

                {/* MFD */}
               <td>

  {editId === m._id ? (

    <input
      type="date"
      value={
        m.mfd
          ? m.mfd.slice(0, 10)
          : ""
      }
      onChange={(e) =>
        handleChange(
          e,
          m._id,
          "mfd"
        )
      }
    />

  ) : (

    m.mfd
      ? new Date(
          m.mfd
        ).toLocaleDateString()
      : "N/A"

  )}

</td>
                {/* EXPIRY */}
                <td>

                  {editId === m._id ? (

                    <input
                      type="date"
                      value={
                       m.expiry
  ? m.expiry.slice(0, 10)
  : ""
                      }
                      onChange={(e) =>
                        handleChange(
                          e,
                          m._id,
                          "expiry"
                        )
                      }
                    />

                  ) : (

                    m.expiry
                      ? new Date(
                          m.expiry
                        ).toLocaleDateString()
                      : "N/A"

                  )}

                </td>

                {/* ACTION */}
                <td className="action-buttons">

                  <button
                    className="edit-btn"

                    onClick={() => {

                      if (
                        editId === m._id
                      ) {

                        handleSave(
                          m._id
                        );

                      } else {

                        setEditId(
                          m._id
                        );

                      }

                    }}
                  >

                    {editId === m._id
                      ? "Save"
                      : "Edit"}

                  </button>

                  {/* DELETE */}
                  {selectedMedicines.includes(m._id) && (

                    <button
                      className="delete-btn"

                      onClick={() =>
                        handleDelete(m._id)
                      }
                    >
                      Delete
                    </button>

                  )}

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="8">
                No Medicines Found
              </td>

            </tr>

          )}

        </tbody>

      </table>
      </div>

    </div>
  );
};

export default Distributor;
