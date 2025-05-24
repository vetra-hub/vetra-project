export default function NotFound() {
    return (
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-xl text-gray-700 mb-2">
            Halaman tidak ditemukan!
          </p>
          <p className="text-gray-500">
            Mungkin tautan yang Anda masukkan salah atau halaman telah dihapus.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => window.history.back()}
          >
            Kembali ke Halaman Sebelumnya
          </button>
        </div>
      </div>
    );
  }

