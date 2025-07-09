// src/pages/LaporanPenjualan.jsx

import React, { useEffect, useState } from "react";
import { riwayat_pembelian } from "../services/riwayat_pembelian";
import Card, { CardContent } from "../components/Card";
import { formatRupiah } from "../services/utils/formatter";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#EF4444", "#F59E0B"];

const LaporanPenjualan = () => {
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalTransaksi: 0,
    totalProduk: 0,
    rataRataOrder: 0,
    produkTerlaris: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await riwayat_pembelian.fetchRiwayatPembelian();
      hitungSummary(data);
    } catch (error) {
      console.error("Gagal mengambil data penjualan:", error);
    }
  };

  const hitungSummary = (data) => {
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total_pembelian, 0);
    const totalTransaksi = data.length;
    const totalProduk = data.reduce((acc, curr) => acc + curr.jumlah, 0);
    const rataRataOrder = totalTransaksi ? totalRevenue / totalTransaksi : 0;

    const produkMap = {};
    data.forEach((item) => {
      if (!produkMap[item.nama_produk]) {
        produkMap[item.nama_produk] = {
          nama_produk: item.nama_produk,
          tipe: item.produk_tipe,
          totalTerjual: 0,
          totalRevenue: 0,
        };
      }
      produkMap[item.nama_produk].totalTerjual += item.jumlah;
      produkMap[item.nama_produk].totalRevenue += item.total_pembelian;
    });

    const produkTerlaris = Object.values(produkMap)
      .sort((a, b) => b.totalTerjual - a.totalTerjual)
      .slice(0, 5);

    setSummary({
      totalRevenue,
      totalTransaksi,
      totalProduk,
      rataRataOrder,
      produkTerlaris,
    });
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">📊 Laporan Penjualan</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="text-gray-500 text-sm">Total Revenue</div>
            <div className="text-2xl text-green-600 font-bold">
              {formatRupiah(summary.totalRevenue)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-gray-500 text-sm">Total Transaksi</div>
            <div className="text-2xl text-blue-600 font-bold">
              {summary.totalTransaksi}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-gray-500 text-sm">Total Produk Terjual</div>
            <div className="text-2xl text-purple-600 font-bold">
              {summary.totalProduk}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-gray-500 text-sm">Rata-rata Order</div>
            <div className="text-2xl text-red-600 font-bold">
              {formatRupiah(summary.rataRataOrder)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grafik */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Grafik Produk Terlaris</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summary.produkTerlaris}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nama_produk" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalTerjual" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Distribusi Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={summary.produkTerlaris}
                  dataKey="totalRevenue"
                  nameKey="nama_produk"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {summary.produkTerlaris.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabel */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">📈 Tabel Produk Terlaris</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th>Produk</th>
                  <th>Tipe</th>
                  <th>Total Terjual</th>
                  <th>Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {summary.produkTerlaris.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.nama_produk}</td>
                    <td>{item.tipe}</td>
                    <td>{item.totalTerjual}</td>
                    <td className="text-green-600 font-semibold">
                      {formatRupiah(item.totalRevenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaporanPenjualan;
