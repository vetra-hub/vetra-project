import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { FaUserFriends, FaMicroscope, FaArrowUp, FaArrowDown, FaFileAlt, FaQuestion } from "react-icons/fa";

const Dashboard2 = () => {
  const [obatData, setObatData] = useState([]);
  const [alkesData, setAlkesData] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [artikel, setArtikel] = useState([]);
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    setObatData(JSON.parse(localStorage.getItem("dataObat")) || []);
    setAlkesData(JSON.parse(localStorage.getItem("dataAlkes")) || []);
    setPelanggan(JSON.parse(localStorage.getItem("dataPelanggan")) || []);
    setArtikel(JSON.parse(localStorage.getItem("dataArtikel")) || []);
    setFaq(JSON.parse(localStorage.getItem("dataFaq")) || []);
  }, []);

  const kategoriData = ["Tablet", "Kapsul", "Sirup", "Salep"].map((kategori) => ({
    name: kategori,
    jumlah: obatData.filter((obat) => obat.kategori === kategori).length,
  }));

  const pelangganSegmentasi = ["Silver", "Gold", "Platinum"].map((seg) => ({
    name: seg,
    value: pelanggan.filter((p) => p.segmentasi === seg).length,
  }));

  const totalAlkes = alkesData.length;
  const totalArtikel = artikel.length;
  const totalFaq = faq.length;

  const stokTerbanyakData = [...obatData].sort((a, b) => b.stok_obat - a.stok_obat)[0];
  const stokMinData = [...obatData].sort((a, b) => a.stok_obat - b.stok_obat)[0];

  const colors = {
    Tablet: "#fda4af",
    Kapsul: "#93c5fd",
    Sirup: "#fcd34d",
    Salep: "#99f6e4",
  };

  const icons = {
    Silver: <FaUserFriends className="text-gray-500 text-2xl" />,
    Gold: <FaUserFriends className="text-yellow-500 text-2xl" />,
    Platinum: <FaUserFriends className="text-blue-600 text-2xl" />,
    Alkes: <FaMicroscope className="text-green-500 text-2xl" />,
    Artikel: <FaFileAlt className="text-pink-600 text-2xl" />,
    FAQ: <FaQuestion className="text-purple-600 text-2xl" />,
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full p-6 space-y-6 overflow-auto bg-gray-50">
      <div className="alert shadow-lg mb-2 bg-green-500 text-white rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current text-white shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M4 4l16 16" />
        </svg>
        <div>
          <h3 className="font-bold">Perhatian!</h3>
          <div className="text-xs">Data terakhir diperbarui 5 menit lalu.</div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {pelangganSegmentasi.map((seg) => (
          <Card key={seg.name} className="p-4 rounded-xl shadow-xl border border-gray-200 bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-sm font-medium text-gray-500">{seg.name} Customer</h2>
                <p className={`text-3xl font-bold mt-2 ${
                  seg.name === "Silver" ? "text-gray-500" :
                  seg.name === "Gold" ? "text-yellow-500" :
                  "text-blue-700"
                }`}>{seg.value}</p>
              </div>
              {icons[seg.name]}
            </div>
          </Card>
        ))}

        <Card className="p-4 rounded-xl shadow-xl border border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Total Alkes</h2>
              <p className="text-3xl font-bold text-green-600 mt-2">{totalAlkes}</p>
            </div>
            {icons.Alkes}
          </div>
        </Card>

        <Card className="p-4 rounded-xl shadow-xl border border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Total Artikel</h2>
              <p className="text-3xl font-bold text-pink-600 mt-2">{totalArtikel}</p>
            </div>
            {icons.Artikel}
          </div>
        </Card>

        <Card className="p-4 rounded-xl shadow-xl border border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Total FAQ</h2>
              <p className="text-3xl font-bold text-purple-600 mt-2">{totalFaq}</p>
            </div>
            {icons.FAQ}
          </div>
        </Card>
      </div>

      {/* Grafik Kategori Obat */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-base font-semibold text-blue-800 mb-4">Distribusi Kategori Obat</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={kategoriData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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

      {/* Card Stok Obat */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-4 rounded-xl shadow-xl border border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Stok Obat Tertinggi</h2>
              <p className="text-3xl font-bold text-indigo-700 mt-2">{stokTerbanyakData?.stok_obat}</p>
              <p className="text-xs text-gray-600">{stokTerbanyakData?.nama_obat}</p>
            </div>
            {icons.Up}
          </div>
        </Card>

        <Card className="p-4 rounded-xl shadow-xl border border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Stok Obat Minim</h2>
              <p className="text-3xl font-bold text-red-600 mt-2">{stokMinData?.stok_obat}</p>
              <p className="text-xs text-gray-600">{stokMinData?.nama_obat}</p>
            </div>
            {icons.Down}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard2;