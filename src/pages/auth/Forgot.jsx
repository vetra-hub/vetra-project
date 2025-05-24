import { Link } from "react-router-dom";

export default function Forgot() {
  return (
      <div >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Lupa Password
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Masukkan email untuk mereset password Anda
        </p>

        <form>
          <label className="block text-sm font-semibold mb-1">Alamat Email</label>
          <input
            type="email"
            placeholder="Misal: joko@gmail.com"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />

          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-semibold">
            Kirim Link Reset
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Kembali ke halaman{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    
  );
}
