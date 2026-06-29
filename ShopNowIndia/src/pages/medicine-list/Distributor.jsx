import React, { useEffect, useState } from "react";
import "./Distributor.css";
import {
  updateMedicine,
<<<<<<< HEAD
  MedicinesList,
  deleteMedicine
=======
  MedicinesList
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
} from "../../services/api";

const Distributor = () => {

  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [editId, setEditId] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // FETCH DATA
  const fetchData = async () => {

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

      await updateMedicine(id, med);

      setEditId(null);

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

<<<<<<< HEAD
      await deleteMedicine(id);
=======
      await fetch(
        `http://localhost:5000/api/medicines/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec

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
      <table>

        <thead>

          <tr>

            <th>Medicine</th>
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
<<<<<<< HEAD
        m.mfd
          ? m.mfd.slice(0, 10)
=======
        m.mfgDate
          ? m.mfgDate.slice(0, 10)
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
          : ""
      }
      onChange={(e) =>
        handleChange(
          e,
          m._id,
<<<<<<< HEAD
          "mfd"
=======
          "mfgDate"
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
        )
      }
    />

  ) : (

<<<<<<< HEAD
    m.mfd
      ? new Date(
          m.mfd
=======
    m.mfgDate
      ? new Date(
          m.mfgDate
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
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
<<<<<<< HEAD
                       m.expiry
  ? m.expiry.slice(0, 10)
=======
                       m.expDate
  ? m.expDate.slice(0, 10)
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
  : ""
                      }
                      onChange={(e) =>
                        handleChange(
                          e,
                          m._id,
<<<<<<< HEAD
                          "expiry"
=======
                          "expDate"
>>>>>>> b86c523e91986f3d0f5bd24f9a30cb204ae6c3ec
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

              <td colSpan="7">
                No Medicines Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default Distributor;