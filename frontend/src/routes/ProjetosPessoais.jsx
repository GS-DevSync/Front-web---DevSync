import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjetosPessoais = () => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [projetosPessoais, setProjetosPessoais] = useState([]);
  const [projetosSync, setProjetosSync] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

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
        const data = await response.json();
        setProjetosPessoais(data);
      } catch (err) {
        console.error("Erro ao carregar projetos pessoais:", err);
      }
    };

    const fetchProjetosSync = async () => {
      try {
        const response = await fetch(`http://localhost:3001/projetos/sync/${idUsuario}`);
        const data = await response.json();
        setProjetosSync(data);
      } catch (err) {
        console.error("Erro ao carregar projetos SYNC:", err);
      }
    };

    fetchPerfil();
    fetchProjetosPessoais();
    fetchProjetosSync();
  }, []);

  if (!perfil) return <p className="text-white p-10">Carregando...</p>;

  return (
    <div className="min-h-screen bg-[#0A1022] text-white flex gap-10 p-10">

      {/* CARD DO PERFIL — CLICÁVEL */}
      <div
        className="w-60 bg-[#11172E] p-4 rounded-2xl shadow-lg border border-[#570000] cursor-pointer hover:scale-[1.02] transition"
        onClick={() => setModalAberto(true)}
      >
        <div className="flex flex-col items-center">
          <img
            src={perfil.foto || "/default-avatar.png"}
            alt="Foto de perfil"
            className="w-24 h-24 object-cover rounded-full border border-[#570000] mb-4"
          />
          <h2 className="text-xl font-bold text-[#570000] mb-2">Meu Perfil</h2>

          <p className="text-center text-sm"><strong>{perfil.nome}</strong></p>
          <p className="text-center text-xs opacity-80">{perfil.email}</p>
          <p className="text-center text-xs mt-2 bg-[#570000] px-3 py-1 rounded-full">
            {perfil.area || "Área não informada"}
          </p>
        </div>
      </div>

      {/* PARTE PRINCIPAL */}
      <div className="flex-1 flex flex-col gap-8">

        {/* Projetos Pessoais */}
        <div className="bg-[#11172E] p-6 rounded-2xl shadow-lg border border-[#570000]">
          <h2 className="text-2xl font-bold mb-4 text-[#570000]">Meus Projetos</h2>

          {projetosPessoais.length === 0 ? (
            <p>Nenhum projeto criado por você ainda.</p>
          ) : (
            <ul className="list-disc pl-5">
              {projetosPessoais.map((proj) => (
                <li key={proj.id}>{proj.nome}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Projetos SYNC */}
        <div className="bg-[#11172E] p-6 rounded-2xl shadow-lg border border-[#570000]">
          <h2 className="text-2xl font-bold mb-4 text-[#570000]">Projetos SYNC</h2>

          {projetosSync.length === 0 ? (
            <p>Você não está inscrito em nenhum projeto.</p>
          ) : (
            <ul className="list-disc pl-5">
              {projetosSync.map((proj) => (
                <li key={proj.id}>{proj.nome}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* MODAL DE INFORMAÇÕES COMPLETAS */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#11172E] p-8 rounded-2xl border border-[#570000] w-[400px] relative">

            <button
              className="absolute top-3 right-3 text-white text-xl hover:text-[#570000]"
              onClick={() => setModalAberto(false)}
            >
              ✖
            </button>

            <div className="flex flex-col items-center">
              <img
                src={perfil.foto || "/default-avatar.png"}
                className="w-28 h-28 rounded-full border border-[#570000] object-cover mb-4"
              />
              <h2 className="text-2xl font-bold text-[#570000] mb-4">
                {perfil.nome}
              </h2>
            </div>

            <p><strong>Email:</strong> {perfil.email}</p>
            <p><strong>Tipo:</strong> {perfil.tipo}</p>
            <p><strong>Área:</strong> {perfil.area}</p>
            {perfil.bio && <p className="mt-2"><strong>Bio:</strong> {perfil.bio}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjetosPessoais;
