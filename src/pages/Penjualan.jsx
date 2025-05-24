import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { format, parseISO } from "date-fns";
import Card from "../components/Card";
import PageHeader2 from "../components/PageHeader2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import penjualanData from "../penjualan.json";

// Register komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Penjualan() {
  const [showCancelled, setShowCancelled] = useState(true);

  const startDate = parseISO("2023-06-01");
  const endDate = parseISO("2023-06-06");

  const filteredData = penjualanData.filter((item) => {
    const transactionDate = parseISO(item.tanggal);
    return (
      transactionDate >= startDate &&
      transactionDate <= endDate &&
      (showCancelled || !item.dibatalkan)
    );
  });

  const totalPenjualan = filteredData.reduce((acc, item) => acc + item.total, 0);
  const totalTransaksi = filteredData.length;

  const chartData = {
    labels: filteredData.map((item) => item.noStruk),
    datasets: [
      {
        label: "Total Penjualan",
        data: filteredData.map((item) => item.total),
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Warna merah muda
        borderColor: "rgba(255, 99, 132, 1)", // Warna merah solid
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
        hoverBorderColor: "rgba(255, 99, 132, 1)"
      }
    ]
  };

  // Mendapatkan daftar tanggal dari data penjualan
  const penjualanDates = [...new Set(filteredData.map(item => format(parseISO(item.tanggal), 'yyyy-MM-dd')))];

  const handleDelete = (noStruk) => {
    alert(`Menghapus transaksi ${noStruk}`);
  };

  const handleEdit = (noStruk) => {
    alert(`Mengedit transaksi ${noStruk}`);
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-auto bg-gray-50">
      <PageHeader2 title="Penjualan" />

      {/* Menampilkan Grafik Penjualan dan Kalender secara berdampingan */}
      <div className="flex justify-between gap-6 mb-6 max-w-7xl mx-auto">
        {/* Kartu Grafik Penjualan */}
        <div className="flex-1">
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Grafik Penjualan</h2>
            <div className="relative">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    title: {
                      display: false
                    },
                    legend: {
                      display: true,
                      position: 'top',
                      labels: {
                        fontColor: '#333',
                        fontSize: 14
                      }
                    },
                    tooltip: {
                      backgroundColor: 'rgba(255, 99, 132, 0.8)',
                      titleFont: {
                        size: 16
                      },
                      bodyFont: {
                        size: 14
                      }
                    }
                  },
                  scales: {
                    x: {
                      ticks: {
                        fontSize: 12,
                        fontColor: '#333'
                      }
                    },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return `Rp ${value.toLocaleString()}`;
                        },
                        fontSize: 12,
                        fontColor: '#333'
                      }
                    }
                  }
                }}
                height={300} // Ukuran chart lebih proporsional
              />
            </div>
          </Card>
        </div>

        {/* Kartu Kalender */}
        <div className="flex-1">
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Tanggal Penjualan</h2>
            <Calendar
              tileClassName={({ date }) => {
                const dateStr = format(date, 'yyyy-MM-dd');
                if (penjualanDates.includes(dateStr)) {
                  return 'bg-blue-500 text-white'; // Tandai tanggal penjualan dengan latar belakang biru
                }
                return '';
              }}
              className="shadow-lg rounded-xl"
            />
          </Card>
        </div>
      </div>

      {/* Tombol toggle data dibatalkan */}
      <div className="flex justify-end mb-6 px-6">
        <button
          onClick={() => setShowCancelled(!showCancelled)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showCancelled ? "Sembunyikan yang Dibatalkan" : "Tampilkan Semua"}
        </button>
      </div>

      {/* Tabel Penjualan */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg mb-6 mx-6">
        <table className="min-w-full table-auto text-sm text-gray-700">
        <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">No. Struk</th>
              <th className="px-6 py-3 text-left">Produk</th>
              <th className="px-6 py-3 text-left">Total Penjualan</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{item.noStruk}</td>
                <td className="px-6 py-4">{item.produk}</td>
                <td className="px-6 py-4">Rp {item.total.toLocaleString("id-ID")}</td>
                <td className="px-6 py-4">
                  {item.dibatalkan ? (
                    <span className="text-red-600 font-semibold">Dibatalkan</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Berhasil</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(item.noStruk)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.noStruk)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
