import React, { useState, useEffect } from "react";
import PageHeader2 from "../components/PageHeader2"; // Asumsi Anda memiliki komponen PageHeader2
import { format, parse } from 'date-fns';
import { id } from 'date-fns/locale'; // Untuk format tanggal Indonesia
import dataPembelian from "../pembelian.json"; // Mengimpor data JSON

const formatDate = (dateString) => {
  try {
    const parsedDate = parse(dateString, 'dd/MM/yyyy HH.mm', new Date());
    return format(parsedDate, 'dd MMMM<ctrl3348> HH:mm', { locale: id });
  } catch (error) {
    console.error("Error parsing date:", error);
    return dateString;
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
};

const Pembelian = () => {
  const [pembelianData, setPembelianData] = useState(dataPembelian); // Menggunakan data dari file JSON
  const [filterTanggal, setFilterTanggal] = useState({
    startDate: new Date("2024-05-30"),
    endDate: new Date("2024-06-06"),
  });
  const [totalPembelian, setTotalPembelian] = useState(0);
  const [jumlahPembelian, setJumlahPembelian] = useState(0);

  useEffect(() => {
    // Hitung total dan jumlah pembelian berdasarkan filter tanggal
    const filteredData = pembelianData.filter(item => {
      const tanggalPembelian = parse(item.tanggal.split(' ')[0], 'dd/MM/yyyy', new Date());
      return tanggalPembelian >= filterTanggal.startDate && tanggalPembelian <= filterTanggal.endDate;
    });

    const total = filteredData.reduce((acc, item) => acc + item.total, 0);
    const jumlah = filteredData.length;

    setTotalPembelian(total);
    setJumlahPembelian(jumlah);
  }, [pembelianData, filterTanggal]);

  const handleDetail = (noSP) => {
    alert(`Detail untuk No. SP: ${noSP}`);
    // Implementasikan logika untuk menampilkan detail pembelian
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-auto bg-gray-50">
      <PageHeader2 title="Pembelian" />

      {/* Filter Tanggal dan Tombol Pesanan Baru */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <label htmlFor="filterTanggal" className="mr-3 text-sm font-medium text-gray-700">Filter Tanggal:</label>
          <input
            type="date"
            id="startDate"
            className="border rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={format(filterTanggal.startDate, 'yyyy-MM-dd')}
            onChange={(e) => setFilterTanggal({ ...filterTanggal, startDate: new Date(e.target.value) })}
          />
          <span className="mx-2 text-sm font-medium">s.d.</span>
          <input
            type="date"
            id="endDate"
            className="border rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={format(filterTanggal.endDate, 'yyyy-MM-dd')}
            onChange={(e) => setFilterTanggal({ ...filterTanggal, endDate: new Date(e.target.value) })}
          />
        </div>
        <button className="bg-green-500 text-white rounded-lg px-6 py-2 text-sm font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
          Pesanan Baru
        </button>
      </div>

      {/* Tabel Pembelian */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg mb-6 mx-6">
        <table className="min-w-full table-auto text-sm text-gray-700">
        <thead className="bg-indigo-600 text-white">
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
            {pembelianData
              .filter(item => {
                const tanggalPembelian = parse(item.tanggal.split(' ')[0], 'dd/MM/yyyy', new Date());
                return tanggalPembelian >= filterTanggal.startDate && tanggalPembelian <= filterTanggal.endDate;
              })
              .map((item) => (
                <tr key={item.no} className="border-t">
                  <td className="px-6 py-4">{item.no}</td>
                  <td className="px-6 py-4">{formatDate(item.tanggal)}</td>
                  <td className="px-6 py-4">{item.noSP}</td>
                  <td className="px-6 py-4">{item.supplier}</td>
                  <td className="px-6 py-4">{item.produk}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'OPEN' ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">{formatCurrency(item.total)}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleDetail(item.noSP)} className="bg-blue-500 text-white rounded-lg px-4 py-2 text-xs hover:bg-blue-700 focus:outline-none">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Rekap Pembelian */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Rekap {format(filterTanggal.startDate, 'dd MMM', { locale: id })} s.d. {format(filterTanggal.endDate, 'dd MMM', { locale: id })}</h2>
        <div className="flex justify-between mb-4">
          <p className="text-sm font-medium">Total Nilai Pesanan:</p>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalPembelian)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-medium">Jumlah Pesanan:</p>
          <p className="text-lg font-semibold text-gray-900">{jumlahPembelian} Transaksi</p>
        </div>
      </div>
    </div>
  );
};

export default Pembelian;
