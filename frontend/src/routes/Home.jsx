// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import { FaUsers, FaLaptopCode, FaBuilding } from "react-icons/fa";
import { MdDateRange, MdLocationOn, MdAccessTime } from "react-icons/md";
import computador from "../assets/computador.jpg";
import React from "react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white">
      
        <section
          className="relative w-full h-screen bg-cover bg-center"
         style={{ backgroundImage: `url(${computador})` }}>
          <div className="absolute inset-0 bg-black/80"></div>

          {/* CONTEÚDO DA SEÇÃO */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
            <h1 className="text-8xl font-bold mb-4">DevSync</h1>
            <p className="text-xl max-w-2xl text-center">
            Onde programadores e empresas se conectam
            </p>
          </div>
        </section>

      {/* SOBRE A COMUNIDADE */}
      <section className="bg-[#0d47a1] text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Por que participar?</h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90 leading-relaxed">
          Aqui você cresce, aprende, publica projetos, recebe oportunidades,
          interage com outros devs e se conecta com empresas que buscam talentos.
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gray-100 text-center">
        <h3 className="text-4xl font-bold text-[#1a237e] mb-14">
          O que você encontra aqui
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">

          <FeatureCard
            Icon={FaUsers}
            title="Comunidade Ativa"
            text="Conheça pessoas, faça networking e evolua junto com devs de todo o país."
          />

          <FeatureCard
            Icon={FaLaptopCode}
            title="Projetos & Portfólios"
            text="Publique seus projetos e construa um portfólio que realmente chama atenção."
          />

          <FeatureCard
            Icon={FaBuilding}
            title="Conexão com Empresas"
            text="Empresas podem divulgar vagas e encontrar talentos direto na plataforma."
          />
        </div>
      </section>

      {/* EVENTOS */}
      <section className="bg-white py-20 text-center">
        <h3 className="text-4xl font-bold text-[#1a237e] mb-14">
          Eventos da Comunidade
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
          {eventos.map((e, i) => (
            <EventoCard key={i} evento={e} />
          ))}
        </div>

        <button
          onClick={() => navigate("/eventos")}
          className="mt-12 py-3 px-8 bg-[#1a237e] text-white rounded-full text-lg font-semibold 
                     hover:bg-[#283593] transition shadow-lg"
        >
          Ver todos os eventos
        </button>
      </section>

      {/* NÚMEROS */}
      <section className="py-16 bg-[#1a237e] text-white text-center">
        <h3 className="text-4xl font-bold mb-10">Nossos números</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto px-4">
          <NumeroCard valor="12.000+" texto="Devs cadastrados" />
          <NumeroCard valor="400+" texto="Empresas parceiras" />
          <NumeroCard valor="150+" texto="Projetos publicados" />
        </div>
      </section>

    </div>
  );
};

/* COMPONENTES REUTILIZÁVEIS ----------------------- */

const FeatureCard = ({ Icon, title, text }) => (
  <div className="bg-white rounded-xl shadow-xl p-10 text-left 
                  hover:scale-105 transition border-l-4 border-[#1a237e]">
    <Icon className="text-6xl text-[#1a237e] mb-6" />
    <h4 className="text-2xl font-bold mb-3">{title}</h4>
    <p className="text-lg opacity-80">{text}</p>
  </div>
);

const eventos = [
  { titulo: "Meetup React", local: "São Paulo - SP", data: "25/11", hora: "19:00" },
  { titulo: "Workshop Tailwind", local: "Online", data: "28/11", hora: "20:00" },
  { titulo: "Hackathon Dev Community", local: "Curitiba - PR", data: "10/12", hora: "08:00" }
];

const EventoCard = ({ evento }) => (
  <div className="p-10 bg-gray-100 rounded-xl shadow-lg 
                  hover:scale-105 transition border-l-4 border-[#1a237e] text-left">
    <h4 className="text-2xl font-bold mb-3 text-[#1a237e]">{evento.titulo}</h4>
    <p className="flex items-center gap-2 mb-1"><MdLocationOn /> {evento.local}</p>
    <p className="flex items-center gap-2 mb-1"><MdDateRange /> {evento.data}</p>
    <p className="flex items-center gap-2"><MdAccessTime /> {evento.hora}</p>
  </div>
);

const NumeroCard = ({ valor, texto }) => (
  <div className="p-8 bg-white text-[#1a237e] rounded-xl shadow-lg">
    <p className="text-5xl font-extrabold">{valor}</p>
    <p className="text-lg mt-2 opacity-80">{texto}</p>
  </div>
);

export default Home;
