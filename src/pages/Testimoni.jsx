import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { testimoni } from "../services/testimoni";

const Testimoni = () => {
  const [dataTestimoni, setDataTestimoni] = useState([]);
  const [formData, setFormData] = useState({
    pelanggan_id: "",
    qoute: "",
    is_approved: false,
    rating: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await testimoni.fetchTestimoni();
      setDataTestimoni(data);
    } catch (error) {
      console.error("Gagal mengambil data testimoni:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await testimoni.updateTestimoni(editingId, formData);
      } else {
        const newData = {
          ...formData,
          created_at: new Date().toISOString(),
        };
        await testimoni.createTestimoni(newData);
      }
      setFormData({
        pelanggan_id: "",
        qoute: "",
        is_approved: false,
        rating: 0,
      });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await testimoni.deleteTestimoni(id);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  const filteredTestimoni = dataTestimoni.filter((item) =>
    (item.qoute || "").toLowerCase().includes((keyword || "").toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <PageHeader2 title="Testimoni Pelanggan" />

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari testimoni..."
          className="input input-bordered w-full max-w-sm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          onClick={() => {
            setFormData({
              pelanggan_id: "",
              qoute: "",
              is_approved: false,
              rating: 0,
            });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="btn bg-[#00d69e] hover:bg-[#00bd8d] text-white ml-4"
        >
          {showForm ? "Tutup Form" : "Tambah Data"}
        </button>
      </div>

      {showForm && (
        <div className="card w-full max-w-2xl bg-white shadow-xl mx-auto mb-6">
          <div className="card-body">
            <h2 className="card-title justify-center text-center mb-4 text-blue-700">
              Form Testimoni
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">ID Pelanggan</span>
                </label>
                <input
                  type="text"
                  name="pelanggan_id"
                  value={formData.pelanggan_id}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Qoute</span>
                </label>
                <textarea
                  name="qoute"
                  value={formData.qoute}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Rating</span>
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    min={0}
                    max={5}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2 mt-8">
                  <input
                    type="checkbox"
                    name="is_approved"
                    checked={formData.is_approved}
                    onChange={handleChange}
                    className="checkbox"
                  />
                  <label className="label-text">Disetujui</label>
                </div>
              </div>

              <div className="card-actions justify-center mt-4">
                <button type="submit" className="btn btn-primary w-full">
                  {editingId !== null ? "Simpan Perubahan" : "Tambah Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {filteredTestimoni.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Daftar Testimoni</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table w-full">
              <thead className="bg-[#0066ff] text-white text-sm">
                <tr>
                  <th>No</th>
                  <th>Pelanggan ID</th>
                  <th>Qoute</th>
                  <th>Rating</th>
                  <th>Disetujui</th>
                  <th>Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTestimoni.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.pelanggan_id}</td>
                    <td>{item.qoute}</td>
                    <td>{item.rating}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.is_approved ? "badge-success" : "badge-error"
                        }`}
                      >
                        {item.is_approved ? "Ya" : "Tidak"}
                      </span>
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

export default Testimoni;
