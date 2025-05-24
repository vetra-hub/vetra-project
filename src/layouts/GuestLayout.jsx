import { Outlet } from "react-router-dom";
import Footer from "../components/guest/Footer";
import Navigation from "../components/guest/Navigation";

export default function GuestLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar/Header */}
      <Navigation />

      {/* Konten utama */}
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
