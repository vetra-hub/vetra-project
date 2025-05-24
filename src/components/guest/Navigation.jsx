import { FaTwitter, FaFacebookF, FaInstagram, FaUser } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";

export default function Navigation() {

  function Logo() {
    return (
      <div className="flex flex-col items-center px-4">
        <span className="font-poppins-extrabold text-[48px] text-gray-900 leading-none">
          Sedap <b className="text-hijau">.</b>
        </span>
      </div>
    );
  }

  return (
    <header className="shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-center px-10 py-4 bg-white text-base text-gray-800 gap-4 md:gap-0">
        {/* Left Icons */}
        <div className="flex space-x-5 items-center text-xl">
          <FaTwitter className="hover:text-green-600 cursor-pointer" />
          <FaFacebookF className="hover:text-green-600 cursor-pointer" />
          <FaInstagram className="hover:text-green-600 cursor-pointer" />
        </div>

        {/* Center Info in Grid Layout */}
        <div className="grid grid-cols-3 gap-10 items-center justify-center text-center md:text-left">
          {/* Email */}
          <div className="flex items-center space-x-2 text-sm justify-center md:justify-start">
            <FiMail className="text-green-600 text-xl" />
            <div>
              <div className="text-xs text-gray-500">Email</div>
              <div className="text-base font-medium">info@sedap.com</div>
            </div>
          </div>

         
          <Logo />

          {/* Phone */}
          <div className="flex items-center space-x-2 text-sm justify-center md:justify-end">
            <FiPhone className="text-green-600 text-xl" />
            <div>
              <div className="text-xs text-gray-500">Phone</div>
              <div className="text-base font-medium">92 666 888 0000</div>
            </div>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex space-x-5 items-center text-xl">
          <IoSearchOutline className="hover:text-green-600 cursor-pointer" />
          <PiShoppingCartSimple className="hover:text-green-600 cursor-pointer" />
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex justify-between items-center px-10 py-3 bg-gray-50 text-base font-medium text-gray-800 flex-wrap gap-y-3">
        {/* Login */}
        <div className="flex items-center space-x-3">
          <FaUser className="text-green-600 text-lg" />
          <Link to="/login" className="hover:text-green-600">
            Login
          </Link>
          <Link to="/register" className="hover:text-green-600">
            Register
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex flex-wrap justify-center space-x-6 text-lg">
          <NavLink
            to="/guest"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-bold border-b-2 border-green-600"
                : "text-gray-400 hover:text-green-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-bold border-b-2 border-green-600"
                : "text-gray-400 hover:text-green-600"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/product"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-bold border-b-2 border-green-600"
                : "text-gray-400 hover:text-green-600"
            }
          >
            Product
          </NavLink>

          <NavLink
            to="/testimonial"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-bold border-b-2 border-green-600"
                : "text-gray-400 hover:text-green-600"
            }
          >
            Testimonial
          </NavLink>
        </nav>

        {/* Language */}
        <div className="flex items-center space-x-2">
          <img
            src="https://flagcdn.com/id.svg"
            alt="Indonesia"
            className="w-6 h-6"
          />
          <span className="text-base">Indonesia</span>
        </div>
      </div>
    </header>
  );
}
