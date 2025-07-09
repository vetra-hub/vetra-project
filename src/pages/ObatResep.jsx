import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { obatresep } from "../services/obatresep";

const ObatResep = () => {
  const [dataResep, setDataResep] = useState([]);
  const [formData, setFormData] = useState({ keterangan: "", gambar: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await obatresep.fetchObatResep();
      setDataResep(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar" && files.length > 0) {
      const base64 = await convertToBase64(files[0]);
      setFormData((prev) => ({ ...prev, gambar: base64 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.keterangan || !formData.gambar) {
      alert("Keterangan dan gambar wajib diisi.");
      return;
    }

    try {
      if (editingId) {
        await obatresep.updateObatResep(editingId, {
          keterangan: formData.keterangan,
          gambar: formData.gambar,
        });
      } else {
        await obatresep.createObatResep({
          keterangan: formData.keterangan,
          gambar: formData.gambar,
        });
      }

      setFormData({ keterangan: "", gambar: "" });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error("Gagal menyimpan data:", error?.response?.data || error.message);
      alert("Terjadi kesalahan saat menyimpan data. Cek console.");
    }
  };

  const handleEdit = (item) => {
    setFormData({ keterangan: item.keterangan, gambar: item.gambar });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await obatresep.deleteObatResep(id);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <PageHeader2 title="Obat Resep" />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setFormData({ keterangan: "", gambar: "" });
            setEditingId(null);
            setShowForm(!showForm);
          }}
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
                  name="gambar"
                  accept="image/*"
                  onChange={handleChange}
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
                  {editingId ? "Simpan Perubahan" : "Tambah Data"}
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
                      {item.gambar && (
                        <img
                          src={item.gambar}
                          alt="Resep"
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td>{new Date(item.created_at).toLocaleString()}</td>
                    <td className="flex gap-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(item)}
                      >
                        <FiEdit className="text-white" />
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(item.id)}
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
