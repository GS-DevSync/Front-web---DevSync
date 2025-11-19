import React from "react";
import Logo from "../assets/logo.png";

export default function Nav() {
  return (
    <header className="bg-[#0A1022] text-white shadow-md">
      <nav className="max-w-6xl mx-auto py-7 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <img 
            src={Logo} 
            alt="Logo" 
            className="w-15 h-20 scale-450 object-contain"/>
        </a>

        <ul className="font-special flex items-center gap-9 scale-110">
          <li className="hover:text-[#570000] cursor-pointer"><a href="/">Início</a></li>
          <li className="hover:text-[#570000] cursor-pointer"><a href="/Cadastro">Cadastro</a></li>
          <li className="hover:text-[#570000] cursor-pointer"><a href="/contato">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
}
