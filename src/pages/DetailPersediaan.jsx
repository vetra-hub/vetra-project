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
    .get(
      `https://fyaxzdmlnubbwspnlrvp.supabase.co/rest/v1/persediaan?id=eq.${id}`,
      {
        headers: {
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5YXh6ZG1sbnViYndzcG5scnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Njg1MjQsImV4cCI6MjA2NTQ0NDUyNH0.tNcfZYkpUK40gfCaEPZ1I-P7SXd1qiUq1q6JF-s5TIU",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5YXh6ZG1sbnViYndzcG5scnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Njg1MjQsImV4cCI6MjA2NTQ0NDUyNH0.tNcfZYkpUK40gfCaEPZ1I-P7SXd1qiUq1q6JF-s5TIU`,
        },
      }
    )
    .then((res) => {
      if (res.data.length > 0) {
        setProduk(res.data[0]);
      } else {
        setError("Produk tidak ditemukan");
      }
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
