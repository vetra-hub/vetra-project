import obatData from "./framework.json";

export default function ObatList() {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {obatData.map((item) => (
        <div key={item.id} className="border p-4 rounded-lg shadow-md bg-white">
          <img src={item.gambar} alt={item.nama_obat} className="w-full h-40 object-cover rounded-md mb-4" />
          <h2 className="text-lg font-bold text-gray-800">{item.nama_obat}</h2>
          <p className="text-sm text-gray-600 mb-2">{item.deskripsi}</p>
          <p className="text-sm mb-1"><span className="font-semibold">Kategori:</span> {item.kategori}</p>
          <p className="text-sm mb-1">
            <span className="font-semibold">Bentuk Sediaan:</span> {item.detail.bentuk_sediaan}
          </p>
          <p className="text-sm mb-1">
            <span className="font-semibold">Dosis:</span> {item.detail.dosis}
          </p>
          <p className="text-sm mb-3">
            <span className="font-semibold">Expired:</span> {item.detail.expired}
          </p>
          <div>
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
