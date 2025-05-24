import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-poppins font-extrabold text-gray-800">
            <span className="text-black">Apotek</span>
            <span className="text-teal-500">Kita</span>
          </h1>
        </div>

        <Outlet />

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 Apotek Kita. All rights reserved.
        </p>
      </div>
    </div>
  );
}
