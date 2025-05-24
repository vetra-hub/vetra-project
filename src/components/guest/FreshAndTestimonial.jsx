import testimonials from "./testimonials.json"; // pastikan path sesuai

export default function FreshAndTestimonial() {
  return (
    <section>
      {/* ... section Fresh tetap seperti sebelumnya ... */}

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-16 px-4 md:px-20 text-center">
        <p className="text-green-600 text-sm">Our Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">What People Say?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 shadow-md rounded-lg">
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 text-sm mb-4">{t.text}</p>
              <h4 className="font-semibold text-green-700">{t.name}</h4>
              <span className="text-xs text-gray-500">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
