// src/pages/RiwayatPembelian.jsx
import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { riwayat_pembelian } from "../services/riwayat_pembelian";
import { pelanggan } from "../services/pelanggan";

const RiwayatPembelian = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [pelangganList, setPelangganList] = useState([]);
  const [formData, setFormData] = useState({
    pelanggan_id: "",
    produk_tipe: "",
    produk_id: "",
    nama_produk: "",
    harga_produk: 0,
    jumlah: 1,
    alamat_tujuan: "",
    metode_pembayaran: "",
    tanggal_transaksi: "",
    status_order: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [riwayatData, pelangganData] = await Promise.all([
        riwayat_pembelian.fetchRiwayatPembelian(),
        pelanggan.fetchPelanggan(),
      ]);
      setRiwayat(riwayatData);
      setPelangganList(pelangganData);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total_pembelian = formData.harga_produk * formData.jumlah;
    const payload = {
      ...formData,
      total_pembelian,
    };

    try {
      if (editingId) {
        await riwayat_pembelian.updateRiwayatPembelian(editingId, payload);
      } else {
        await riwayat_pembelian.createRiwayatPembelian(payload);
      }
      setFormData({
        pelanggan_id: "",
        produk_tipe: "",
        produk_id: "",
        nama_produk: "",
        harga_produk: 0,
        jumlah: 1,
        alamat_tujuan: "",
        metode_pembayaran: "",
        tanggal_transaksi: "",
        status_order: "",
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
      await riwayat_pembelian.deleteRiwayatPembelian(id);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <PageHeader2 title="Riwayat Pembelian" />
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setFormData({
              pelanggan_id: "",
              produk_tipe: "",
              produk_id: "",
              nama_produk: "",
              harga_produk: 0,
              jumlah: 1,
              alamat_tujuan: "",
              metode_pembayaran: "",
              tanggal_transaksi: "",
              status_order: "",
            });
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="btn bg-[#00d69e] hover:bg-[#00bd8d] text-white"
        >
          {showForm ? "Tutup Form" : "Tambah Riwayat"}
        </button>
      </div>

      {showForm && (
        <div className="card w-full max-w-3xl bg-white shadow-xl mx-auto mb-6">
          <div className="card-body">
            <h2 className="card-title justify-center mb-4 text-blue-700">
              Form Riwayat Pembelian
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Pelanggan</span>
                </label>
                <select
                  name="pelanggan_id"
                  value={formData.pelanggan_id}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Pilih Pelanggan</option>
                  {pelangganList.map((p) => (
                    <option key={p.id} value={p.id}>{p.nama}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Produk Tipe</span>
                </label>
                <select
                  name="produk_tipe"
                  value={formData.produk_tipe}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Pilih Tipe</option>
                  <option value="Obat">Obat</option>
                  <option value="Alkes">Alkes</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" name="produk_id" placeholder="ID Produk" value={formData.produk_id} onChange={handleChange} className="input input-bordered w-full" required />
                <input type="text" name="nama_produk" placeholder="Nama Produk" value={formData.nama_produk} onChange={handleChange} className="input input-bordered w-full" required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="number" name="harga_produk" placeholder="Harga Produk" value={formData.harga_produk} onChange={handleChange} className="input input-bordered w-full" required />
                <input type="number" name="jumlah" placeholder="Jumlah" value={formData.jumlah} onChange={handleChange} className="input input-bordered w-full" min={1} required />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Alamat Tujuan</span>
                </label>
                <textarea name="alamat_tujuan" value={formData.alamat_tujuan} onChange={handleChange} className="textarea textarea-bordered w-full"></textarea>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" name="metode_pembayaran" placeholder="Metode Pembayaran" value={formData.metode_pembayaran} onChange={handleChange} className="input input-bordered w-full" required />
                <input type="datetime-local" name="tanggal_transaksi" value={formData.tanggal_transaksi} onChange={handleChange} className="input input-bordered w-full" required />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Status Order</span>
                </label>
                <input type="text" name="status_order" placeholder="Status Order" value={formData.status_order} onChange={handleChange} className="input input-bordered w-full" />
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

      {riwayat.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            Daftar Riwayat Pembelian
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table w-full">
              <thead className="bg-[#0066ff] text-white text-sm">
                <tr>
                  <th>No</th>
                  <th>Pelanggan</th>
                  <th>Tipe</th>
                  <th>Produk</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                  <th>Alamat</th>
                  <th>Metode</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.map((r, i) => {
                  const pelanggan = pelangganList.find(p => p.id === r.pelanggan_id);
                  return (
                    <tr key={r.id}>
                      <td>{i + 1}</td>
                      <td>{pelanggan?.nama || "-"}</td>
                      <td><span className={`badge ${r.produk_tipe === "Obat" ? "badge-info" : "badge-success"}`}>{r.produk_tipe}</span></td>
                      <td>{r.nama_produk}</td>
                      <td>{r.harga_produk}</td>
                      <td>{r.jumlah}</td>
                      <td>{r.total_pembelian}</td>
                      <td>{r.alamat_tujuan}</td>
                      <td>{r.metode_pembayaran}</td>
                      <td>{new Date(r.tanggal_transaksi).toLocaleString()}</td>
                      <td>{r.status_order}</td>
                      <td className="flex gap-2">
                        <button className="btn btn-sm btn-warning" onClick={() => handleEdit(r)}><FiEdit className="text-white" /></button>
                        <button className="btn btn-sm btn-error" onClick={() => handleDelete(r.id)}><FiTrash2 className="text-white" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default RiwayatPembelian;
