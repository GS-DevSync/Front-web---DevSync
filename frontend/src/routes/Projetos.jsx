import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Projetos = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [perfilSelecionado, setPerfilSelecionado] = useState(null);
  const [mensagemSync, setMensagemSync] = useState("");
  const [perfis, setPerfis] = useState([]);


  useEffect(() => {
    fetch("/perfis") 
      .then((res) => res.json())
      .then((data) => setPerfis(data))
      .catch((err) => console.error("Erro ao carregar perfis:", err));
  }, []);

  const linguagens = [
    "Todos","ReactJS","Node.js","Full Stack","Vue.js","Python","Java","HTML/CSS","HTML/CSS/JS","Edge Computing","IA","C#","Flutter","Go"
  ];

  const projetos = [
    { titulo: "Plataforma de Estudos em React", linguagem: "ReactJS", sobre: "Ambiente moderno para organização de estudos.", objetivo: "Criar um ecossistema colaborativo.", criador: "gica" },
    { titulo: "API de Autenticação", linguagem: "Node.js", sobre: "API segura com JWT.", objetivo: "Autenticação criptografada para usuários.", criador: "gigi" },
    { titulo: "Site da Comunidade Dev", linguagem: "Full Stack", sobre: "Portal para conectar devs a empresas.", objetivo: "Promover colaboração real em projetos.", criador: "oiuytds" },
    { titulo: "Dashboard em Vue", linguagem: "Vue.js", sobre: "Dashboard minimalista para visualização de dados.", objetivo: "Exibir métricas de forma intuitiva.", criador: "Ana" },
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

  const handleSync = () => {
    setMensagemSync("Pedido para sincronizar enviado");
    setTimeout(() => {
      navigate("/projetospessoais");
    }, 1200);
  };

  const perfilDoCriador = (username) => perfis.find(p => p.nome === username);

  return (
    <div className="font-special min-h-screen bg-[#0A1122] text-white p-6 md:p-12 font-poppins">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#570000]">
        Projetos da Comunidade
      </h1>

 
      <div className="max-w-3xl mx-auto mb-8">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Pesquisar por nome, linguagem, objetivo..."
          className="w-full p-3 rounded-lg bg-[#0A1022] text-white outline-none border border-[#1a2238] focus:border-[#570000]"
        />
      </div>


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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtrados.length === 0 ? (
          <p className="text-center w-full opacity-80 col-span-full">
            Nenhum projeto encontrado.
          </p>
        ) : (
          filtrados.map((p, i) => (
            <ProjetoCard
              key={i}
              p={p}
              abrir={() => setProjetoSelecionado(p)}
              abrirPerfil={() => setPerfilSelecionado(p.nome)}
            />
          ))
        )}
      </div>

      {projetoSelecionado && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4">
          <div className="bg-[#0A1122] p-8 rounded-xl max-w-lg w-full border border-[#1a2238]">
            <h2 className="text-2xl font-bold text-white mb-2">{projetoSelecionado.titulo}</h2>
            <p className="text-[#570000] font-semibold mb-2">{projetoSelecionado.linguagem}</p>
            <p className="text-gray-300 mb-2">{projetoSelecionado.sobre}</p>
            <p className="text-gray-400 mb-4">{projetoSelecionado.objetivo}</p>
            <p
              className="text-blue-400 underline cursor-pointer mb-6"
              onClick={() => setPerfilSelecionado(projetoSelecionado.criador)}
            >
              Criador: {projetoSelecionado.criador}
            </p>

            <button
              onClick={handleSync}
              className="cursor-pointer w-full mb-3 bg-white py-2 rounded-lg text-[#570000] font-semibold hover:bg-gray-500"
            >
              SYNC
            </button>

            {mensagemSync && (
              <p className="text-green-400 text-center font-semibold mb-4">
                {mensagemSync}
              </p>
            )}

            <button
              onClick={() => setProjetoSelecionado(null)}
              className="cursor-pointer w-full bg-[#570000] py-2 rounded-lg text-white text-xs hover:bg-[#3d0000]"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {perfilSelecionado && (
        <PerfilModal
          perfil={perfilDoCriador(perfilSelecionado)}
          fechar={() => setPerfilSelecionado(null)}
          navigate={navigate} // passa navigate pro modal
        />
      )}
    </div>
  );
};


const ProjetoCard = ({ p, abrir, abrirPerfil }) => (
  <div className="bg-[#0A1122] p-6 rounded-xl shadow-lg border border-[#1a2238] hover:scale-[1.02] transition">
    <h2 className="text-xl text-white mb-1">{p.titulo}</h2>
    <p className="text-sm text-[#570000] font-semibold mb-1">{p.linguagem}</p>
    <p className="text-xs text-gray-400 mb-1">
      Criador: <span className="text-blue-400 underline cursor-pointer" onClick={abrirPerfil}>{p.criador}</span>
    </p>
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

const PerfilModal = ({ perfil, fechar, navigate }) => {
  const [curtido, setCurtido] = useState(false);
  const [contador, setContador] = useState(perfil?.recomendacoes || 0);

  const handleCurtir = () => {
    if (!curtido) {
      setCurtido(true);
      setContador(contador + 1);
    }
  };

  const handleChat = () => {
    navigate("/chat", { state: { destinatario: perfil?.nome } });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4">
      <div className="bg-[#0A1122] p-6 rounded-xl max-w-md w-full border border-[#1a2238]">
        <h2 className="text-2xl font-bold mb-2">{perfil?.nome}</h2>
        <p className="text-gray-300 mb-2">Username: {perfil?.nome}</p>
        <p className="text-gray-400 mb-4">Área: {perfil?.areaDesenvolvimento}</p>
        <p className="text-gray-400 mb-4">Senioridade: {perfil?.nivelSenioridade}</p>

        <div className="flex gap-3 mb-4">
          <button
            onClick={handleCurtir}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg ${curtido ? "bg-red-500" : "bg-[#570000]"} text-white`}
          >
            ❤️ Recomendar ({contador})
          </button>
          <button
            onClick={handleChat}
            className="cursor-pointer bg-blue-800 px-4 py-2 rounded-lg text-white"
          >
            Enviar mensagem
          </button>
        </div>

        <button
          onClick={fechar}
          className="cursor-pointer w-full bg-[#570000] py-2 rounded-lg text-white hover:bg-[#3d0000]"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Projetos;
