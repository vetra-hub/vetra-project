import { createRoot } from "react-dom/client";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import "./assets/tailwind.css";

createRoot(document.getElementById("root")).render(
  <div id="app-container" className="bg-gray-100 min-h-screen flex">
    <div id="layout-wrapper" className="flex flex-row flex-1">
      <Sidebar />
      <div id="main-content" className="flex-1 p-4">
        <Header />
        <Dashboard />
      </div>
    </div>
  </div>
);