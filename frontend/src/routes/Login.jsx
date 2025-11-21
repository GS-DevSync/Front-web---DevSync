import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("idUsuario", data.id);


        // REDIRECIONAMENTO POR TIPO DE PERFIL
        if (data.tipo === "pessoal") {
          navigate("/perfilpessoal");
        } else if (data.tipo === "empresa") {
          navigate("/perfilcorporativo");
        } else {
          navigate("/projetos"); // fallback
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1022] px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 border-l-4 border-[#570000]">
        <h1 className="text-4xl text-center text-[#570000] mb-10 font-special">
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-[#0A1022] p-3 rounded-xl shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-[#570000] 
                       transition bg-white"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="border border-[#0A1022] p-3 rounded-xl shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-[#570000] 
                       transition bg-white"
          />

          <button
            type="submit"
            className="font-special cursor-pointer bg-[#570000] text-white py-3 
                       rounded-xl shadow-md hover:bg-[#0A1022] transition text-lg"
          >
            Entrar
          </button>

          <p
            className="font-special text-center text-sm text-[#0A1022] mt-2 cursor-pointer 
                       hover:underline hover:text-[#570000] transition"
            onClick={() => navigate("/cadastro")}
          >
            Ainda não tem conta? Cadastre-se
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
