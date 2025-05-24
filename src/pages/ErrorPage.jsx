import React from 'react';
import { useNavigate } from 'react-router-dom';

const errorContent = {
  400: {
    title: "400 - Bad Request",
    message: "Permintaan tidak dapat diproses. Silakan periksa kembali input Anda.",
  },
  401: {
    title: "401 - Unauthorized",
    message: "Anda tidak memiliki otorisasi untuk mengakses halaman ini.",
  },
  403: {
    title: "403 - Forbidden",
    message: "Akses ke halaman ini dilarang. Silakan hubungi administrator.",
  }
};

const ErrorPage = ({ kode }) => {
  const navigate = useNavigate();
  const content = errorContent[kode] || errorContent[400];

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-2 text-red-600">{content.title}</h1>
      <p className="text-gray-600 mb-6">{content.message}</p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Kembali ke Dashboard
      </button>
    </div>
  );
};

export default ErrorPage;
