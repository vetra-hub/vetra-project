// src/utils/formatter.js
export function formatRupiah(angka) {
  if (!angka && angka !== 0) return "Rp0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}
