import { FaEye, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import products from "./products.json"; // karena json ada di folder yang sama

export default function ProductList() {
  return (
    <section className="px-4 py-8">
      <div className="text-center mb-6">
        <p className="text-green-600 text-sm">Recently Added</p>
        <h2 className="text-3xl font-bold text-gray-800">New Products</h2>
      </div>

      <div className="flex justify-center gap-4 mb-6 flex-wrap text-sm">
        {["All", "Dairy", "Pantry", "Meat", "Fruits", "Vegetables"].map((cat) => (
          <button
            key={cat}
            className="hover:text-green-600 border-b-2 border-transparent hover:border-green-600"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-md overflow-hidden bg-white shadow-sm relative">
            {product.sale && (
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                Sale
              </span>
            )}
            <div className="flex justify-center items-center h-48 bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="h-32 object-contain"
              />
            </div>
            <div className="px-4 py-2 text-center">
              <div className="flex justify-center gap-2 mb-2 text-gray-400">
                <FaEye />
                <FaHeart />
                <FaShoppingCart />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
              <div className="flex justify-center text-green-500 my-1">
                {Array(product.rating)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
              </div>
              <p className="text-gray-600 font-medium">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
