import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const API_URL = "http://localhost:3001/perfil";
  const navigate = useNavigate();

  const [tipoPerfil, setTipoPerfil] = useState("pessoal"); // NOVO

  const [novoPerfil, setNovoPerfil] = useState({
    tipo: "pessoal",
    nome: "",
    dataNascimento: "",
    email: "",
    senha: "",
    nivelSenioridade: "",
    areaDesenvolvimento: "",
    // CAMPOS DE EMPRESA
    nomeEmpresa: "",
    areaEmpresa: "",
  });

  const cadastrarPerfil = async () => {
    // validação
    if (!novoPerfil.nome || !novoPerfil.email || !novoPerfil.senha) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (tipoPerfil === "pessoal") {
      if (
        !novoPerfil.dataNascimento ||
        !novoPerfil.nivelSenioridade ||
        !novoPerfil.areaDesenvolvimento
      ) {
        alert("Preencha todos os campos do perfil pessoal!");
        return;
      }
    }

    if (tipoPerfil === "empresa") {
      if (!novoPerfil.nomeEmpresa || !novoPerfil.areaEmpresa) {
        alert("Preencha todos os campos do perfil empresarial!");
        return;
      }
    }

    try {
      const response = await axios.post(API_URL, novoPerfil);
      alert(`Perfil ${response.data.nome} cadastrado com sucesso!`);

      navigate("/login");
    } catch (error) {
      console.log("Erro ao cadastrar perfil", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1022] flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 border-l-4 border-[#570000]">

        <h1 className="text-4xl text-center text-[#570000] mb-6 font-special">
          Cadastro
        </h1>

        {/* SWITCH PESSOAL / EMPRESA */}
        <div className="font-special flex justify-center mb-8 gap-4">
          <button
            onClick={() => {
              setTipoPerfil("pessoal");
              setNovoPerfil({ ...novoPerfil, tipo: "pessoal" });
            }}
            className={`cursor-pointer px-5 py-2 rounded-xl transition ${
              tipoPerfil === "pessoal"
                ? "bg-[#570000] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Pessoal
          </button>

          <button
            onClick={() => {
              setTipoPerfil("empresa");
              setNovoPerfil({ ...novoPerfil, tipo: "empresa" });
            }}
            className={`cursor-pointer px-5 py-2 rounded-xl transition ${
              tipoPerfil === "empresa"
                ? "bg-[#570000] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Empresa
          </button>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            cadastrarPerfil();
          }}
        >
          {/* NOME */}
          <input
            type="text"
            placeholder={tipoPerfil === "empresa" ? "Nome do responsável" : "Nome completo"}
            value={novoPerfil.nome}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, nome: e.target.value })
            }
            className="border border-[#0A1022] p-3 rounded-xl shadow-sm focus:outline-none 
                       focus:ring-2 focus:ring-[#570000] transition"
          />

          {tipoPerfil === "pessoal" && (
            <>
              <input
                type="date"
                value={novoPerfil.dataNascimento}
                onChange={(e) =>
                  setNovoPerfil({
                    ...novoPerfil,
                    dataNascimento: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm focus:outline-none 
                           focus:ring-2 focus:ring-[#570000] transition"
              />

              <select
                value={novoPerfil.nivelSenioridade}
                onChange={(e) =>
                  setNovoPerfil({
                    ...novoPerfil,
                    nivelSenioridade: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm bg-white 
                           focus:outline-none focus:ring-2 focus:ring-[#570000] transition"
              >
                <option value="">Selecione o nível de senioridade</option>
                <option value="estagiario">Estagiário / Intern</option>
                <option value="junior">Júnior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Sênior</option>
                <option value="techLead">Tech Lead / Especialista</option>
                <option value="arquiteto">Arquiteto</option>
                <option value="cto">CTO</option>
              </select>

              <select
                value={novoPerfil.areaDesenvolvimento}
                onChange={(e) =>
                  setNovoPerfil({
                    ...novoPerfil,
                    areaDesenvolvimento: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm bg-white 
                           focus:outline-none focus:ring-2 focus:ring-[#570000] transition"
              >
                <option value="">Selecione a área de atuação</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Full-Stack</option>
                <option value="mobile">Mobile</option>
                <option value="devops">DevOps / Cloud</option>
                <option value="data">Data</option>
                <option value="qa">QA</option>
                <option value="uiux">UI/UX</option>
                <option value="security">Cybersecurity</option>
              </select>
            </>
          )}

          {/* CAMPOS PARA EMPRESA */}
          {tipoPerfil === "empresa" && (
            <>
              <input
                type="text"
                placeholder="Nome da empresa"
                value={novoPerfil.nomeEmpresa}
                onChange={(e) =>
                  setNovoPerfil({
                    ...novoPerfil,
                    nomeEmpresa: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm focus:outline-none 
                           focus:ring-2 focus:ring-[#570000] transition"
              />

              <select
                value={novoPerfil.areaEmpresa}
                onChange={(e) =>
                  setNovoPerfil({
                    ...novoPerfil,
                    areaEmpresa: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm bg-white 
                           focus:outline-none focus:ring-2 focus:ring-[#570000] transition"
              >
                <option value="">Área da empresa</option>
                <option value="marketing">Marketing</option>
                <option value="tecnologia">Tecnologia / Programação</option>
                <option value="rh">Recursos Humanos</option>
                <option value="design">Design</option>
                <option value="vendas">Vendas</option>
                <option value="logistica">Logística</option>
                <option value="financeiro">Financeiro</option>
              </select>
            </>
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="E-mail"
            value={novoPerfil.email}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, email: e.target.value })
            }
            className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
          />

          {/* SENHA */}
          <input
            type="password"
            placeholder="Senha"
            value={novoPerfil.senha}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, senha: e.target.value })
            }
            className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
          />

          {/* BOTÃO */}
          <button
            type="submit"
            className="font-special cursor-pointer bg-[#570000] text-white py-3 
                       rounded-xl shadow-md hover:bg-[#0A1022] transition text-lg"
          >
            Cadastrar
          </button>

          {/* LINK LOGIN */}
          <p
            onClick={() => navigate("/login")}
            className="font-special text-center text-sm text-[#0A1022] mt-2 cursor-pointer 
                       hover:underline hover:text-[#570000] transition"
          >
            Já tem conta? Faça login
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
