import { Link } from "react-router-dom";

export default function Register() {
  return (
      <div >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Daftar Akun
        </h2>

        <form>
          <label className="block text-sm font-semibold mb-1">Nama Lengkap</label>
          <input
            type="text"
            placeholder="Nama lengkap"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />

          <label className="block text-sm font-semibold mb-1">Alamat Email</label>
          <input
            type="email"
            placeholder="Misal: joko@gmail.com"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />

          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            placeholder="Buat password"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />

          <label className="block text-sm font-semibold mb-1">Konfirmasi Password</label>
          <input
            type="password"
            placeholder="Ulangi password"
            className="w-full mb-6 px-4 py-2 border rounded-md"
          />

          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-semibold">
            Daftar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login Sekarang
          </Link>
        </p>
      </div>
  );
}
