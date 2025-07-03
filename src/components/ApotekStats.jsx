import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, Package, Truck, UserPlus } from "lucide-react";

const stats = [
  { title: "Database Pelanggan", value: 81, icon: <Users className="text-teal-500 w-4 h-4" />, color: "bg-teal-100" },
  { title: "Database Supplier", value: 29, icon: <Truck className="text-red-400 w-4 h-4" />, color: "bg-red-100" },
  { title: "Database Produk", value: 7202, icon: <Package className="text-blue-500 w-4 h-4" />, color: "bg-blue-100" },
  { title: "Database Dokter", value: 28, icon: <UserPlus className="text-pink-500 w-4 h-4" />, color: "bg-pink-100" }
];

const productTypes = [
  { name: "Tablet", value: 7000, color: "#fda4af" },
  { name: "Kapsul", value: 100, color: "#93c5fd" },
  { name: "Sirup", value: 50, color: "#fcd34d" },
  { name: "Salep", value: 52, color: "#99f6e4" }
];

export default function ApotekStats() {
  return (
    <div className="bg-white p-3 rounded-xl shadow-md">
      <h2 className="text-blue-600 font-semibold mb-3 text-xs">- Database Apotek</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-start">
        {/* Statistik */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {stats.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
              <div className={`p-2 rounded-full ${item.color}`}>{item.icon}</div>
              <div>
                <p className="text-[10px] text-gray-500">{item.title}</p>
                <p className="text-sm font-semibold">{item.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="md:col-span-2 p-3 bg-green-50 rounded-xl h-full w-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs text-blue-600 font-semibold">Kategori Obat</h3>
            <span className="text-xs text-blue-500 cursor-pointer">➤</span>
          </div>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productTypes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  innerRadius={30}
                >
                  {productTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
