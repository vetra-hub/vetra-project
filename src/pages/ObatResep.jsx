import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ObatResep = () => {
  const [dataResep, setDataResep] = useState([]);
  const [formData, setFormData] = useState({
    keterangan: "",
    gambar: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("dataResep");
    if (savedData) {
      setDataResep(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dataResep", JSON.stringify(dataResep));
  }, [dataResep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, gambar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...dataResep];
      updated[editingIndex] = {
        ...formData,
        id: updated[editingIndex].id,
        created_at: updated[editingIndex].created_at,
      };
      setDataResep(updated);
      setEditingIndex(null);
    } else {
      const newData = {
        id: Date.now(),
        created_at: new Date().toISOString(),
        ...formData,
      };
      setDataResep([...dataResep, newData]);
    }

    setFormData({ keterangan: "", gambar: "" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(dataResep[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const filtered = dataResep.filter((_, i) => i !== index);
    setDataResep(filtered);
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <PageHeader2 title="Obat Resep" />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn bg-[#00d69e] hover:bg-[#00bd8d] text-white"
        >
          {showForm ? "Tutup Form" : "Tambah Data"}
        </button>
      </div>

      {showForm && (
        <div className="card w-full max-w-2xl bg-white shadow-xl mx-auto mb-6">
          <div className="card-body">
            <h2 className="card-title justify-center text-center mb-4 text-blue-700">
              Form Obat Resep
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Keterangan</span>
                </label>
                <textarea
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Gambar</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full"
                />
                {formData.gambar && (
                  <img
                    src={formData.gambar}
                    alt="Preview"
                    className="w-32 h-32 object-cover mt-2 rounded border"
                  />
                )}
              </div>

              <div className="card-actions justify-center mt-4">
                <button type="submit" className="btn btn-primary w-full">
                  {editingIndex !== null ? "Simpan Perubahan" : "Tambah Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {dataResep.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Data Obat Resep
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table w-full">
              <thead className="bg-[#0066ff] text-white text-sm">
                <tr>
                  <th>No</th>
                  <th>Keterangan</th>
                  <th>Gambar</th>
                  <th>Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataResep.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.keterangan}</td>
                    <td>
                      <img
                        src={item.gambar}
                        alt="Resep"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td>{new Date(item.created_at).toLocaleString()}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(index)}
                      >
                        <FiEdit className="text-white" />
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(index)}
                      >
                        <FiTrash2 className="text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ObatResep;
