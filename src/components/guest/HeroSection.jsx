import React from 'react';

export default function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/img/backgorund.png')" }} // periksa kembali nama file-nya
      >
        {/* Overlay gelap agar teks lebih kontras */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Konten utama */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold font-poppins leading-tight">
            Sedap <br /> Food Market
          </h1>

          <p className="mt-6 text-lg md:text-2xl text-gray-200 max-w-xl mx-auto">
            Nikmati berbagai jenis makanan berkualitas di satu tempat.
          </p>

          <button className="mt-8 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-lg shadow-lg">
            Order Now
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <div className="bg-black bg-opacity-80 text-white py-8 flex flex-wrap justify-center text-center">
          {[
            { value: "8,080", label: "Organic Products Available" },
            { value: "697", label: "Healthy Recipes" },
            { value: "440", label: "Expert Team Members" },
            { value: "2,870", label: "Satisfied Customers" },
          ].map((stat, index) => (
            <div
              key={index}
              className="w-1/2 md:w-1/4 py-4 border-gray-600 border-b md:border-b-0 md:border-r last:border-r-0"
            >
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm mt-2 text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Promo Section */}
        <div className="flex flex-col md:flex-row items-center bg-green-500 text-white px-6 py-10 relative overflow-hidden">
          {/* Left Image */}
          <div className="md:w-1/2 relative z-10">
            <img
              src="/img/foto3.jpg"
              alt="Farmer with vegetables"
              className="rounded-lg mx-auto"
            />
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 px-6 mt-6 md:mt-0 relative z-10">
            <p className="text-sm">Shopping Store</p>
            <h2 className="text-3xl font-bold mb-4">Organic Food Only</h2>
            <p className="text-sm mb-6 max-w-md">
              Banyak variasi hidangan tersedia, namun kebanyakan telah dimodifikasi
              dengan tambahan rasa yang tidak autentik atau sentuhan yang tidak biasa.
            </p>

            <div className="flex gap-6 mb-6">
              <p className="font-bold text-white">🌾 Professional Farmers</p>
              <p className="font-bold text-white">🌱 Solution for Farming</p>
            </div>

            <button className="bg-black text-white px-6 py-2 font-medium hover:bg-gray-800">
              Order Now
            </button>
          </div>

          {/* Decorative Leaf Image */}
          <div className="absolute right-0 bottom-0 z-0 opacity-10">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIztqjnejRbRH_m9hstp03Pge4yZKhQwE7Ng&s"
              alt="leaf"
              className="w-48"
            />
          </div>
        </div>
      </section>
    </>
  );
}
