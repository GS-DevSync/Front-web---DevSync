import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_AVATAR = "https://i.imgur.com/6VBx3io.png"; // fallback

const ProjetosPessoais = () => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [projetosPessoais, setProjetosPessoais] = useState([]);
  const [projetosSync, setProjetosSync] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const idUsuario = localStorage.getItem("idUsuario");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!idUsuario || !token) return navigate("/login");

    const fetchPerfil = async () => {
      try {
        const response = await fetch(`http://localhost:3001/perfil/${idUsuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPerfil(data);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      }
    };

    const fetchProjetosPessoais = async () => {
      try {
        const response = await fetch(`http://localhost:3001/projetos/pessoais/${idUsuario}`);
        setProjetosPessoais(await response.json());
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProjetosSync = async () => {
      try {
        const response = await fetch(`http://localhost:3001/projetos/sync/${idUsuario}`);
        setProjetosSync(await response.json());
      } catch (err) {
        console.error(err);
      }
    };

    fetchPerfil();
    fetchProjetosPessoais();
    fetchProjetosSync();
  }, []);

  if (!perfil) return <p className="text-white p-10">Carregando...</p>;

  return (
    <div className="min-h-screen bg-[#0A1022] text-white flex gap-8 p-10">

      <div className="w-64 h-fit bg-[#11172E] p-5 rounded-2xl shadow-lg border border-[#570000] flex flex-col items-center">

        <img
          src={perfil.foto || DEFAULT_AVATAR}
          alt="foto-perfil"
          className="w-24 h-24 rounded-full object-cover border border-[#570000] mb-3 cursor-pointer hover:scale-105 transition"
          onClick={() => setModalOpen(true)}
        />

        <h2 className="text-lg font-semibold text-[#570000]">Meu Perfil</h2>

        <p className="text-center mt-2 font-bold">{perfil.nome}</p>
        <p className="text-center text-sm text-gray-300">{perfil.email}</p>

        <span className="mt-3 bg-[#570000] px-3 py-1 rounded-full text-xs">
          {perfil.areaDesenvolvimento || "Área não informada"}
        </span>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 px-3 py-2 bg-[#570000] text-white rounded-xl text-sm hover:bg-[#3a0000] transition cursor-pointer"
        >
          Ver Detalhes
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-8">


        <div className="bg-[#11172E] p-6 rounded-2xl shadow-xl border border-[#570000]">
          <h2 className="text-2xl font-bold mb-4 text-[#570000]">Meus Projetos</h2>

          {projetosPessoais.length === 0 ? (
            <p className="text-gray-300">Nenhum projeto criado por você ainda.</p>
          ) : (
            <ul className="list-disc pl-5">
              {projetosPessoais.map((proj) => (
                <li key={proj.id}>{proj.nome}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-[#11172E] p-6 rounded-2xl shadow-xl border border-[#570000]">
          <h2 className="text-2xl font-bold mb-4 text-[#570000]">Projetos SYNC</h2>

          {projetosSync.length === 0 ? (
            <p className="text-gray-300">Você não está inscrito em nenhum projeto.</p>
          ) : (
            <ul className="list-disc pl-5">
              {projetosSync.map((proj) => (
                <li key={proj.id}>{proj.nome}</li>
              ))}
            </ul>
          )}
        </div>
      </div>


      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-[#11172E] w-[400px] p-6 rounded-xl border border-[#570000] shadow-xl">
            <h2 className="text-xl font-bold text-[#570000] mb-4 text-center">Informações do Perfil</h2>

            <div className="flex flex-col items-center">
              <img
                src={perfil.foto || DEFAULT_AVATAR}
                className="w-28 h-28 rounded-full object-cover border border-[#570000] mb-3"
              />

              <p><strong>Nome:</strong> {perfil.nome}</p>
              <p><strong>Email:</strong> {perfil.email}</p>
              <p><strong>Tipo:</strong> {perfil.tipo}</p>
              <p><strong>Área:</strong> {perfil.areaDesenvolvimento || "Não informado"}</p>
              <p><strong>Nível:</strong> {perfil.nivelSenioridade || "Não informado"}</p>
              <p className="mt-2 whitespace-pre-line">
                <strong>Sobre:</strong> {perfil.sobre || "Sem descrição"}
              </p>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="mt-5 w-full bg-[#570000] py-2 rounded-lg hover:bg-[#3a0000] transition cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjetosPessoais;
