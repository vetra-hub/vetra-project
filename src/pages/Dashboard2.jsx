import React from "react";
import Card from "../components/Card";
import SalesAnalysis from "../components/SalesAnalysis";
import ApotekStats from "../components/ApotekStats";

export default function Dashboard2() {
  return (
    <div className="flex flex-col flex-1 w-full h-full p-6 space-y-6 overflow-auto">
      <div className="alert shadow-lg mb-2 bg-green-500 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current text-white shrink-0 h-6 w-6"
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
        <div>
          <h3 className="font-bold">Perhatian!</h3>
          <div className="text-xs">Data terakhir diperbarui 5 menit lalu.</div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="card bg-base-100 shadow-md border">
          <div className="card-body p-4">
            <h2 className="card-title text-sm text-gray-600">
              Total Penjualan
            </h2>
            <p className="text-2xl font-bold text-success">4.585.000</p>
          </div>
        </div>
        <Card className="p-3">
          <h2 className="text-sm font-medium text-gray-600">Retur Penjualan</h2>
          <p className="text-xl font-bold text-red-500">-700</p>
        </Card>
        <Card className="p-3">
          <h2 className="text-sm font-medium text-gray-600">
            Penjualan Tertolak
          </h2>
          <p className="text-xl font-bold text-orange-400">95.000</p>
        </Card>
      </div>

      {/* Chart / Analisis */}
      <SalesAnalysis />
      <div className="tabs tabs-boxed w-fit">
        <a className="tab tab-active">Mingguan</a>
        <a className="tab">Bulanan</a>
      </div>

      <ApotekStats />

      {/* Status Persediaan */}
      <div>
        <h2 className="text-base font-semibold text-blue-800 mb-2">
          - Status Persediaan
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-red-100 border border-red-200 rounded-lg p-3 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-red-700">
                Berpotensi Rugi
              </span>
              <span className="text-red-500 text-lg font-bold cursor-pointer">
                ›
              </span>
            </div>
            <p className="text-2xl font-bold text-red-700">54</p>
            <span className="text-xs text-gray-500">produk</span>
          </div>

          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-3 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-yellow-700">
                Jumlah Stok
              </span>
              <span className="text-yellow-500 text-lg font-bold cursor-pointer">
                ›
              </span>
            </div>
            <p className="text-2xl font-bold text-yellow-700">198</p>
            <span className="text-xs text-gray-500">produk</span>
          </div>

          <div className="bg-blue-100 border border-blue-200 rounded-lg p-3 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-blue-700">
                Dekat Kadaluarsa
              </span>
              <span className="text-blue-500 text-lg font-bold cursor-pointer">
                ›
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-700">11</p>
            <span className="text-xs text-gray-500">stok</span>
          </div>

          <div className="bg-purple-100 border border-purple-200 rounded-lg p-3 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-purple-700">
                Sudah Kadaluarsa
              </span>
              <span className="text-purple-500 text-lg font-bold cursor-pointer">
                ›
              </span>
            </div>
            <p className="text-2xl font-bold text-purple-700">589</p>
            <span className="text-xs text-gray-500">stok</span>
          </div>
        </div>
      </div>
    </div>
  );
}
