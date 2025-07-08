// Full implementation of Persediaan.jsx using DaisyUI

import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import PageHeader2 from "../components/PageHeader2";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import AlertBox from "../components/AlertBox";
import { persediaanAPI } from "../services/persediaanAPI.JSX";
import axios from "axios";

export default function Persediaan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [persediaan, setPersediaan] = useState([]);
  const [persediaanData, setPersediaanData] = useState([]);
  const [semuaPersediaan, setSemuaPersediaan] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [dataForm, setDataForm] = useState({
    id: "",
    nama: "",
    rak: "",
    stok: "",
    satuan: "",
    harga_pokok: "",
    harga_jual: "",
    min_markup: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newData = {
        id: uuidv4(),
        nama: dataForm.nama,
        rak: dataForm.rak,
        stok: parseInt(dataForm.stok),
        satuan: dataForm.satuan,
        harga_pokok: parseInt(dataForm.harga_pokok),
        harga_jual: parseInt(dataForm.harga_jual),
        min_markup: parseInt(dataForm.min_markup),
        status: dataForm.status,
      };
      await persediaanAPI.createPersediaan(newData);
      setSuccess("Data berhasil ditambahkan!");
      setDataForm({
        id: "",
        nama: "",
        rak: "",
        stok: "",
        satuan: "",
        harga_pokok: "",
        harga_jual: "",
        min_markup: "",
        status: "",
      });
      loadPersediaan();
    } catch (err) {
      setError("Gagal menambahkan data.");
    } finally {
      setLoading(false);
    }
  };

  const loadPersediaan = async () => {
    setLoading(true);
    try {
      const data = await persediaanAPI.fetchPersediaan();
      setPersediaan(data);
    } catch {
      setError("Gagal mengambil data persediaan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    setLoading(true);
    try {
      await persediaanAPI.deletePersediaan(id);
      setSuccess("Data berhasil dihapus");
      loadPersediaan();
    } catch {
      setError("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPersediaan();
    axios.get("http://localhost:3001/persediaan").then((res) => {
      setPersediaanData(res.data);
    });
  }, []);

  useEffect(() => {
    setSemuaPersediaan([...persediaan, ...persediaanData]);
  }, [persediaan, persediaanData]);

  return (
    <div className="p-6">
      <PageHeader2 title="Manajemen Persediaan" />
      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="flex justify-between items-center mb-4">
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Tutup Form" : "Tambah Produk"}
        </button>
        <input type="text" placeholder="Cari..." className="input input-bordered" />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card bg-base-100 shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(dataForm).map(([key, value]) =>
              key === "id" ? null : (
                <input
                  key={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={key.replace("_", " ").toUpperCase()}
                  className="input input-bordered"
                />
              )
            )}
          </div>
          <button className="btn btn-success mt-4" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : semuaPersediaan.length === 0 ? (
        <EmptyState text="Belum ada data persediaan." />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Rak</th>
                <th>Stok</th>
                <th>Satuan</th>
                <th>Harga Pokok</th>
                <th>Harga Jual</th>
                <th>Markup</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {semuaPersediaan.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.rak}</td>
                  <td>{item.stok}</td>
                  <td>{item.satuan}</td>
                  <td>Rp {item.harga_pokok.toLocaleString("id-ID")}</td>
                  <td>Rp {item.harga_jual.toLocaleString("id-ID")}</td>
                  <td>{item.min_markup}%</td>
                  <td>
                    <div className={`badge ${item.status === "aktif" ? "badge-success" : "badge-secondary"}`}>
                      {item.status}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(item.id)}
                      disabled={loading}
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}