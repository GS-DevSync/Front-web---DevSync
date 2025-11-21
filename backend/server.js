const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Chave secreta do JWT
const SECRET_KEY = "12345678910";

// Caminho do arquivo JSON
const perfisCaminho = path.join(__dirname, "perfis.json");

// Funções utilitárias
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

// Rota inicial
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando!" });
});

// Criar perfil
app.post("/perfil", async (req, res) => {
  const { nome, dataNascimento, email, senha, nivelSenioridade, areaDesenvolvimento } = req.body;
  if (!nome || !dataNascimento || !email || !senha || !areaDesenvolvimento || !nivelSenioridade)
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });

  const perfis = lerPerfis();

  if (perfis.find(p => p.email.toLowerCase() === email.toLowerCase().trim())) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const novoPerfil = {
    id: uuid(),
    nome,
    dataNascimento,
    email: email.toLowerCase().trim(),
    senha: senhaCriptografada,
    areaDesenvolvimento,
    nivelSenioridade,
  };

  perfis.push(novoPerfil);
  salvarPerfis(perfis);

  const { senha: _, ...perfilSemSenha } = novoPerfil;
  res.status(201).json(perfilSemSenha);
});

// Listar perfis (sem senha)
app.get("/perfis", (req, res) => {
  const perfis = lerPerfis();
  const perfisSemSenha = perfis.map(({ senha, ...rest }) => rest);
  res.json(perfisSemSenha);
});

// Login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ message: "Email e senha são obrigatórios" });

  const perfis = lerPerfis();
  const user = perfis.find(u => u.email.toLowerCase() === email.toLowerCase().trim());

  if (!user) return res.status(400).json({ message: "Email ou senha inválidos" });

  const senhaValida = await bcrypt.compare(senha, user.senha);
  if (!senhaValida) return res.status(400).json({ message: "Email ou senha inválidos" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "10m" });
  res.json({ message: "Login realizado com sucesso", token });
});

// Middleware de autenticação
const autenticaToken = (req, res, next) => {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (erro, user) => {
    if (erro) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Rota protegida
app.get("/projeto", autenticaToken, (req, res) => {
  res.json({ message: "Acesso autorizado, bem-vindo!", user: req.user });
});

// Servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
