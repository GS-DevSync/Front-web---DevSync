import React from "react";
import Logo from "../assets/logo.png";

export default function Nav() {
  return (
    <header className="bg-[#0A1022] text-white shadow-md">
      <nav className="max-w-6xl mx-auto py-7 flex flex-wrap justify-between items-center px-auto">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-2 mb-4 md:mb-0">
          <img 
            src={Logo} 
            alt="Logo" 
            className="w-20 h-20 object-contain scale-400"
          />
        </a>

        {/* LINKS */}
        <ul className="font-special flex flex-wrap items-center gap-10 text-lg md:text-xl">
          <li className="hover:text-[#570000] cursor-pointer">
            <a href="/">Início</a>
          </li>
          <li className="hover:text-[#570000] cursor-pointer">
            <a href="/cadastro">Cadastro</a>
          </li>
          <li className="hover:text-[#570000] cursor-pointer">
            <a href="/contato">Contato</a>
          </li>
        </ul>

      </nav>
    </header>
  );
}
