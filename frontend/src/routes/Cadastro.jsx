import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const API_URL = "http://localhost:3001/perfil";
  const navigate = useNavigate();

  const [novoPerfil, setNovoPerfil] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
    senha: "",
    nivelSenioridade: "",
    areaDesenvolvimento: "",
  });

  const cadastrarPerfil = async () => {
    if (
      !novoPerfil.nome ||
      !novoPerfil.dataNascimento ||
      !novoPerfil.email ||
      !novoPerfil.senha ||
      !novoPerfil.nivelSenioridade ||
      !novoPerfil.areaDesenvolvimento
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    try {
      const response = await axios.post(API_URL, novoPerfil);

      alert(`Usuária ${response.data.nome} cadastrada com sucesso!`);

      setNovoPerfil({
        nome: "",
        dataNascimento: "",
        email: "",
        senha: "",
        nivelSenioridade: "",
        areaDesenvolvimento: "",
      });

      navigate("/login");
    } catch (error) {
      console.log("Erro ao cadastrar perfil", error);
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1022] flex items-center justify-center px-4">
      
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 border-l-4 border-[#570000]">

        <h1 className="text-4xl text-center text-[#570000] mb-10 font-special">
          Cadastro
        </h1>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            cadastrarPerfil();
          }}
        >
          {/* INPUTS */}
          <input
            type="text"
            placeholder="Nome completo"
            value={novoPerfil.nome}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, nome: e.target.value })
            }
            className="border border-[#0A1022] p-3 rounded-xl shadow-sm focus:outline-none 
                       focus:ring-2 focus:ring-[#570000] transition"
          />

          <input
            type="date"
            value={novoPerfil.dataNascimento}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, dataNascimento: e.target.value })
            }
            className="border border-[#0A1022] p-3 rounded-xl shadow-sm focus:outline-none 
                       focus:ring-2 focus:ring-[#570000] transition"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={novoPerfil.email}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, email: e.target.value })
            }
            className="border border-[#0A1022] p-3 rounded-xl shadow-sm focus:outline-none 
                       focus:ring-2 focus:ring-[#570000] transition"
          />

          <input
            type="password"
            placeholder="Senha"
            value={novoPerfil.senha}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, senha: e.target.value })
            }
            className="border border-[#0A1022] p-3 rounded-xl shadow-sm focus:outline-none 
                       focus:ring-2 focus:ring-[#570000] transition"
          />

          {/* SELECTS */}
          <select
            value={novoPerfil.nivelSenioridade}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, nivelSenioridade: e.target.value })
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
            <option value="cto">CTO / Head de Tecnologia</option>
          </select>

          <select
            value={novoPerfil.areaDesenvolvimento}
            onChange={(e) =>
              setNovoPerfil({ ...novoPerfil, areaDesenvolvimento: e.target.value })
            }
            className="border border-[#0A1022] p-3 rounded-xl shadow-sm bg-white 
                       focus:outline-none focus:ring-2 focus:ring-[#570000] transition"
          >
            <option value="">Selecione a área de atuação</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full-Stack</option>
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop / Software</option>
            <option value="devops">DevOps / Cloud</option>
            <option value="sre">SRE</option>
            <option value="infraestrutura">Infraestrutura / Redes</option>
            <option value="dataEngineer">Data Engineer</option>
            <option value="dataAnalyst">Data Analyst</option>
            <option value="dataScientist">Data Scientist</option>
            <option value="bigData">Big Data</option>
            <option value="qa">QA / Testes</option>
            <option value="ux">UX Designer</option>
            <option value="ui">UI Designer</option>
            <option value="productDesigner">Product Designer</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="gameDev">Game Developer</option>
            <option value="embeddedIoT">Embedded / IoT</option>
            <option value="arVr">AR/VR Developer</option>
            <option value="blockchain">Blockchain / Web3</option>
          </select>

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
