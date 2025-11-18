import React from "react";
export default function Nav() {
  return (
    <header className="bg-blue-800 text-white shadow-md">
      <nav className="max-w-6xl mx-auto py-7 flex justify-between items-center">
        <h1 className="text-xl font-bold">DevSync</h1>

        <ul className="flex items-center gap-9 ">
          <li className="hover:text-blue-300 cursor pointer"><a href="/">Início</a></li>
          <li className="hover:text-blue-300 cursor pointer"><a href="/sobre">Sobre</a></li>
          <li className="hover:text-blue-300 cursor pointer"><a href="/contato">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
}
