import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const API_URL = "http://localhost:3001/perfil";
  const navigate = useNavigate();

  // Tipo de perfil
  const [tipo, setTipo] = useState("pessoal");

  // PERFIL PESSOAL
  const [novoPerfil, setNovoPerfil] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
    senha: "",
    nivelSenioridade: "",
    areaDesenvolvimento: "",
  });

  // PERFIL EMPRESA
  const [novaEmpresa, setNovaEmpresa] = useState({
    nomeEmpresa: "",
    email: "",
    senha: "",
    areaAtuacao: "",
    logo: "",
    site: "",
    descricao: "",
  });

  // ENVIAR DADOS
  const cadastrar = async () => {
    let payload = { tipo };

    if (tipo === "pessoal") {
      if (
        !novoPerfil.nome ||
        !novoPerfil.dataNascimento ||
        !novoPerfil.email ||
        !novoPerfil.senha ||
        !novoPerfil.nivelSenioridade ||
        !novoPerfil.areaDesenvolvimento
      ) {
        alert("Preencha todos os campos pessoais.");
        return;
      }

      payload = {
        tipo: "pessoal",
        ...novoPerfil,
      };
    }

    if (tipo === "empresa") {
      if (
        !novaEmpresa.nomeEmpresa ||
        !novaEmpresa.email ||
        !novaEmpresa.senha ||
        !novaEmpresa.areaAtuacao
      ) {
        alert("Preencha todos os campos obrigatórios da empresa.");
        return;
      }

      payload = {
        tipo: "empresa",
        ...novaEmpresa,
      };
    }

    try {
      await axios.post(API_URL, payload);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Erro ao cadastrar.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1022] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 border-l-4 border-[#570000]">
        <h1 className="text-4xl text-center text-[#570000] mb-6 font-special">
          Cadastro
        </h1>

        {/* Botões de troca */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setTipo("pessoal")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              tipo === "pessoal"
                ? "bg-[#570000] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Pessoal
          </button>

          <button
            onClick={() => setTipo("empresa")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              tipo === "empresa"
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
            cadastrar();
          }}
        >
          {/* CAMPOS PESSOAIS */}
          {tipo === "pessoal" && (
            <>
              <input
                type="text"
                placeholder="Nome completo"
                value={novoPerfil.nome}
                onChange={(e) =>
                  setNovoPerfil({ ...novoPerfil, nome: e.target.value })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              />

              <input
                type="date"
                value={novoPerfil.dataNascimento}
                onChange={(e) =>
                  setNovoPerfil({
                    ...novoPerfil,
                    dataNascimento: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              />

              <input
                type="email"
                placeholder="E-mail"
                value={novoPerfil.email}
                onChange={(e) =>
                  setNovoPerfil({ ...novoPerfil, email: e.target.value })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              />

              <input
                type="password"
                placeholder="Senha"
                value={novoPerfil.senha}
                onChange={(e) =>
                  setNovoPerfil({ ...novoPerfil, senha: e.target.value })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              />

              <select
                value={novoPerfil.nivelSenioridade}
                onChange={(e) =>
                  setNovoPerfil({
                    ...novoPerfil,
                    nivelSenioridade: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              >
                <option value="">Selecione o nível</option>
                <option value="estagiario">Estagiário</option>
                <option value="junior">Júnior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Sênior</option>
                <option value="techLead">Tech Lead</option>
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
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              >
                <option value="">Selecione a área</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Full-Stack</option>
                <option value="mobile">Mobile</option>
                <option value="devops">DevOps</option>
                <option value="ux">UX</option>
                <option value="ui">UI</option>
                <option value="data">Data</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="embeddedIoT">Embedded / IoT</option>
              </select>
            </>
          )}

          {/* CAMPOS EMPRESA */}
          {tipo === "empresa" && (
            <>
              <input
                type="text"
                placeholder="Nome da empresa"
                value={novaEmpresa.nomeEmpresa}
                onChange={(e) =>
                  setNovaEmpresa({
                    ...novaEmpresa,
                    nomeEmpresa: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              />

              <input
                type="email"
                placeholder="E-mail"
                value={novaEmpresa.email}
                onChange={(e) =>
                  setNovaEmpresa({
                    ...novaEmpresa,
                    email: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              />

              <input
                type="password"
                placeholder="Senha"
                value={novaEmpresa.senha}
                onChange={(e) =>
                  setNovaEmpresa({
                    ...novaEmpresa,
                    senha: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              />

              {/* SELECT DE ÁREA DE ATUAÇÃO (NOVO) */}
              <select
                value={novaEmpresa.areaAtuacao}
                onChange={(e) =>
                  setNovaEmpresa({
                    ...novaEmpresa,
                    areaAtuacao: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              >
                <option value="">Selecione a área</option>
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

              <input
                type="text"
                placeholder="Logo (URL opcional)"
                value={novaEmpresa.logo}
                onChange={(e) =>
                  setNovaEmpresa({
                    ...novaEmpresa,
                    logo: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              />

              <input
                type="text"
                placeholder="Site opcional"
                value={novaEmpresa.site}
                onChange={(e) =>
                  setNovaEmpresa({
                    ...novaEmpresa,
                    site: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm"
              />

              <textarea
                placeholder="Descrição da empresa"
                value={novaEmpresa.descricao}
                onChange={(e) =>
                  setNovaEmpresa({
                    ...novaEmpresa,
                    descricao: e.target.value,
                  })
                }
                className="border border-[#0A1022] p-3 rounded-xl shadow-sm h-24 resize-none"
              ></textarea>
            </>
          )}

          <button
            type="submit"
            className="font-special cursor-pointer bg-[#570000] text-white py-3 rounded-xl shadow-md hover:bg-[#0A1022] transition text-lg"
          >
            Cadastrar
          </button>

          <p
            onClick={() => navigate("/login")}
            className="font-special text-center text-sm text-[#0A1022] mt-2 cursor-pointer hover:underline hover:text-[#570000] transition"
          >
            Já tem conta? Faça login
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
