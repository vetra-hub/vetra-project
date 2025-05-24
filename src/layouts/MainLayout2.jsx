import React from "react";
import Sidebar2 from "../components/Sidebar2";
import Header2 from "../components/Header2";
import Footer2 from "../components/Footer2";
import { Outlet } from "react-router-dom";

export default function MainLayout2() {
  return (
    <div className="flex min-h-screen w-screen">
      <Sidebar2 />
      <div className="flex flex-col flex-1 bg-gray-100 pl-64">
        <Header2 />
        
        <Outlet/>
        <Footer2 />
      </div>
    </div>
  );
}
