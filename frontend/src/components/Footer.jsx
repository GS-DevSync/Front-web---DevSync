import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-gray-300 py-8 relative">
      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Texto */}
        <p className="text-sm">&copy; {new Date().getFullYear()} DevSync - todos os direitos reservados.</p>

        {/* Ícones de redes sociais */}
        <div className="flex justify-center items-center gap-8 w-full md:w-auto md:absolute left-1/2 -translate-x-1/2">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={22} />
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaFacebookF size={22} />
          </a>
        </div>

      </div>
    </footer>
  );
}
