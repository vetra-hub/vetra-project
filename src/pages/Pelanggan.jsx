// src/pages/Pelanggan.jsx
import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { pelanggan } from "../services/pelanggan";

const Pelanggan = () => {
  const [dataPelanggan, setDataPelanggan] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    alamat: "",
    segmentasi: "",
    total_pembelian: 0,
    phone: "",
    foto_profil: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await pelanggan.fetchPelanggan();
      setDataPelanggan(data);
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
    if (name === "foto_profil" && files.length > 0) {
      const base64 = await convertToBase64(files[0]);
      setFormData((prev) => ({ ...prev, foto_profil: base64 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nama: formData.nama,
        email: formData.email,
        alamat: formData.alamat,
        segmentasi: formData.segmentasi,
        total_pembelian: parseInt(formData.total_pembelian),
        phone: formData.phone,
        foto_profil: formData.foto_profil,
      };
      if (editingId) {
        await pelanggan.updatePelanggan(editingId, payload);
      } else {
        await pelanggan.createPelanggan(payload);
      }
      setFormData({
        nama: "",
        email: "",
        alamat: "",
        segmentasi: "",
        total_pembelian: 0,
        phone: "",
        foto_profil: "",
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
      await pelanggan.deletePelanggan(id);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  const renderSegmentasiBadge = (value) => {
    const colorMap = {
      Silver: "badge-neutral",
      Gold: "badge-warning",
      Platinum: "badge-info",
    };
    return (
      <span className={`badge ${colorMap[value] || "badge-ghost"}`}>{value}</span>
    );
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <PageHeader2 title="Data Pelanggan" />
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setFormData({
              nama: "",
              email: "",
              alamat: "",
              segmentasi: "",
              total_pembelian: 0,
              phone: "",
              foto_profil: "",
            });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="btn bg-[#00d69e] hover:bg-[#00bd8d] text-white"
        >
          {showForm ? "Tutup Form" : "Tambah Data"}
        </button>
      </div>

      {showForm && (
        <div className="card w-full max-w-3xl bg-white shadow-xl mx-auto mb-6">
          <div className="card-body">
            <h2 className="card-title justify-center text-center mb-4 text-blue-700">
              Form Pelanggan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label"><span className="label-text">Nama</span></label>
                  <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="input input-bordered w-full" required />
                </div>
                <div>
                  <label className="label"><span className="label-text">Email</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered w-full" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label"><span className="label-text">Alamat</span></label>
                  <textarea name="alamat" value={formData.alamat} onChange={handleChange} className="textarea textarea-bordered w-full"></textarea>
                </div>
                <div>
                  <label className="label"><span className="label-text">Phone</span></label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="input input-bordered w-full" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label"><span className="label-text">Segmentasi</span></label>
                  <select name="segmentasi" value={formData.segmentasi} onChange={handleChange} className="select select-bordered w-full" required>
                    <option value="">Pilih Segmentasi</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
                <div>
                  <label className="label"><span className="label-text">Total Pembelian</span></label>
                  <input type="number" name="total_pembelian" value={formData.total_pembelian} onChange={handleChange} className="input input-bordered w-full" />
                </div>
              </div>
              <div>
                <label className="label"><span className="label-text">Foto Profil</span></label>
                <input type="file" name="foto_profil" accept="image/*" onChange={handleChange} className="file-input file-input-bordered w-full" />
                {formData.foto_profil && (
                  <img src={formData.foto_profil} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded border" />
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

      {dataPelanggan.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Daftar Pelanggan</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table w-full">
              <thead className="bg-[#0066ff] text-white text-sm">
                <tr>
                  <th>No</th>
                  <th>Foto</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Alamat</th>
                  <th>Segmentasi</th>
                  <th>Total Pembelian</th>
                  <th>Phone</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataPelanggan.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      {item.foto_profil && (
                        <img src={item.foto_profil} alt="Profil" className="w-10 h-10 rounded-full object-cover" />
                      )}
                    </td>
                    <td>{item.nama}</td>
                    <td>{item.email}</td>
                    <td>{item.alamat}</td>
                    <td>{renderSegmentasiBadge(item.segmentasi)}</td>
                    <td>{item.total_pembelian}</td>
                    <td>{item.phone}</td>
                    <td className="flex gap-2">
                      <button className="btn btn-sm btn-warning" onClick={() => handleEdit(item)}>
                        <FiEdit className="text-white" />
                      </button>
                      <button className="btn btn-sm btn-error" onClick={() => handleDelete(item.id)}>
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

export default Pelanggan;
