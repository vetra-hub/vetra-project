// File: DetailPenjualan.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const DetailPenjualan = () => {
  const { noStruk } = useParams();
  const [transaksi, setTransaksi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/detailPenjualan?noStruk=${noStruk}`
        );

        if (response.data.length > 0) {
          setTransaksi(response.data[0]); // karena hasilnya array
        } else {
          setError("Data tidak ditemukan");
        }
      } catch (err) {
        setError("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [noStruk]);

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p>{error}</p>;

  return (
   <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Detail Penjualan</h2>
      <img
        src={transaksi.gambar}
        alt={transaksi.produk}
        className="w-full h-48 object-cover rounded mb-6 shadow"
      />
      <p>
        <strong>No Struk:</strong> {transaksi.noStruk}
      </p>
      <p>
        <strong>Produk:</strong> {transaksi.produk}
      </p>
      <p>
        <strong>Total:</strong> Rp {transaksi.total.toLocaleString()}
      </p>
      <p>
        <strong>Tanggal:</strong> {transaksi.tanggal}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {transaksi.dibatalkan ? (
          <span className="text-red-500 font-semibold">Dibatalkan</span>
        ) : (
          <span className="text-green-600 font-semibold">Berhasil</span>
        )}
      </p>
      <Link
        to="/penjualan"
        className="inline-block mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Kembali
      </Link>
    </div>
  );
};

export default DetailPenjualan;
