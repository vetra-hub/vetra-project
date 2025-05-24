import obatData from "./framework.json";
import { useState } from "react";

export default function ObatListAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("");
  const [sediaanFilter, setSediaanFilter] = useState("");

  const filteredObat = obatData.filter((item) => {
    const matchesSearch = item.nama_obat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKategori = kategoriFilter ? item.kategori === kategoriFilter : true;
    const matchesSediaan = sediaanFilter ? item.detail.bentuk_sediaan === sediaanFilter : true;
    return matchesSearch && matchesKategori && matchesSediaan;
  });

  const kategoriList = [...new Set(obatData.map(item => item.kategori))];
  const sediaanList = [...new Set(obatData.map(item => item.detail.bentuk_sediaan))];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 shadow-md">
        <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4 text-sm">
          <li className="text-blue-600 font-medium">📦 Daftar Obat</li>
          <li className="text-gray-600 hover:text-blue-500 cursor-pointer">➕ Tambah Obat</li>
          <li className="text-gray-600 hover:text-blue-500 cursor-pointer">📊 Laporan</li>
          <li className="text-gray-600 hover:text-blue-500 cursor-pointer">⚙️ Pengaturan</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Daftar Obat (Admin)</h1>

        {/* Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="🔍 Cari nama obat..."
            className="border border-gray-300 p-2 rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 p-2 rounded w-full"
            value={kategoriFilter}
            onChange={(e) => setKategoriFilter(e.target.value)}
          >
            <option value="">🗂️ Semua Kategori</option>
            {kategoriList.map((kat, idx) => (
            <option key={idx} value={kat}>{kat}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 p-2 rounded w-full"
            value={sediaanFilter}
            onChange={(e) => setSediaanFilter(e.target.value)}
          >
            <option value="">💊 Semua Sediaan</option>
            {sediaanList.map((sed, idx) => (
            <option key={idx} value={sed}>{sed}</option>
          ))}
          </select>
        </div>

        {/* Tambah Obat Button */}
        <div className="mb-6">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow">
            + Tambah Obat
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">No</th>
                <th className="p-2 border">Gambar</th>
                <th className="p-2 border">Nama Obat</th>
                <th className="p-2 border">Kategori</th>
                <th className="p-2 border">Harga</th>
                <th className="p-2 border">Stok</th>
                <th className="p-2 border">Sediaan</th>
                <th className="p-2 border">Expired</th>
                <th className="p-2 border">Dosis</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredObat.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border text-center">
                    <img
                      src={item.gambar}
                      alt={item.nama_obat}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="p-2 border">{item.nama_obat}</td>
                  <td className="p-2 border">{item.kategori}</td>
                  <td className="p-2 border text-right">Rp{item.harga.toLocaleString()}</td>
                  <td className="p-2 border text-center">{item.stok}</td>
                  <td className="p-2 border">{item.detail.bentuk_sediaan}</td>
                  <td className="p-2 border text-center">{item.detail.expired}</td>
                  <td className="p-2 border text-center">{item.detail.dosis}</td>
                  <td className="p-2 border text-center space-x-1">
                    <button className="px-2 py-1 bg-yellow-400 text-white rounded text-xs">Edit</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded text-xs">Hapus</button>
                    <button className="px-2 py-1 bg-gray-600 text-white rounded text-xs">Detail</button>
                  </td>
                </tr>
              ))}

              {filteredObat.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center p-4 text-gray-500">
                    Tidak ada data obat yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
