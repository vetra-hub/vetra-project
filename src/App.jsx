import React,{ Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import AuthLayout2 from "./layouts/AuthLayout2";
import Login1 from "./pages/auth/Login1";
import Register1 from "./pages/auth/Register1";
import Forgot1 from "./pages/auth/Forgot1";
import { Import } from "lucide-react";
import AlatKesehatan from "./pages/AlatKesehatan";
import DaftarObat from "./pages/DaftarObat";
import ObatResep from "./pages/ObatResep";
import Pelanggan from "./pages/Pelanggan";
import RiwayatPembelian from "./pages/RiwayatPembelian";
import Artikel from "./pages/Artikel";
import FAQ from "./pages/FAQ";
// import Dashboard2 from "./pages/Dashboard2";
// import Penjualan from "./pages/Penjualan";
// import MainLayout2 from "./layouts/MainLayout2";
// import Pembelian from "./pages/Pembelian";
// import Persediaan from "./pages/Persediaan";
// import ErrorPage from './pages/ErrorPage';
// import AuthLayout from "./layouts/AuthLayout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";

const Dashboard2 = React.lazy(() => import("./pages/Dashboard2"))
const Penjualan = React.lazy(() => import("./pages/Penjualan"))
const MainLayout2 = React.lazy(() => import("./layouts/MainLayout2"))
const Pembelian = React.lazy(() => import("./pages/Pembelian"))
const Persediaan = React.lazy(() => import("./pages/Persediaan"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
const DetailPenjualan = React.lazy(() => import("./pages/DetailPenjualan"))
const DetailPersediaan = React.lazy(() => import("./pages/DetailPersediaan"))

function App() {
  return (
   <Suspense fallback={<Loading/>}>
      <Routes>
        <Route element={<MainLayout2 />}>
          <Route path="/" element={<Dashboard2 />} />
          <Route path="/penjualan" element={<Penjualan />} />
          <Route path="/penjualan/:noStruk" element={<DetailPenjualan />} />
          <Route path="/pembelian" element={<Pembelian />} />
          <Route path="/persediaan" element={<Persediaan />} />
          <Route path="/persediaan/:id" element={<DetailPersediaan />} />
          <Route path="/alat_kesehatan" element={<AlatKesehatan />} />
          <Route path="/daftar_obat" element={<DaftarObat />} />
          <Route path="/obatresep" element={<ObatResep />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/riwayat_pembelian" element={<RiwayatPembelian />} />
          <Route path="/artikel" element={<Artikel/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/obatresep" element={<DaftarObat />} />
          <Route path="/error/400" element={<ErrorPage kode={400} />} />
          <Route path="/error/401" element={<ErrorPage kode={401} />} />
          <Route path="/error/403" element={<ErrorPage kode={403} />} />
        </Route>

        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot" element={<Forgot/>} />
        </Route>

        <Route element={<AuthLayout2/>}>
            <Route path="/login" element={<Login1 />} />
            <Route path="/register" element={<Register1/>} />
            <Route path="/forgot" element={<Forgot1/>} />
        </Route>
      </Routes>
    </Suspense>

  )
}

export default App;

// // import { useState } from "react";
// // import Dashboard from "./pages/Dashboard";
// // import Sidebar from "./layouts/Sidebar";
// // import Header from "./layouts/Header";
// // import "./assets/tailwind.css";
// // import { Route, Routes } from "react-router-dom";
// // import Customers from "./pages/Customers";
// // import Orders from "./pages/Orders";
// // import NotFound from "./pages/NotFound";
// // // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0);

// //   return (
// //     <div id="app-container" className="bg-gray-100 min-h-screen flex">
// //       <div id="layout-wrapper" className="flex flex-row flex-1">
// //         <Sidebar />
// //         <div className="flex-1 p-4">
// //           <Header />

// //           <Routes>
// //             <Route path="*" element={<NotFound />} />
// //             <Route path="/" element={<Dashboard />} />
// //             <Route path="/orders" element={<Orders />} />
// //             <Route path="/customers" element={<Customers />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// import "./assets/tailwind.css";

// import { Route, Routes } from "react-router-dom";
// import AuthLayout2 from "./layouts/AuthLayout2";
// import Login1 from "./pages/auth/Login1";
// import Register1 from "./pages/auth/Register1";
// import Forgot1 from "./pages/auth/Forgot1";
// import GuestLayout from "./layouts/GuestLayout";
// import About from "./components/guest/About";
// import StatsAndPromo from "./components/guest/StatsAndPromo";
// import HeroSection from "./components/guest/HeroSection";
// import ProductList from "./components/guest/ProductList";
// import FreshAndTestimonial from "./components/guest/FreshAndTestimonial";

// function App() {
//   return (
//     <Routes>
//       <Route element={<AuthLayout2 />}>
//         <Route path="/login" element={<Login1 />} />
//         <Route path="/register" element={<Register1 />} />
//         <Route path="/forgot" element={<Forgot1 />} />
//       </Route>

//       <Route element={<GuestLayout />}>
//         <Route path="/about" element={<About />} />
//         <Route path="/guest" element={<HeroSection />} />
//         <Route path="/product" element={<ProductList />} />
//         <Route path="/testimonial" element={<FreshAndTestimonial />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;
