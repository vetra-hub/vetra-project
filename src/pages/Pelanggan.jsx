import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Pelanggan = () => {
  const [dataPelanggan, setDataPelanggan] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    alamat: "",
    segmentasi: "",
    total_pembelian: 0,
    phone: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dataPelanggan");
    if (saved) {
      setDataPelanggan(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dataPelanggan", JSON.stringify(dataPelanggan));
  }, [dataPelanggan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...dataPelanggan];
      updated[editingIndex] = {
        ...formData,
        id: updated[editingIndex].id,
        created_at: updated[editingIndex].created_at,
      };
      setDataPelanggan(updated);
      setEditingIndex(null);
    } else {
      const newData = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        ...formData,
      };
      setDataPelanggan([...dataPelanggan, newData]);
    }

    setFormData({
      nama: "",
      email: "",
      alamat: "",
      segmentasi: "",
      total_pembelian: 0,
      phone: "",
    });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(dataPelanggan[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const filtered = dataPelanggan.filter((_, i) => i !== index);
    setDataPelanggan(filtered);
  };

  const renderSegmentasiBadge = (value) => {
    const colorMap = {
      Silver: "badge-neutral",
      Gold: "badge-warning",
      Platinum: "badge-info",
    };
    return (
      <span className={`badge ${colorMap[value] || "badge-ghost"}`}>
        {value}
      </span>
    );
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <PageHeader2 title="Data Pelanggan" />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
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
                  <label className="label">
                    <span className="label-text">Nama</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Alamat</span>
                  </label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                  ></textarea>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Segmentasi</span>
                  </label>
                  <select
                    name="segmentasi"
                    value={formData.segmentasi}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Pilih Segmentasi</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Total Pembelian</span>
                  </label>
                  <input
                    type="number"
                    name="total_pembelian"
                    value={formData.total_pembelian}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
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

      {dataPelanggan.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Daftar Pelanggan
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table w-full">
              <thead className="bg-[#0066ff] text-white text-sm">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Alamat</th>
                  <th>Segmentasi</th>
                  <th>Total Pembelian</th>
                  <th>Phone</th>
                  <th>Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataPelanggan.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.email}</td>
                    <td>{item.alamat}</td>
                    <td>{renderSegmentasiBadge(item.segmentasi)}</td>
                    <td>{item.total_pembelian}</td>
                    <td>{item.phone}</td>
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

export default Pelanggan;
