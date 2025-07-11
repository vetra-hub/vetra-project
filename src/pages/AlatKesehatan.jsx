import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { alkes } from "../services/alkes";

const AlatKesehatan = () => {
  const [dataAlkes, setDataAlkes] = useState([]);
  const [formData, setFormData] = useState({
    nama_alkes: "",
    stok_alkes: 0,
    harga_alkes: 0,
    gambar: "",
    kategori: "",
    deskripsi: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await alkes.fetchAlkes();
      setDataAlkes(data);
    } catch (error) {
      console.error("Gagal mengambil data alat kesehatan:", error);
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
    try {
      if (editingId !== null) {
        await alkes.updateAlkes(editingId, formData);
      } else {
        const newData = {
          ...formData,
          created_at: new Date().toISOString(),
        };
        await alkes.createAlkes(newData);
      }
      setFormData({
        nama_alkes: "",
        stok_alkes: 0,
        harga_alkes: 0,
        gambar: "",
        kategori: "",
        deskripsi: "",
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
      await alkes.deleteAlkes(id);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  const filteredAlkes = dataAlkes.filter((item) =>
    (item.nama_alkes || "").toLowerCase().includes((keyword || "").toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <PageHeader2 title="Alat Kesehatan" />

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari nama alat kesehatan..."
          className="input input-bordered w-full max-w-sm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          onClick={() => {
            setFormData({
              nama_alkes: "",
              stok_alkes: 0,
              harga_alkes: 0,
              gambar: "",
              kategori: "",
              deskripsi: "",
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
              Form Alat Kesehatan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Nama Alkes</span>
                  </label>
                  <input
                    type="text"
                    name="nama_alkes"
                    value={formData.nama_alkes}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Stok</span>
                  </label>
                  <input
                    type="number"
                    name="stok_alkes"
                    value={formData.stok_alkes}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Harga</span>
                  </label>
                  <input
                    type="number"
                    name="harga_alkes"
                    value={formData.harga_alkes}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Upload Gambar</span>
                  </label>
                  <input
                    type="file"
                    name="gambar"
                    accept="image/*"
                    onChange={handleChange}
                    className="file-input file-input-bordered w-full"
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Kategori</span>
                </label>
                <input
                  type="text"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Deskripsi</span>
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                ></textarea>
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

      {filteredAlkes.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Data Alat Kesehatan
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table w-full">
              <thead className="bg-[#0066ff] text-white text-sm">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Stok</th>
                  <th>Harga</th>
                  <th>Gambar</th>
                  <th>Kategori</th>
                  <th>Deskripsi</th>
                  <th>Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlkes.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama_alkes}</td>
                    <td>{item.stok_alkes}</td>
                    <td>{item.harga_alkes}</td>
                    <td>
                      {item.gambar && (
                        <img
                          src={item.gambar}
                          alt={item.nama_alkes}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td>{item.kategori}</td>
                    <td>{item.deskripsi}</td>
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

export default AlatKesehatan;
