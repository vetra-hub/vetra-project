import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 min-h-screen bg-gray-100">
        <Header />
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}