import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";
import ThemeToggle from "../components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const DEFAULT_AVATAR = "/mnt/data/8140d5d9-8360-4f78-45b2-a0f2-03ce3bbbced4.png";

export default function PerfilPessoal() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    areaDesenvolvimento: "",
    nivelSenioridade: "",
    sobre: "",
    foto: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idUsuario");
    if (!token || !id) {
      window.location.href = "/login";
      return;
    }

    const fetchPerfil = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/perfil/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuario(res.data);
        setFormData({
          nome: res.data.nome || "",
          email: res.data.email || "",
          dataNascimento: res.data.dataNascimento || "",
          areaDesenvolvimento: res.data.areaDesenvolvimento || "",
          nivelSenioridade: res.data.nivelSenioridade || "",
          sobre: res.data.sobre || "",
          foto: res.data.foto || ""
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

    fetchPerfil();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0A1022] flex items-center justify-center">
        <p className="text-white text-xl">Carregando perfil...</p>
      </div>
    );

  if (!usuario)
    return (
      <div className="min-h-screen bg-[#0A1022] flex items-center justify-center">
        <p className="text-white text-xl">Perfil não encontrado.</p>
      </div>
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const form = new FormData();
    form.append("foto", file);
    form.append("id", usuario.id);

    try {
      const res = await api.post("/perfil/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const imageUrl = res.data.foto || res.data.logo;
      setFormData((p) => ({ ...p, foto: imageUrl }));
    } catch (error) {
      console.error("Erro ao enviar foto:", error);
      alert("Erro ao enviar foto.");
    }
  };

  const handleRemoveFoto = () => {
    setFormData((p) => ({ ...p, foto: "" }));
  };

  const salvarPerfil = async () => {
    const token = localStorage.getItem("token");
    try {
      const payload = {
        nome: formData.nome,
        dataNascimento: formData.dataNascimento,
        areaDesenvolvimento: formData.areaDesenvolvimento,
        nivelSenioridade: formData.nivelSenioridade,
        sobre: formData.sobre,
        foto: formData.foto,
      };

      const res = await api.put(`/perfil/${usuario.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsuario(res.data);
      setEditando(false);
      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      alert("Erro ao salvar perfil.");
    }
  };

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
          theme === "dark"
            ? "bg-white text-[#0A1022]"
            : "bg-[#0A1022] text-white"
        }`}
      >
        <div className="flex items-center gap-6">
          <img
            src={formData.foto ? formData.foto : DEFAULT_AVATAR}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover"
          />

          <div className="flex-1">
            <h2 className="text-2xl text-[#570000]">{usuario.nome}</h2>
            <p className="text-sm text-gray-600">Área: {usuario.areaDesenvolvimento || "-"}</p>
            <p className="text-sm text-gray-600">Nível: {usuario.nivelSenioridade || "-"}</p>
          </div>

          <div className="flex flex-col items-end">

            {/* BOTÃO NOVO */}
            <button
              onClick={() => navigate("/projetospessoais")}
              className="mb-2 px-4 py-2 rounded-lg bg-[#121b38] text-white font-semibold hover:bg-[#050913] cursor-pointer"
            >
              Projetos Pessoais
            </button>

            {editando ? (
              <>
                <label className="cursor-pointer text-sm text-[#570000] underline mb-2">
                  Alterar foto
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFotoChange}
                  />
                </label>

                <button
                  onClick={handleRemoveFoto}
                  className="cursor-pointer text-sm underline mb-2 text-[#570000]"
                >
                  Remover
                </button>

                <button
                  onClick={salvarPerfil}
                  className="px-4 py-2 rounded-lg bg-[#570000] text-white"
                >
                  Salvar
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditando(true)}
                className="text-xs cursor-pointer px-4 py-2 rounded-lg bg-[#570000] text-white font-semibold"
              >
                Editar perfil
              </button>
            )}
          </div>
        </div>

        <hr className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">Nome</label>
            {editando ? (
              <input
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-xl"
              />
            ) : (
              <p>{usuario.nome}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">E-mail</label>
            <p>{usuario.email}</p>
          </div>

          <div>
            <label className="block font-semibold mb-2">Data de Nascimento</label>
            {editando ? (
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-xl"
              />
            ) : (
              <p>{usuario.dataNascimento || "-"}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">Área de Desenvolvimento</label>
            {editando ? (
              <select
                name="areaDesenvolvimento"
                value={formData.areaDesenvolvimento}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-xl"
              >
                <option value="">Selecione...</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Fullstack</option>
                <option value="mobile">Mobile</option>
                <option value="devops">DevOps</option>
                <option value="ux">UX</option>
                <option value="ui">UI</option>
                <option value="data">Data</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="embeddedIoT">Embedded / IoT</option>
              </select>
            ) : (
              <p>{usuario.areaDesenvolvimento || "-"}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">Nível</label>
            {editando ? (
              <select
                name="nivelSenioridade"
                value={formData.nivelSenioridade}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-xl"
              >
                <option value="">Selecione...</option>
                <option value="estagiario">Estagiário</option>
                <option value="junior">Júnior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Sênior</option>
                <option value="techLead">Tech Lead</option>
                <option value="arquiteto">Arquiteto</option>
                <option value="cto">CTO</option>
              </select>
            ) : (
              <p>{usuario.nivelSenioridade || "-"}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">Sobre</label>
            {editando ? (
              <textarea
                name="sobre"
                rows={4}
                value={formData.sobre}
                onChange={handleInputChange}
                className="w-full border p-3 rounded-xl"
              />
            ) : (
              <p className="whitespace-pre-line">{usuario.sobre || "-"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
