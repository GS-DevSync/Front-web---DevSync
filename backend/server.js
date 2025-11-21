const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rota inicial (teste)
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando!" });
});

// Servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// ===== Caminhos dos arquivos JSON =====
const perfisCaminho = path.join(__dirname, "perfis.json");
const postsCaminho = path.join(__dirname, "posts.json");
const relatoriosCaminho = path.join(__dirname, "relatorios.json");
const eventosPath = path.join(__dirname, "data", "eventos.json");


// ===== Funções utilitárias =====

// Perfis
const lerPerfis = () => {
  try {
    if (!fs.existsSync(perfisCaminho)) fs.writeFileSync(perfisCaminho, "[]", "utf-8");
    return JSON.parse(fs.readFileSync(perfisCaminho, "utf-8"));
  } catch (error) {
    console.error("Erro ao ler perfis:", error);
    return [];
  }
};

const salvarPerfis = (data) => {
  try {
    fs.writeFileSync(perfisCaminho, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Erro ao salvar perfis:", error);
  }
};

// Inicializar arrays
let perfis = lerPerfis();

// Criar perfil
app.post("/perfil", (req, res) => {
  const { nome, dataNascimento, email, senha, nivelSenioridade, areaDesenvolvimento } = req.body;
  if (!nome || !dataNascimento || !email || !senha || !areaDesenvolvimento || !nivelSenioridade)
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });

  const novoPerfil = {
    id: uuid(),
    nome,
    dataNascimento,
    email,
    senha,
    areaDesenvolvimento,
    nivelSenioridade,
  };

  perfis.push(novoPerfil);
  salvarPerfis(perfis);

  res.status(201).json(novoPerfil);
});

// Listar todos perfis
app.get("/perfis", (req, res) => {
  res.json(perfis);
});