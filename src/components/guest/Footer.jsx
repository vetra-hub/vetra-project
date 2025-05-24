import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Grid untuk 3 kolom utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-500" />
                <span>666 888 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-green-500" />
                <span>info@company.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-500" />
                <span>66 Top Broklyn Street, New York</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-center">
            <h3 className="text-white font-semibold text-lg mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Partners */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-white font-semibold text-lg mb-4">Our Partners</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <img
                src="/img/logo3.jpg"
                alt="Partner 1"
                className="h-20 w-auto object-contain rounded-lg shadow-md"
              />
              <img
                src="/img/logo1.webp"
                alt="Partner 2"
                className="h-20 w-auto object-contain rounded-lg shadow-md"
              />
              <img
                src="/img/logo2.jpg"
                alt="Partner 3"
                className="h-20 w-auto object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Sedap Food Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
