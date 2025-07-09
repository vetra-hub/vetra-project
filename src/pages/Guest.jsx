import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const Guest = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
        Selamat Datang di Halaman Guest
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Card 1 */}
        <a
          href="https://apotek-teal.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-blue-200 hover:scale-105 transition-transform duration-300"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            Izazi Syahirah Puteri Jusril
          </h2>
          <p className="text-gray-600 text-sm mb-4 text-center">
            Klik untuk melihat aplikasi Izazi Syahirah di Vercel
          </p>
          <FaExternalLinkAlt className="text-blue-500 text-2xl" />
        </a>

        {/* Card 2 */}
        <a
          href="https://apotekita-pcr.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-green-200 hover:scale-105 transition-transform duration-300"
        >
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            Muhammad Rifqi El Roffif
          </h2>
          <p className="text-gray-600 text-sm mb-4 text-center">
            Klik untuk melihat aplikasi Rifqi El Roffif di Vercel
          </p>
          <FaExternalLinkAlt className="text-green-500 text-2xl" />
        </a>
      </div>
    </div>
  );
};

export default Guest;
