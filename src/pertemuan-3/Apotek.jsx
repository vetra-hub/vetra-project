import InputField from "./components/InputField";
import Card from "./components/Card";
import Alert from "./components/Alert";
import { useState } from "react";

export default function Apotek() {
    const [namaObat, setNamaObat] = useState("");
    const [jumlahObat, setJumlahObat] = useState("");
    const [status, setStatus] = useState("");

    // Validasi panjang minimal karakter
    const isNamaObatValid = namaObat.length >= 3;
    const isJumlahObatValid = jumlahObat.length > 0 && !isNaN(jumlahObat) && jumlahObat > 0;
    const isFormValid = namaObat && isNamaObatValid && jumlahObat && isJumlahObatValid && status;

    return (
      <div className="flex flex-col items-center justify-center m-5 p-5 bg-gradient-to-r from-green-100 via-green-200 to-teal-300 min-h-screen">
        <Card judul="🩺 Tambah Stok Obat 💊" className="flex flex-col items-center justify-center m-5 p-5 bg-gradient-to-r from-green-100 via-green-200 to-teal-300 min-h-screen">
          <InputField 
            label="Nama Obat" 
            type="text"
            placeholder="Silahkan ketik nama obat..."
            onChange={(e) => setNamaObat(e.target.value)} 
            className="mb-3"
          />
          {!namaObat && <Alert pesan="Silahkan masukkan nama obat!!" type="kosong" />}
          {namaObat && !isNamaObatValid && <Alert pesan="Nama obat minimal 3 karakter!" type="warning" />}

          <InputField 
            label="Jumlah Obat" 
            type="text" 
            placeholder="Silahkan ketik jumlah obat..."
            onChange={(e) => setJumlahObat(e.target.value)} 
            className="mb-3"
          />
          {!jumlahObat && <Alert pesan="Silahkan masukkan jumlah obat!!" type="kosong" />}
          {jumlahObat && !isJumlahObatValid && <Alert pesan="Jumlah obat harus angka positif!" type="warning" />}

          <div className="mt-3">
            <label className="block text-sm font-medium text-teal-800">Status</label>
            <select 
              className="w-full mt-2 p-2 border rounded-lg bg-green-50 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">🔽 Pilih status...</option>
              <option value="tersedia">✅ Stok Tersedia</option>
              <option value="hampir_habis">⚠️ Stok Terbatas</option>
              <option value="habis">❌ Stok Habis</option>
            </select>
            {!status && <Alert pesan="Silahkan pilih status!!" type="kosong" />}
          </div>

          {isFormValid && (
            <button className="w-full bg-gradient-to-r from-green-400 via-teal-400 to-green-500 mt-5 text-white p-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105 text-sm">
              Simpan
            </button>
          )}
        </Card>
      </div>
    );
}
