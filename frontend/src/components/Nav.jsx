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
          
          <li>
            <a 
              href="/" 
              className="cursor-pointer transition transform hover:-translate-y-1 hover:scale-105 
                         hover:text-[#570000] duration-200 inline-block"
            >
              Início
            </a>
          </li>

          <li>
            <a 
              href="/cadastro" 
              className="cursor-pointer transition transform hover:-translate-y-1 hover:scale-105 
                         hover:text-[#570000] duration-200 inline-block"
            >
              Cadastro
            </a>
          </li>

          <li>
            <a 
              href="/contato" 
              className="cursor-pointer transition transform hover:-translate-y-1 hover:scale-105 
                         hover:text-[#570000] duration-200 inline-block"
            >
              Contato
            </a>
          </li>

          <li>
            <a 
              href="/projetos" 
              className="cursor-pointer transition transform hover:-translate-y-1 hover:scale-105 
                         hover:text-[#570000] duration-200 inline-block"
            >
              Projetos
            </a>
          </li>
        
        </ul>

      </nav>
    </header>
  );
}
