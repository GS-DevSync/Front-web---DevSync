// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import { FaUsers, FaLaptopCode, FaBuilding } from "react-icons/fa";
import { MdDateRange, MdLocationOn, MdAccessTime } from "react-icons/md";
import computador from "../assets/computador.jpg";
import Logo from "../assets/logo1.png";
import React from "react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white">
      
      {/* HERO */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${computador})` }}
      >
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-[#570000] px-6">
          <img
            src={Logo}
            alt="Logo DevSync"
            className="w-28 h-28 object-contain scale-[5]"
          />

          <p className="text-white text-xl max-w-2xl text-center mt-6 font-special">
            Onde programadores e empresas se conectam
          </p>
        </div>
      </section>

      {/* SOBRE */}
      <section className="bg-white text-[#570000] py-20 px-6 text-center font-special">
        <h2 className="text-3xl md:text-5xl font-bold mb-20">Por que participar?</h2>
        <p className="text-[#0A1122] max-w-8xl mx-auto text-lg md:text-xl leading-relaxed mb-20">
          Aqui você cresce, aprende, publica projetos, recebe oportunidades,
          interage com outros devs e se conecta com empresas que buscam talentos.<br />
          Nossa comunidade visa criar oportunidades para devs de todo o Brasil, conectando as pessoas e engajando ainda mais a tecnologia.        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-[#0A1122] text-center font-special">
        <h3 className="text-4xl text-white mb-20">
          O que você encontra aqui
        </h3>

        <div className="text-[#0A1022] grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
          <FeatureCard
            Icon={FaUsers}
            title="Comunidade Ativa"
            text="Conecte-se com pessoas e empresas, faça networking e evolua junto com devs de todas as áreas."
          />

          <FeatureCard
            Icon={FaLaptopCode}
            title="Projetos & Portfólios"
            text="Publique e participe de projetos, adquirindo expêriencias e evoluindo em diversas linguagens da programação."
          />

          <FeatureCard
            Icon={FaBuilding}
            title="Conexão com Empresas"
            text="Empresas podem divulgar projetos com objetivo de selecionar novos colaboradores."
          />
        </div>
      </section>

      {/* PROJETOS DA COMUNIDADE  — substituir EVENTOS */}
      <section className="bg-white py-20 text-center font-special">
        <h3 className="text-4xl text-[#0A1022] mb-20">
          Projetos da Comunidade
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
          {projetos.map((p, i) => (
            <ProjetoCard key={i} projeto={p} />
          ))}
        </div>

        <button
          onClick={() => navigate("/projetos")}
          className="cursor-pointer mt-12 py-3 px-8 bg-[#0A1022] text-white rounded-full text-lg
                     hover:bg-[#570000] transition shadow-lg"
        >
          Mais projetos
        </button>
      </section>

      {/* NÚMEROS */}
      <section className="py-16 bg-[#0A1022] text-white text-center font-special">
        <h3 className="text-4xl mb-20">Nossos números</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto px-4 mb-20">
          <NumeroCard valor="12.000+" texto="Devs cadastrados" />
          <NumeroCard valor="400+" texto="Empresas parceiras" />
          <NumeroCard valor="150+" texto="Projetos publicados" />
        </div>
      </section>

      {/* CONTATO — nova sessão */}
      <section className="bg-white py-20 text-center font-special">
        <h3 className="text-4xl text-[#0A1022] mb-20">
          Entre em contato
        </h3>

        <p className="text-[#0A1022] max-w-3xl mx-auto text-lg mb-20">
          Tem alguma dúvida, sugestão ou deseja falar com nossa equipe?  
          Estamos aqui para ajudar você!
        </p>

        <button
          onClick={() => navigate("/contato")}
          className="py-3 px-10 bg-[#570000] text-white rounded-full text-lg 
                     hover:bg-[#0A1022] transition shadow-xl cursor-pointer"
        >
          Fale conosco
        </button>
      </section>

    </div>
  );
};

/* COMPONENTES ----------------------------- */

const FeatureCard = ({ Icon, title, text }) => (
  <div className="bg-white rounded-xl shadow-xl p-10 text-left 
                  hover:scale-105 transition border-l-4 border-[#570000]">
    <Icon className="text-6xl text-[#570000] mb-6" />
    <h4 className="text-2xl font-bold mb-3">{title}</h4>
    <p className="text-lg opacity-80">{text}</p>
  </div>
);

/* NOVOS PROJETOS */
const projetos = [
  {
    titulo: "Sistema de cadastro em Java",
    descricao: "Aplicação CRUD simples com foco em lógica e boas práticas.",
    stack: "Java + MySQL"
  },
  {
    titulo: "Landing Page com React",
    descricao: "Página moderna usando React, Hooks e integração com API.",
    stack: "React + Tailwind"
  },
  {
    titulo: "API Node.js completa",
    descricao: "API REST com autenticação, rotas privadas e MongoDB.",
    stack: "Node.js + MongoDB"
  },
];

const ProjetoCard = ({ projeto }) => (
  <div className="p-10 bg-white rounded-xl shadow-lg 
                  hover:scale-105 transition border-l-4 border-[#0A1022] text-left">

    <h4 className="text-2xl font-bold mb-3 text-[#570000]">
      {projeto.titulo}
    </h4>

    <p className="text-[#570000] font-medium mb-2">{projeto.stack}</p>
    <p className="text-[#0A1022] ">{projeto.descricao}</p>
  </div>
);

const NumeroCard = ({ valor, texto }) => (
  <div className="p-8 bg-white text-[#570000] rounded-xl shadow-lg">
    <p className="text-5xl font-extrabold">{valor}</p>
    <p className="text-lg mt-2">{texto}</p>
  </div>
);

export default Home;
