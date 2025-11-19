import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contato = () => {
  return (
    <div className="w-full min-h-screen bg-[#0A1022] text-white px-6 py-20">
      
      {/* TÍTULO */}
      <h1 className="text-center text-5xl font-bold text-[#570000] mb-12">
        Entre em Contato
      </h1>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">

        {/* INFOS DE CONTATO */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-[#570000]">
            Informações
          </h2>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-[#570000] text-3xl" />
            <p className="text-xl">contato@devsync.com</p>
          </div>

          <div className="flex items-center gap-4">
            <FaPhone className="text-[#570000] text-3xl" />
            <p className="text-xl">(11) 90000-0000</p>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-[#570000] text-3xl" />
            <p className="text-xl">São Paulo - SP, Brasil</p>
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white rounded-xl p-8 shadow-xl text-black">
          <h2 className="text-3xl font-semibold text-[#570000] mb-6">
            Envie uma mensagem
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Nome</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#570000]"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">E-mail</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#570000]"
                placeholder="seuemail@email.com"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Mensagem</label>
              <textarea
                rows="4"
                className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#570000]"
                placeholder="Digite sua mensagem..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#570000] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#6d0000] transition"
            >
              Enviar
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contato;
