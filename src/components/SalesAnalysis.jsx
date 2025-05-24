import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const hourlyData = [
  { jam: "08:00", freq: 1 }, { jam: "09:00", freq: 1 }, { jam: "10:00", freq: 2 },
  { jam: "11:00", freq: 1 }, { jam: "12:00", freq: 1 }, { jam: "13:00", freq: 4 },
  { jam: "14:00", freq: 3 }, { jam: "15:00", freq: 4 }, { jam: "16:00", freq: 1 },
  { jam: "17:00", freq: 3 }, { jam: "18:00", freq: 2 }, { jam: "19:00", freq: 1 },
  { jam: "20:00", freq: 2 }, { jam: "21:00", freq: 2 }, { jam: "22:00", freq: 0 },
  { jam: "23:00", freq: 1 }, { jam: "00:00", freq: 0 }, { jam: "01:00", freq: 1 }
];

const dailyData = [
  { hari: "Senin", freq: 14 },
  { hari: "Selasa", freq: 12 },
  { hari: "Rabu", freq: 22 },
  { hari: "Kamis", freq: 6 },
  { hari: "Jumat", freq: 9 },
  { hari: "Sabtu", freq: 13 },
  { hari: "Minggu", freq: 7 }
];

export default function SalesAnalysis() {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm">
      <h2 className="text-blue-600 font-medium text-xs mb-2">- Analisis Penjualan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Grafik berdasarkan jam */}
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jam" fontSize={9} />
              <YAxis fontSize={9} width={20} />
              <Tooltip />
              <Bar
                dataKey="freq"
                fill="#14b8a6"
                name="Jam (7 Hari)"
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik berdasarkan hari */}
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hari" fontSize={9} />
              <YAxis fontSize={9} width={20} />
              <Tooltip />
              <Bar
                dataKey="freq"
                fill="#14b8a6"
                name="Hari (4 Pekan)"
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
