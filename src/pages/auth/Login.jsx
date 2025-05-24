import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [activeTab, setActiveTab] = useState("apotek");

  return (
      <div >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Login Akun
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Mulai gunakan Apotek Digital sekarang!
        </p>

        <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-300">
          <button
            onClick={() => setActiveTab("apotek")}
            className={`w-1/2 py-2 text-sm font-medium ${
              activeTab === "apotek"
                ? "bg-white text-blue-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Akun Apotek
          </button>
          <button
            onClick={() => setActiveTab("owner")}
            className={`w-1/2 py-2 text-sm font-medium ${
              activeTab === "owner"
                ? "bg-white text-blue-700 shadow"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Akun Owner
          </button>
        </div>

        <form>
          <label className="block text-sm font-semibold mb-1">Alamat Email</label>
          <input
            type="email"
            placeholder="Misal: joko@gmail.com"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />

          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            placeholder="Ketik password disini"
            className="w-full mb-2 px-4 py-2 border rounded-md"
          />

          <div className="text-right text-sm mb-4">
            <Link to="/forgot" className="text-blue-500 hover:underline">
              Lupa password?
            </Link>
          </div>

          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-semibold">
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun apotek digital?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
   
  );
}
