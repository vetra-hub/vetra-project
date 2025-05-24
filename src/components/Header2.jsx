import React from "react";

export default function Header2() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">Dashboard Umum</div>
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-gray-800">🔔</button>
        <button className="text-gray-600 hover:text-gray-800">⚙️</button>
        <button className="text-gray-600 hover:text-gray-800">👤</button>
      </div>
    </header>
  );
}