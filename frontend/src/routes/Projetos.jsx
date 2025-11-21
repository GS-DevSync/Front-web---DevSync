import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Projetos = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [mensagemSync, setMensagemSync] = useState("");

  const linguagens = [
    "Todos",
    "ReactJS",
    "Node.js",
    "Full Stack",
    "Vue.js",
    "Python",
    "Java",
    "HTML/CSS",
    "HTML/CSS/JS",
    "Edge Computing",
    "IA",
    "C#",
    "Flutter",
    "Go",
  ];

  const projetos = [
    { titulo: "Plataforma de Estudos em React", linguagem: "ReactJS", sobre: "Ambiente moderno para organização de estudos.", objetivo: "Criar um ecossistema colaborativo." },
    { titulo: "API de Autenticação", linguagem: "Node.js", sobre: "API segura com JWT.", objetivo: "Autenticação criptografada para usuários." },
    { titulo: "Site da Comunidade Dev", linguagem: "Full Stack", sobre: "Portal para conectar devs a empresas.", objetivo: "Promover colaboração real em projetos." },
    { titulo: "Dashboard em Vue", linguagem: "Vue.js", sobre: "Dashboard minimalista para visualização de dados.", objetivo: "Exibir métricas de forma intuitiva." },

    // PYTHON
    { titulo: "Sistema de Reconhecimento Facial", linguagem: "Python", sobre: "Identifica rostos com OpenCV.", objetivo: "Automatizar validação de identidade." },
    { titulo: "Bot de Automação", linguagem: "Python", sobre: "Bot com Selenium.", objetivo: "Realizar tarefas repetitivas." },
    { titulo: "API de Machine Learning", linguagem: "Python", sobre: "API Flask servindo modelos.", objetivo: "Criar endpoints de previsão." },

    // JAVA
    { titulo: "Sistema de Gestão Escolar", linguagem: "Java", sobre: "Sistema com Spring Boot.", objetivo: "Gerenciar notas e matrículas." },
    { titulo: "Controle de Estoque", linguagem: "Java", sobre: "CRUD completo.", objetivo: "Automatizar controle de produtos." },

    // HTML / CSS / JS
    { titulo: "Landing Page Responsiva", linguagem: "HTML/CSS", sobre: "Página moderna.", objetivo: "Exibir serviços." },
    { titulo: "Portfólio Moderno", linguagem: "HTML/CSS/JS", sobre: "Portfólio animado.", objetivo: "Apresentar projetos." },

    // REACT
    { titulo: "Chat em Tempo Real", linguagem: "ReactJS", sobre: "Chat com Firebase.", objetivo: "Comunicação instantânea." },
    { titulo: "Kanban App", linguagem: "ReactJS", sobre: "Quadro estilo Trello.", objetivo: "Organizar tarefas." },

    // EDGE
    { titulo: "Monitoramento IoT", linguagem: "Edge Computing", sobre: "Dados em nodes locais.", objetivo: "Reduzir latência." },
    { titulo: "Processamento de Vídeo", linguagem: "Edge Computing", sobre: "Análise no edge.", objetivo: "Detectar eventos." },

    // IA
    { titulo: "Gerador de Texto", linguagem: "IA", sobre: "Modelo transformer.", objetivo: "Criar textos automaticamente." },
    { titulo: "Sistema de Recomendação", linguagem: "IA", sobre: "Baseado em histórico.", objetivo: "Personalizar conteúdo." },

    // C#
    { titulo: "Jogo 2D", linguagem: "C#", sobre: "Jogo em Unity.", objetivo: "Criar mecânicas básicas." },
    { titulo: "Login Desktop", linguagem: "C#", sobre: "Windows Forms.", objetivo: "Autenticação local." },

    // FLUTTER
    { titulo: "App de Rotinas", linguagem: "Flutter", sobre: "Organização pessoal.", objetivo: "Gerenciar tarefas." },
    { titulo: "Gastos Mensais", linguagem: "Flutter", sobre: "Controle financeiro.", objetivo: "Monitorar despesas." },

    // GO
    { titulo: "Servidor HTTP", linguagem: "Go", sobre: "Servidor rápido.", objetivo: "Alta performance." },
    { titulo: "Logs Estruturados", linguagem: "Go", sobre: "Monitoramento eficiente.", objetivo: "Criar logs limpos." },
  ];

  const filtrados = projetos.filter((p) => {
    const text = busca.toLowerCase();
    const matchBusca =
      p.titulo.toLowerCase().includes(text) ||
      p.sobre.toLowerCase().includes(text) ||
      p.objetivo.toLowerCase().includes(text) ||
      p.linguagem.toLowerCase().includes(text);

    const matchFiltro = filtro === "Todos" || p.linguagem === filtro;

    return matchBusca && matchFiltro;
  });

  // FUNÇÃO DO SYNC
  const handleSync = () => {
    setMensagemSync("Pedido para sincronizar enviado");

    setTimeout(() => {
      navigate("/projetospessoais");
    }, 1200);
  };

  return (
    <div className="font-special min-h-screen bg-[#0A1122] text-white p-6 md:p-12 font-poppins">
      
      <h1 className="text-4xl font-bold mb-8 text-center text-[#570000]">
        Projetos da Comunidade
      </h1>

      {/* Busca */}
      <div className="max-w-3xl mx-auto mb-8">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Pesquisar por nome, linguagem, objetivo..."
          className="w-full p-3 rounded-lg bg-[#0A1022] text-white outline-none border border-[#1a2238] focus:border-[#570000]"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {linguagens.map((l) => (
          <button
            key={l}
            onClick={() => setFiltro(l)}
            className={`cursor-pointer px-4 py-2 rounded-full border transition ${
              filtro === l
                ? "bg-[#570000] border-[#570000] text-white"
                : "bg-[#0A1022] border-[#1a2238] text-gray-300 hover:border-white"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtrados.length === 0 ? (
          <p className="text-center w-full opacity-80 col-span-full">
            Nenhum projeto encontrado.
          </p>
        ) : (
          filtrados.map((p, i) => (
            <ProjetoCard key={i} p={p} abrir={() => {
              setMensagemSync("");
              setProjetoSelecionado(p);
            }} />
          ))
        )}
      </div>

      {/* MODAL */}
      {projetoSelecionado && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4">
          <div className="bg-[#0A1022] p-8 rounded-xl max-w-lg w-full border border-[#1a2238]">
            <h2 className="text-2xl font-bold text-white mb-4">
              {projetoSelecionado.titulo}
            </h2>

            <p className="text-[#570000] font-semibold mb-2">
              {projetoSelecionado.linguagem}
            </p>

            <p className="text-gray-300 mb-4">{projetoSelecionado.sobre}</p>

            <p className="text-gray-400 mb-6">{projetoSelecionado.objetivo}</p>

            {/* BOTÃO SYNC */}
            <button
              onClick={handleSync}
              className="cursor-pointer w-full mb-3 bg-white py-2 rounded-lg text-[#570000] font-semibold hover:bg-gray-500"
            >
              SYNC
            </button>

            {/* AVISO */}
            {mensagemSync && (
              <p className="text-green-400 text-center font-semibold mb-4">
                {mensagemSync}
              </p>
            )}

            <button
              onClick={() => setProjetoSelecionado(null)}
              className="cursor-pointer w-full bg-[#570000] py-2 rounded-lg text-white text-xs Ahover:bg-[#3d0000]"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

// CARD //
const ProjetoCard = ({ p, abrir }) => (
  <div className="bg-[#0A1022] p-6 rounded-xl shadow-lg border border-[#1a2238] hover:scale-[1.02] transition">
    <h2 className="text-xl text-white mb-3">{p.titulo}</h2>
    <p className="text-sm text-[#570000] font-semibold mb-2">{p.linguagem}</p>
    <p className="text-sm text-gray-300 mb-2">{p.sobre}</p>
    <p className="text-xs text-gray-400 mb-4">{p.objetivo}</p>

    <button
      onClick={abrir}
      className="cursor-pointer w-full bg-[#570000] py-2 rounded-lg text-white hover:bg-[#3d0000]"
    >
      Ver mais
    </button>
  </div>
);

export default Projetos;
