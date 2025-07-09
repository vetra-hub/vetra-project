// DaftarObat.jsx (FULL FIXED - sesuai dengan Supabase API via obat.js)

import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { obat } from "../services/obat";

const DaftarObat = () => {
  const [dataObat, setDataObat] = useState([]);
  const [formData, setFormData] = useState({
    nama_obat: "",
    harga_obat: 0,
    stok_obat: 0,
    tanggal_kadaluarsa: "",
    gambar: "",
    kategori: "",
    deskripsi: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await obat.fetchObat();
      setDataObat(data);
    } catch (err) {
      console.error("Gagal memuat data obat:", err);
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
        await obat.updateObat(editingId, formData);
      } else {
        const newData = {
          ...formData,
          created_at: new Date().toISOString(),
        };
        await obat.createObat(newData);
      }
      setFormData({
        nama_obat: "",
        harga_obat: 0,
        stok_obat: 0,
        tanggal_kadaluarsa: "",
        gambar: "",
        kategori: "",
        deskripsi: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await obat.deleteObat(id);
      fetchData();
    } catch (err) {
      console.error("Gagal menghapus data:", err);
    }
  };

  const getKategoriBadge = (kategori) => {
    switch (kategori) {
      case "Tablet":
        return "badge badge-info";
      case "Kapsul":
        return "badge badge-success";
      case "Sirup":
        return "badge badge-secondary";
      case "Salep":
        return "badge badge-error";
      default:
        return "badge";
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <PageHeader2 title="Daftar Obat" />
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setFormData({
              nama_obat: "",
              harga_obat: 0,
              stok_obat: 0,
              tanggal_kadaluarsa: "",
              gambar: "",
              kategori: "",
              deskripsi: "",
            });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="btn bg-[#00DC82] text-white hover:bg-[#00b56c]"
        >
          {showForm ? "Tutup Form" : "Tambah Data"}
        </button>
      </div>

      {showForm && (
        <div className="card w-full max-w-3xl bg-white shadow-xl mx-auto mb-6">
          <div className="card-body">
            <h2 className="card-title justify-center text-center mb-4 text-blue-700">
              Form Obat
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Nama Obat</span>
                  </label>
                  <input
                    type="text"
                    name="nama_obat"
                    value={formData.nama_obat}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Harga</span>
                  </label>
                  <input
                    type="number"
                    name="harga_obat"
                    value={formData.harga_obat}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Stok</span>
                  </label>
                  <input
                    type="number"
                    name="stok_obat"
                    value={formData.stok_obat}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Tanggal Kadaluarsa</span>
                  </label>
                  <input
                    type="date"
                    name="tanggal_kadaluarsa"
                    value={formData.tanggal_kadaluarsa}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Kategori</span>
                  </label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Kapsul">Kapsul</option>
                    <option value="Sirup">Sirup</option>
                    <option value="Salep">Salep</option>
                  </select>
                </div>
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

      {dataObat.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Data Obat
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table w-full">
              <thead className="bg-[#1859F2] text-white text-sm">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Kadaluarsa</th>
                  <th>Gambar</th>
                  <th>Kategori</th>
                  <th>Deskripsi</th>
                  <th>Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataObat.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama_obat}</td>
                    <td>{item.harga_obat}</td>
                    <td>{item.stok_obat}</td>
                    <td>{item.tanggal_kadaluarsa}</td>
                    <td>
                      {item.gambar && (
                        <img
                          src={item.gambar}
                          alt={item.nama_obat}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td>
                      <span className={getKategoriBadge(item.kategori)}>
                        {item.kategori}
                      </span>
                    </td>
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

export default DaftarObat;