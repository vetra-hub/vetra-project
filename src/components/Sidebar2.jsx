import React from "react";

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, ClipboardList, Boxes, PackagePlus,
  MessageCircle, Gift, Wallet, PhoneCall, BarChart3, PieChart, Users,
  Settings, Store, CreditCard, Sliders, Plug, Globe, Network
} from "lucide-react";



const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Penjualan", icon: ShoppingCart, path: "/penjualan" },
  // { name: "Pelayanan", icon: ClipboardList, path: "/pelayanan" },
  { name: "Persediaan", icon: Boxes, path: "/persediaan" },
  { name: "Pembelian", icon: PackagePlus, path: "/pembelian" },
  

  // { name: "Komunikasi", icon: MessageCircle, path: "/komunikasi" },
  // { name: "Program Promo", icon: Gift, path: "/promo" },
  // { name: "Keuangan", icon: Wallet, path: "/keuangan" },
  // { name: "Kontak", icon: PhoneCall, path: "/kontak" },
  // { name: "Laporan", icon: BarChart3, path: "/laporan" },
  // { name: "Analitis", icon: PieChart, path: "/analisis" },
  // { name: "Manajemen Pengguna", icon: Users, path: "/pengguna" },
  // { name: "Pengaturan", icon: Settings, path: "/pengaturan" },
  // { name: "Profil Apotek", icon: Store, path: "/profil" },
  // { name: "Metode Pembayaran", icon: CreditCard, path: "/pembayaran" },
  // { name: "Konfigurasi", icon: Sliders, path: "/konfigurasi" },
  // { name: "Integrasi Platform", icon: Plug, path: "/integrasi" },
  // { name: "Apotek Online", icon: Globe, path: "/online" },
  // { name: "Multi Outlet", icon: Network, path: "/outlet" }
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