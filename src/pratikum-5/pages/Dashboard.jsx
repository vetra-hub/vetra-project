import React from "react";
import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import SalesAnalysis from "../components/SalesAnalysis";
import ApotekStats from "../components/ApotekStats";
export default function Dashboard() {
  return (
    <MainLayout>
      {/* <PageHeader title="Dashboard Umum" breadcrumb={[{ label: "Dashboard" }]} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <h2 className="text-lg font-semibold">Total Penjualan</h2>
          <p className="text-2xl font-bold text-green-600">4.585.000</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Retur Penjualan</h2>
          <p className="text-2xl font-bold text-red-500">-700</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Penjualan Tertolak</h2>
          <p className="text-2xl font-bold text-orange-400">95.000</p>
        </Card>
      </div>
      <div className="space-y-4">
      <SalesAnalysis />
    </div>
    <div className="space-y-6">
      <ApotekStats />
    </div>
    </MainLayout>
  );
}