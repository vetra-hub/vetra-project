import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";
import dataPembelian from "../pembelian.json";

const formatDate = (dateString) => {
  try {
    const parsedDate = parse(dateString, "dd/MM/yyyy HH.mm", new Date());
    return format(parsedDate, "dd MMMM HH:mm", { locale: id });
  } catch (error) {
    console.error("Error parsing date:", error);
    return dateString;
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const Pembelian = () => {
  const [pembelianData, setPembelianData] = useState(dataPembelian);
  const [filterTanggal, setFilterTanggal] = useState({
    startDate: new Date("2024-05-30"),
    endDate: new Date("2024-06-06"),
  });
  const [totalPembelian, setTotalPembelian] = useState(0);
  const [jumlahPembelian, setJumlahPembelian] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const filteredData = pembelianData.filter((item) => {
      const tanggalPembelian = parse(
        item.tanggal.split(" ")[0],
        "dd/MM/yyyy",
        new Date()
      );
      return (
        tanggalPembelian >= filterTanggal.startDate &&
        tanggalPembelian <= filterTanggal.endDate
      );
    });

    const total = filteredData.reduce((acc, item) => acc + item.total, 0);
    setTotalPembelian(total);
    setJumlahPembelian(filteredData.length);
  }, [pembelianData, filterTanggal]);

  const handleDetail = (noSP) => {
    alert(`Detail untuk No. SP: ${noSP}`);
  };

  const filteredData = pembelianData.filter((item) => {
    const tanggalPembelian = parse(
      item.tanggal.split(" ")[0],
      "dd/MM/yyyy",
      new Date()
    );
    const matchTanggal =
      tanggalPembelian >= filterTanggal.startDate &&
      tanggalPembelian <= filterTanggal.endDate;
    const matchKeyword =
      item.noSP.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.produk.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchTanggal && matchKeyword;
  });

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-auto bg-gray-50">
      <PageHeader2 title="Pembelian" />

      {/* Informasi Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 mt-6 mb-4">
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-sm text-gray-500">Total Supplier</h3>
          <p className="text-xl font-bold text-indigo-600">
            {[...new Set(pembelianData.map((p) => p.supplier))].length}
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-sm text-gray-500">Rata-rata Pembelian</h3>
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(totalPembelian / (jumlahPembelian || 1))}
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-sm text-gray-500">Produk Terbanyak Dibeli</h3>
          <p className="text-xl font-bold text-amber-600">
            {Object.entries(
              pembelianData.reduce((acc, cur) => {
                acc[cur.produk] = (acc[cur.produk] || 0) + 1;
                return acc;
              }, {})
            ).sort((a, b) => b[1] - a[1])[0]?.[0] || "-"}
          </p>
        </div>
      </div>

      {/* Filter dan Tombol */}
      <div className="bg-white rounded-xl shadow-lg p-6 mx-6 mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap gap-3 items-center">
          <label className="text-sm font-medium text-gray-700">
            Filter Tanggal:
          </label>
          <input
            type="date"
            value={format(filterTanggal.startDate, "yyyy-MM-dd")}
            onChange={(e) =>
              setFilterTanggal({
                ...filterTanggal,
                startDate: new Date(e.target.value),
              })
            }
            className="input input-bordered input-sm"
          />
          <span className="mx-1 text-sm">s.d.</span>
          <input
            type="date"
            value={format(filterTanggal.endDate, "yyyy-MM-dd")}
            onChange={(e) =>
              setFilterTanggal({
                ...filterTanggal,
                endDate: new Date(e.target.value),
              })
            }
            className="input input-bordered input-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="btn btn-success btn-sm">Pesanan Baru</button>
          <button className="btn btn-primary btn-sm">Export PDF</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-4">
        <input
          type="text"
          placeholder="Cari No. SP / Produk / Supplier..."
          className="input input-bordered w-full"
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg mb-6 mx-6">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">No.</th>
              <th className="px-6 py-3 text-left font-semibold">Tanggal</th>
              <th className="px-6 py-3 text-left font-semibold">No. SP</th>
              <th className="px-6 py-3 text-left font-semibold">Supplier</th>
              <th className="px-6 py-3 text-left font-semibold">Produk</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-right font-semibold">Total</th>
              <th className="px-6 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.no} className="border-t">
                <td className="px-6 py-4">{item.no}</td>
                <td className="px-6 py-4">{formatDate(item.tanggal)}</td>
                <td className="px-6 py-4">{item.noSP}</td>
                <td className="px-6 py-4">{item.supplier}</td>
                <td className="px-6 py-4">{item.produk}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "OPEN"
                        ? "bg-green-200 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {formatCurrency(item.total)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDetail(item.noSP)}
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 text-xs hover:bg-blue-700"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rekap */}
      <div className="bg-white rounded-xl shadow-lg p-6 mx-6 mb-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Rekap {format(filterTanggal.startDate, "dd MMM", { locale: id })} s.d.{" "}
          {format(filterTanggal.endDate, "dd MMM", { locale: id })}
        </h2>
        <div className="flex justify-between mb-4">
          <p className="text-sm font-medium">Total Nilai Pesanan:</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalPembelian)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-medium">Jumlah Pesanan:</p>
          <p className="text-lg font-semibold text-gray-900">
            {jumlahPembelian} Transaksi
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pembelian;
