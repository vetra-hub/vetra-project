export default function About() {
  return (
    <div className="pt-0">
    

      {/* About Content Section */}
      <section className="py-20 px-4 md:px-24 relative bg-white">
        {/* Leaf Decoration */}
        <img
          src="/img/leaf-deco.png"
          alt="Leaf decoration"
          className="absolute bottom-0 left-0 w-40 opacity-10"
        />

        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Images */}
          <div className="flex gap-4">
            <img
              src="/img/foto1.jpg"
              alt="Grapes"
              className="w-44 h-64 object-cover rounded"
            />
            <img
              src="/img/foto2.jpg"
              alt="Vegetables"
              className="w-44 h-64 object-cover rounded"
            />
          </div>

          {/* Text */}
          <div className="md:w-1/2">
            <p className="text-green-600 text-sm font-medium">🌿 Get to Know</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kami menjual makanan berkualitas
            </h2>
            <p className="text-gray-600 mb-4">
            Ada banyak variasi hidangan yang tersedia, namun sebagian besar telah mengalami perubahan rasa atau tambahan bumbu yang tidak sepenuhnya autentik.</p>
            <p className="text-gray-600 mb-6">
            Ada banyak variasi hidangan yang tersedia, namun sebagian besar telah mengalami perubahan rasa atau tambahan bahan yang membuatnya terasa berbeda dari aslinya.
            </p>

            {/* Icons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                ✅ <div>
                  <strong>Magnis Dis Nascet</strong><br />
                  Lorem ipsum is free do sit
                </div>
              </div>
              <div className="flex items-center gap-2">
                ✅ <div>
                  <strong>Libero id Ege</strong><br />
                  Lorem ipsum is free do sit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
