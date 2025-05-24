import { useState } from "react";
import InputField from "./components/InputField";
import Alert from "./components/Alert";
import Card from "./components/Card";

export default function HitungGajiForm() {
  const [gaji, setGaji] = useState("");
  const pajak = 0.11;
  const totalGaji = gaji ? gaji - gaji * pajak : 0;

  return (
    <Card judul="Hitung Gaji Bersih">
      <InputField
        label="Gaji"
        type="number"
        placeholder="Masukkan jumlah gaji"
        onChange={(e) => setGaji(e.target.value)}
      />
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Pajak: <b className="text-red-500">11%</b>
        </label>
      </div>

      {!gaji ? (
        <Alert pesan="Silahkan masukkan gaji yang valid (tidak boleh kosong atau negatif)." type="kosong" />
      ) : (
        <Alert pesan={`Total Take Home Pay (THP): Rp ${totalGaji.toLocaleString()}`} />
      )}
    </Card>
  );
}