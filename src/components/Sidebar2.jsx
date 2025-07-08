import React from "react";

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, ClipboardList, Boxes, PackagePlus,
  MessageCircle, Gift, Wallet, PhoneCall, BarChart3, PieChart, Users,
  Settings, Store, CreditCard, Sliders, Plug, Globe, Network,
  Stethoscope,
  Pill,
  FileText,
  Newspaper,
  HelpCircle
} from "lucide-react";



const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Penjualan", icon: ShoppingCart, path: "/penjualan" },
  { name: "Persediaan", icon: Boxes, path: "/persediaan" },
  { name: "Pembelian", icon: PackagePlus, path: "/pembelian" },
 { name: "Alat Kesehatan", icon: Stethoscope, path: "/alat_kesehatan" },       // Ikon alat medis
  { name: "Daftar Obat", icon: Pill, path: "/daftar_obat" },                    // Ikon obat
  { name: "Obat Resep", icon: FileText, path: "/obatresep" },                   // Ikon dokumen
  { name: "Data Pelanggan", icon: Users, path: "/pelanggan" },                  // Ikon pengguna
  { name: "Riwayat Pembelian", icon: ShoppingCart, path: "/riwayat_pembelian" },// Ikon belanja
  { name: "Artikel", icon: Newspaper, path: "/artikel" },                       // Ikon berita
  { name: "FAQ", icon: HelpCircle, path: "/faq" },                              // Ikon pertanyaan
];

export default function Sidebar2() {
  return (
    <aside className="w-64 h-screen bg-blue-800 text-white flex flex-col fixed top-0 left-0 z-50">
  <div className="text-lg font-bold p-4 border-b border-blue-700">
    Apotek Kita
  </div>
  <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
    {menuItems.map(({ name, icon: Icon, path }) => (
      
      <NavLink
        key={name}
        to={path}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded hover:bg-blue-700 transition ${
            isActive ? "bg-blue-900 font-semibold" : ""
          }`
        }
      >
        <Icon size={20} />
        <span>{name}</span>
      </NavLink>



      
    ))}
  </nav>
</aside>

  );
}