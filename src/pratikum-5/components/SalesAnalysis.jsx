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
      <div className="bg-white p-4 rounded-xl shadow-md mt-4">
        <h2 className="text-blue-600 font-semibold mb-4">- Analisis Toko</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Grafik berdasarkan jam */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jam" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="freq"
                fill="#14b8a6"
                name="Freq. Penjualan 7 Hari Terakhir Berdasarkan Jam"
              />
            </BarChart>
          </ResponsiveContainer>
  
          {/* Grafik berdasarkan hari */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hari" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="freq"
                fill="#14b8a6"
                name="Freq. Penjualan 4 Pekan Terakhir Berdasarkan Hari"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  