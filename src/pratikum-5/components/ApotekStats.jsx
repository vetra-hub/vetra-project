import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, Package, Truck, UserPlus } from "lucide-react";

const stats = [
  { title: "Database Pelanggan", value: 81, icon: <Users className="text-teal-500" />, color: "bg-teal-100" },
  { title: "Database Supplier", value: 29, icon: <Truck className="text-red-400" />, color: "bg-red-100" },
  { title: "Database Produk", value: 7202, icon: <Package className="text-blue-500" />, color: "bg-blue-100" },
  { title: "Database Dokter", value: 28, icon: <UserPlus className="text-pink-500" />, color: "bg-pink-100" }
];

const productTypes = [
  { name: "Obat", value: 7000, color: "#fda4af" },
  { name: "Alkes", value: 100, color: "#93c5fd" },
  { name: "Umum", value: 50, color: "#fcd34d" },
  { name: "Jasa", value: 52, color: "#99f6e4" }
];

export default function ApotekStats() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-4">
      <h2 className="text-blue-600 font-semibold mb-6 text-lg">- Database Apotek</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {/* Kartu Statistik */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
              <div className={`p-3 rounded-full ${item.color}`}>{item.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-xl font-semibold">{item.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tipe Produk Chart */}
        <div className="md:col-span-2 p-6 bg-green-50 rounded-xl h-full w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg text-blue-600 font-semibold">Tipe Produk</h3>
            <span className="text-lg text-blue-500 cursor-pointer">➤</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productTypes}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
              >
                {productTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
