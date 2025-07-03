import { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";
import PageHeader2 from "../components/PageHeader2";
import AlertBox from "../components/AlertBox";
import { penjualanAPI } from "../services/penjualanAPI";
import GenericTable from "../components/GenericTable";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { AiFillDelete } from "react-icons/ai";

export default function Penjualan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [penjualan, setPenjualan] = useState([]);
  const [showCancelled, setShowCancelled] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [dataForm, setDataForm] = useState({
    noStruk: "",
    produk: "",
    total: "",
    status: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const cleanedData = {
        noStruk: dataForm.noStruk.trim(),
        produk: dataForm.produk.trim(),
        total: Number(dataForm.total),
        status: dataForm.status === "berhasil" ? true : false,
      };

      await penjualanAPI.createPenjualan(cleanedData);

      setSuccess("Catatan berhasil ditambahkan!");
      setDataForm({ noStruk: "", produk: "", total: "", status: "" });
      setTimeout(() => setSuccess(""), 3000);
      loadPenjualan();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadPenjualan = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await penjualanAPI.fetchPenjualan();
      setPenjualan(data);
    } catch (err) {
      setError("Gagal memuat catatan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPenjualan();
  }, []);

  const handleDelete = async (noStruk) => {
    if (!window.confirm(`Yakin ingin menghapus transaksi ${noStruk}?`)) return;
    try {
      setLoading(true);
      await penjualanAPI.deletePenjualan(noStruk);
      setSuccess("Transaksi berhasil dihapus.");
      setTimeout(() => setSuccess(""), 3000);
      loadPenjualan();
    } catch (err) {
      setError("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-base-200 px-6 py-4">
      <PageHeader2 title="Penjualan" />

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="mt-4 mb-6">
        <button onClick={() => setShowForm(!showForm)} className="btn btn-success">
          {showForm ? "Tutup Form" : "Tambah Data"}
        </button>
      </div>

      {showForm && (
        <div className="card bg-base-100 shadow-xl mb-6 p-6">
          <h2 className="text-xl font-bold mb-4">Tambah Penjualan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="noStruk"
              value={dataForm.noStruk}
              onChange={handleChange}
              placeholder="No Struk"
              className="input input-bordered w-full"
              disabled={loading}
            />
            <input
              type="text"
              name="produk"
              value={dataForm.produk}
              onChange={handleChange}
              placeholder="Nama Produk"
              className="input input-bordered w-full"
              disabled={loading}
            />
            <input
              type="number"
              name="total"
              value={dataForm.total}
              onChange={handleChange}
              placeholder="Total"
              className="input input-bordered w-full"
              disabled={loading}
            />
            <select
              name="status"
              value={dataForm.status}
              onChange={handleChange}
              className="select select-bordered w-full"
              disabled={loading}
            >
              <option value="">Pilih Status</option>
              <option value="berhasil">Berhasil</option>
              <option value="dibatalkan">Dibatalkan</option>
            </select>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </form>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <button onClick={() => setShowCancelled(!showCancelled)} className="btn btn-info">
          {showCancelled ? "Sembunyikan Dibatalkan" : "Tampilkan Semua"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md mb-6 overflow-x-auto">
        <div className="p-4 border-b font-semibold text-lg">Daftar Penjualan</div>

        {loading && <LoadingSpinner text="Memuat catatan..." />}

        {!loading && penjualan.length === 0 && !error && (
          <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
        )}

        {!loading && penjualan.length === 0 && error && (
          <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
        )}

        {!loading && penjualan.length > 0 && (
          <GenericTable
            columns={["No", "Produk", "Total", "Status", "Aksi"]}
            data={penjualan.filter((p) => showCancelled || p.status === true)}
            renderRow={(item, index) => (
              <>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 text-emerald-700 font-medium">{item.produk}</td>
                <td className="px-4 py-2">Rp {Number(item.total).toLocaleString("id-ID")}</td>
                <td className="px-4 py-2">
                  <span
                    className={`badge ${
                      item.status ? "badge-success" : "badge-error"
                    }`}
                  >
                    {item.status ? "Berhasil" : "Dibatalkan"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(item.noStruk)} disabled={loading}>
                    <AiFillDelete className="text-red-500 text-xl hover:text-red-700" />
                  </button>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
