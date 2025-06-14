import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import PageHeader2 from "../components/PageHeader2";

const DetailPersediaan = () => {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
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
    axios
      .get(`http://localhost:3001/detailPersediaan/${id}`) // sesuaikan endpoint API
      .then((res) => {
        setProduk(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat detail produk");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!produk) return <p className="p-4">Data produk tidak ditemukan</p>;

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-auto bg-gray-50 p-6">
      <PageHeader2 title={`Detail Produk: ${produk.nama}`} />

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Gambar Produk */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={produk.image}
            alt={produk.nama}
            className="rounded-lg object-cover w-full h-64 md:h-full"
          />
        </div>

        {/* Detail Produk */}
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold mb-4">{produk.nama}</h2>
          <p className="mb-2">
            <span className="font-semibold">Rak:</span> {produk.rak}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Stok:</span> {produk.stok} {produk.satuan}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Harga Pokok:</span>{" "}
            {formatCurrency(produk.hargaPokokMin)} - {formatCurrency(produk.hargaPokokMax)}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Harga Jual:</span>{" "}
            {formatCurrency(produk.hargaJualMin)} - {formatCurrency(produk.hargaJualMax)}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Min. Markup:</span> {produk.minMarkup}% - {produk.maxMarkup}%
          </p>
          <p className="mb-2">
            <span className="font-semibold">Status:</span> {produk.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPersediaan;
