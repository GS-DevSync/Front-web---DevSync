import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import api from "../services/api";
import ThemeToggle from "../components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const DEFAULT_AVATAR = "/mnt/data/8140d5d9-8360-4d0e-aaea-a708aa204430.png";

const PerfilCorporativo = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [empresa, setEmpresa] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    email: "",
    areaAtuacao: "",
    site: "",
    descricao: "",
    logo: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idUsuario");
    if (!token || !id) {
      window.location.href = "/login";
      return;
    }

    const fetchEmpresa = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/perfil/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmpresa(res.data);
        setFormData({
          nomeEmpresa: res.data.nomeEmpresa || "",
          email: res.data.email || "",
          areaAtuacao: res.data.areaAtuacao || "",
          site: res.data.site || "",
          descricao: res.data.descricao || "",
          logo: res.data.logo || ""
        });
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        alert("Erro ao carregar perfil. Faça login novamente.");
        localStorage.removeItem("token");
        localStorage.removeItem("idUsuario");
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresa();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const token = localStorage.getItem("token");

    const form = new FormData();
    form.append("logo", file);
    form.append("id", empresa.id);

    try {
      const res = await api.post("/perfil/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const imageUrl = res.data.logo || res.data.foto;
      setFormData((prev) => ({ ...prev, logo: imageUrl }));
    } catch (error) {
      console.error("Erro ao enviar logo:", error);
      alert("Erro ao enviar logo.");
    }
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({ ...prev, logo: "" }));
  };

  const salvarEmpresa = async () => {
    const token = localStorage.getItem("token");
    try {
      const payload = {
        nomeEmpresa: formData.nomeEmpresa,
        areaAtuacao: formData.areaAtuacao,
        site: formData.site,
        descricao: formData.descricao,
        logo: formData.logo,
      };
      const res = await api.put(`/perfil/${empresa.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmpresa(res.data);
      setEditando(false);
      alert("Perfil da empresa atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar perfil da empresa:", err);
      alert("Erro ao salvar perfil da empresa.");
    }
  };

  if (loading)
    return (
      <div className="font-special min-h-screen bg-[#0A1022] flex items-center justify-center">
        <p className="text-white text-xl">Carregando perfil...</p>
      </div>
    );

  if (!empresa)
    return (
      <div className="min-h-screen bg-[#0A1022] flex items-center justify-center">
        <p className="text-white text-xl">Perfil não encontrado.</p>
      </div>
    );

  return (
    <div
      className={`font-special min-h-screen p-6 flex justify-center transition duration-300 ${
        theme === "dark" ? "bg-gray-300" : "bg-[#0A1022]"
      }`}
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div
        className={`w-full max-w-3xl rounded-3xl shadow-2xl p-8 border-l-4 border-[#570000] transition duration-300 ${
          theme === "dark" ? "bg-white text-[#0A1022]" : "bg-[#0A1022] text-white"
        }`}
      >
        <div className="flex items-center gap-6">
          <img
            src={formData.logo ? formData.logo : DEFAULT_AVATAR}
            alt="logo"
            className="w-28 h-28 rounded-full object-cover"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#570000]">
              {empresa.nomeEmpresa || empresa.nome}
            </h2>
            <p className="text-gray-600">Área: {empresa.areaAtuacao || "-"}</p>
            <p className="text-gray-600">Email: {empresa.email}</p>
          </div>

          <div className="flex flex-col items-end">
            {/* BOTÃO NOVO */}
            <button
              onClick={() => navigate("/projetospessoais")}
              className="cursor-pointer mb-2 px-4 py-2 rounded-lg bg-[#121b38] text-white font-semibold hover:bg-[#050913]"
            >
              Projetos Pessoais
            </button>

            {editando ? (
              <>
                <label className="cursor-pointer text-sm text-[#570000] underline mb-2">
                  Alterar logo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </label>

                <button
                  onClick={handleRemoveLogo}
                  className="text-sm underline mb-2 text-[#570000]"
                >
                  Remover
                </button>

                <button
                  onClick={salvarEmpresa}
                  className="px-4 py-2 rounded-lg bg-[#570000] text-white font-semibold"
                >
                  Salvar
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditando(true)}
                className="text-xs cursor-pointer hover:bg-[#570000] px-4 py-2 rounded-lg bg-[#570000] text-white font-semibold"
              >
                Editar perfil
              </button>
            )}
          </div>
        </div>

        <hr className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold mb-2 block">Nome da empresa</label>
            {editando ? (
              <input
                name="nomeEmpresa"
                value={formData.nomeEmpresa}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-xl"
              />
            ) : (
              <p>{empresa.nomeEmpresa || empresa.nome}</p>
            )}
          </div>

          <div>
            <label className="font-semibold mb-2 block">E-mail</label>
            <p>{empresa.email}</p>
          </div>

          <div>
            <label className="font-semibold mb-2 block">Área de atuação</label>
            {editando ? (
              <select
                name="areaAtuacao"
                value={formData.areaAtuacao}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-xl"
              >
                <option value="">Selecione...</option>
                <option value="programacao">Programação</option>
                <option value="marketing">Marketing</option>
                <option value="ux">UX</option>
                <option value="ui">UI</option>
                <option value="design">Design</option>
                <option value="vendas">Vendas</option>
                <option value="financeiro">Financeiro</option>
                <option value="rh">Recursos Humanos</option>
                <option value="administrativo">Administrativo</option>
              </select>
            ) : (
              <p>{empresa.areaAtuacao || "-"}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold mb-2 block">Site</label>
            {editando ? (
              <input
                name="site"
                value={formData.site}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-xl"
              />
            ) : (
              <p>{empresa.site || "-"}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold mb-2 block">Descrição</label>
            {editando ? (
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                rows={5}
                className="w-full border p-3 rounded-xl"
              />
            ) : (
              <p className="whitespace-pre-line">{empresa.descricao || "-"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilCorporativo;
