import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0A1122] text-white py-8 font-special">
      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center gap-6">

        {/* TEXTO */}
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} DevSync - todos os direitos reservados.
        </p>

        {/* ÍCONES */}
        <div className="flex justify-center items-center gap-8">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={24} />
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaFacebookF size={24} />
          </a>
        </div>

      </div>
    </footer>
  );
}
