// Dashboard2.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  FaUserFriends,
  FaMicroscope,
  FaArrowUp,
  FaArrowDown,
  FaFileAlt,
  FaQuestion,
} from "react-icons/fa";
import { dashboardAPI } from "../services/dashboard";

const Dashboard2 = () => {
  const [obatData, setObatData] = useState([]);
  const [alkesData, setAlkesData] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [artikel, setArtikel] = useState([]);
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const pelangganData = await dashboardAPI.fetchPelanggan();
      const obat = await dashboardAPI.fetchObat();
      const alkes = await dashboardAPI.fetchAlkes();
      const artikel = await dashboardAPI.fetchArtikel();
      const faq = await dashboardAPI.fetchFaq();

      setPelanggan(pelangganData || []);
      setObatData(obat || []);
      setAlkesData(alkes || []);
      setArtikel(artikel || []);
      setFaq(faq || []);
    };

    fetchAllData();
  }, []);

  const totalPelanggan = pelanggan.length;

  const kategoriData = ["Tablet", "Kapsul", "Sirup", "Salep"].map((kategori) => ({
    name: kategori,
    jumlah: obatData.filter((o) => o.kategori === kategori).length,
  }));

  const stokTerbanyakData = [...obatData].sort((a, b) => b.stok_obat - a.stok_obat)[0];
  const stokMinData = [...obatData].sort((a, b) => a.stok_obat - b.stok_obat)[0];

  const colors = {
    Tablet: "#fda4af",
    Kapsul: "#93c5fd",
    Sirup: "#fcd34d",
    Salep: "#99f6e4",
  };

  const icons = {
    TotalPelanggan: <FaUserFriends className="text-blue-500 text-3xl" />,
    Alkes: <FaMicroscope className="text-green-500 text-2xl" />,
    Artikel: <FaFileAlt className="text-pink-600 text-2xl" />,
    FAQ: <FaQuestion className="text-purple-600 text-2xl" />,
    Up: <FaArrowUp className="text-indigo-600 text-3xl" />,
    Down: <FaArrowDown className="text-red-600 text-3xl" />,
  };

  return (
    <div className="p-6 space-y-6 bg-base-200 min-h-screen">
      <div className="text-3xl font-bold text-primary mb-4">Dashboard Apotek</div>

      <div className="alert alert-success shadow-lg rounded-xl">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M4 4l16 16"
            />
          </svg>
          <span>Data dashboard terupdate otomatis.</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Pelanggan */}
        <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="card-title text-base text-gray-500">Total Pelanggan</h2>
                <p className="text-4xl font-bold text-blue-600">{totalPelanggan}</p>
              </div>
              {icons.TotalPelanggan}
            </div>
          </div>
        </div>

        {/* Total Alkes */}
        <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="card-title text-base text-gray-500">Total Alkes</h2>
                <p className="text-4xl font-bold text-green-500">{alkesData.length}</p>
              </div>
              {icons.Alkes}
            </div>
          </div>
        </div>

        {/* Total Artikel */}
        <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="card-title text-base text-gray-500">Total Artikel</h2>
                <p className="text-4xl font-bold text-pink-500">{artikel.length}</p>
              </div>
              {icons.Artikel}
            </div>
          </div>
        </div>

        {/* Total FAQ */}
        <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="card-title text-base text-gray-500">Total FAQ</h2>
                <p className="text-4xl font-bold text-purple-500">{faq.length}</p>
              </div>
              {icons.FAQ}
            </div>
          </div>
        </div>
      </div>

      {/* Grafik Obat */}
      <div className="card bg-white shadow-lg p-6 border border-base-300">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">
          Grafik Distribusi Kategori Obat
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={kategoriData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="jumlah">
              {kategoriData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.name] || "#ccc"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stok Obat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="card bg-white shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-sm text-gray-500">Stok Obat Tertinggi</h2>
                <p className="text-3xl font-bold text-indigo-700 mt-1">
                  {stokTerbanyakData?.stok_obat}
                </p>
                <p className="text-sm text-gray-600">{stokTerbanyakData?.nama_obat}</p>
              </div>
              {icons.Up}
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-xl border border-base-300">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-sm text-gray-500">Stok Obat Minim</h2>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {stokMinData?.stok_obat}
                </p>
                <p className="text-sm text-gray-600">{stokMinData?.nama_obat}</p>
              </div>
              {icons.Down}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;
