import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PageHeader2 from "../components/PageHeader2";

const Persediaan = () => {
  const [persediaan, setPersediaan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3001/persediaan") 
      .then((res) => {
        setPersediaan(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data persediaan");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-auto bg-gray-50">
      <PageHeader2 title="Daftar Produk" />

      {/* Filter & Buttons Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari data"
              className="border rounded-lg p-3 text-sm w-64 focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              // nanti bisa tambah onChange untuk filter search
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-300 text-gray-700 rounded-lg px-6 py-2 text-sm hover:bg-gray-400 focus:outline-none transition-all">
            Cetak Barcode
          </button>
          <button className="bg-green-500 text-white rounded-lg px-6 py-2 text-sm hover:bg-green-600 focus:outline-none transition-all">
            Tambah Produk
          </button>
        </div>
      </div>

      {/* Product Table Section */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg mb-6 mx-6">
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">No.</th>
              <th className="px-6 py-3 text-left font-semibold">Nama</th>
              <th className="px-6 py-3 text-left font-semibold">Rak</th>
              <th className="px-6 py-3 text-left font-semibold">Stok</th>
              <th className="px-6 py-3 text-left font-semibold">Harga Pokok</th>
              <th className="px-6 py-3 text-left font-semibold">Harga Jual</th>
              <th className="px-6 py-3 text-left font-semibold">Min. Markup</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {persediaan.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/persediaan/${item.id}`}
                    className="text-emerald-400 hover:text-emerald-500"
                  >
                    {item.nama}
                  </Link>
                </td>
                <td className="px-6 py-4">{item.rak}</td>
                <td className="px-6 py-4">
                  {item.stok} {item.satuan}
                </td>
                <td className="px-6 py-4">
                  {formatCurrency(item.hargaPokokMin)} - {formatCurrency(item.hargaPokokMax)}
                </td>
                <td className="px-6 py-4">
                  {formatCurrency(item.hargaJualMin)} - {formatCurrency(item.hargaJualMax)}
                </td>
                <td className="px-6 py-4">
                  {item.minMarkup}% - {item.maxMarkup}%
                </td>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center space-x-3">
                    <button className="bg-blue-500 text-white rounded-lg px-4 py-2 text-xs hover:bg-blue-600 focus:outline-none transition-all flex items-center">
                      {/* Edit Icon */}
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 3l4 4m0 0l-4 4m4-4H6m0 0l4 4m0 0l-4 4"
                        />
                      </svg>
                      Edit
                    </button>

                    <button className="bg-yellow-500 text-white rounded-lg px-4 py-2 text-xs hover:bg-yellow-600 focus:outline-none transition-all flex items-center">
                      {/* Beli Icon */}
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 3h4m4 0h4M12 12v7m0 0H5.5A1.5 1.5 0 014 17.5V7.5A1.5 1.5 0 015.5 6h13A1.5 1.5 0 0120 7.5V17a1.5 1.5 0 01-1.5 1.5H12z"
                        />
                      </svg>
                      Beli
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Condition Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Kondisi Produk
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <p>
              Produk Dijual:{" "}
              <span className="font-semibold text-gray-800">8919 produk</span>
            </p>
            <p>
              Produk Berpotensi Rugi:{" "}
              <span className="font-semibold text-gray-800">738 produk</span>
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <p>
              Produk Tidak Dijual:{" "}
              <span className="font-semibold text-gray-800">319 produk</span>
            </p>
            <p>
              Produk Stok Negatif:{" "}
              <span className="font-semibold text-gray-800">37 produk</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Persediaan;
