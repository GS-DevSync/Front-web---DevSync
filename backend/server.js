// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// CHAVE JWT
const SECRET_KEY = "12345678910";

// CAMINHO DO JSON
const perfisCaminho = path.join(__dirname, "perfis.json");

// LER JSON
const lerPerfis = () => {
  try {
    if (!fs.existsSync(perfisCaminho)) {
      fs.writeFileSync(perfisCaminho, "[]", "utf-8");
    }
    return JSON.parse(fs.readFileSync(perfisCaminho, "utf-8"));
  } catch (erro) {
    console.error("Erro ao ler perfis:", erro);
    return [];
  }
};

// SALVAR JSON
const salvarPerfis = (data) => {
  try {
    fs.writeFileSync(perfisCaminho, JSON.stringify(data, null, 2), "utf-8");
  } catch (erro) {
    console.error("Erro ao salvar perfis:", erro);
  }
};

/* ========== MULTER + UPLOADS ========== */
const pastaUploads = path.join(__dirname, "uploads");
if (!fs.existsSync(pastaUploads)) {
  fs.mkdirSync(pastaUploads);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, pastaUploads),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nome = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, nome);
  },
});
const upload = multer({ storage });

// serve arquivos estáticos
app.use("/uploads", express.static(pastaUploads));

/* ========== ROTAS ========== */

// ROTA BASE
app.get("/", (req, res) => res.json({ message: "Backend funcionando!" }));

// CRIAR PERFIL
app.post("/perfil", async (req, res) => {
  const dados = req.body;
  if (!dados.tipo) {
    return res.status(400).json({ message: "Campo 'tipo' é obrigatório (pessoal ou empresa)." });
  }

  let camposObrigatorios = [];
  if (dados.tipo === "pessoal") {
    camposObrigatorios = ["nome", "dataNascimento", "email", "senha", "nivelSenioridade", "areaDesenvolvimento"];
  } else if (dados.tipo === "empresa") {
    camposObrigatorios = ["nomeEmpresa", "email", "senha", "areaAtuacao"];
  }

  for (const campo of camposObrigatorios) {
    if (!dados[campo] || dados[campo] === "") {
      return res.status(400).json({ message: `O campo '${campo}' é obrigatório.` });
    }
  }

  const perfis = lerPerfis();
  if (perfis.find((p) => p.email.toLowerCase() === dados.email.toLowerCase())) {
    return res.status(400).json({ message: "E-mail já cadastrado." });
  }

  const senhaCriptografada = await bcrypt.hash(dados.senha, 10);
  const novoPerfil = { id: uuid(), ...dados, senha: senhaCriptografada };
  perfis.push(novoPerfil);
  salvarPerfis(perfis);

  const { senha, ...semSenha } = novoPerfil;
  res.status(201).json(semSenha);
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ message: "Email e senha são obrigatórios." });

  const perfis = lerPerfis();
  const user = perfis.find((p) => p.email.toLowerCase() === email.toLowerCase());
  if (!user) return res.status(400).json({ message: "Email ou senha inválidos." });

  const senhaValida = await bcrypt.compare(senha, user.senha);
  if (!senhaValida) return res.status(400).json({ message: "Email ou senha inválidos." });

  const token = jwt.sign({ id: user.id, email: user.email, tipo: user.tipo }, SECRET_KEY, { expiresIn: "10m" });
  res.json({ message: "Login realizado com sucesso", token, tipo: user.tipo, id: user.id });
});

// MIDDLEWARE
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

// PEGAR PERFIL POR ID
app.get("/perfil/:id", (req, res) => {
  const { id } = req.params;
  const perfis = lerPerfis();
  const perfil = perfis.find((p) => p.id === id);
  if (!perfil) return res.status(404).json({ message: "Perfil não encontrado." });
  const { senha, ...semSenha } = perfil;
  res.json(semSenha);
});

/* ========== UPLOAD ========== */
// aceita campos 'foto' e/ou 'logo'
app.post("/perfil/upload", upload.fields([{ name: "foto", maxCount: 1 }, { name: "logo", maxCount: 1 }]), (req, res) => {
  try {
    const files = req.files || {};
    const fotoFile = files.foto && files.foto[0];
    const logoFile = files.logo && files.logo[0];
    const file = fotoFile || logoFile;
    if (!file) return res.status(400).json({ message: "Nenhum arquivo enviado." });

    const imageUrl = `http://localhost:${port}/uploads/${file.filename}`;
    // devolve ambos para facilitar no front
    res.json({ foto: imageUrl, logo: imageUrl });
  } catch (err) {
    console.error("Erro upload:", err);
    res.status(500).json({ message: "Erro ao processar upload." });
  }
});

/* ========== PUT /perfil/:id (atualiza perfil) ========== */
app.put("/perfil/:id", autenticaToken, (req, res) => {
  const { id } = req.params;
  const perfis = lerPerfis();
  const index = perfis.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Perfil não encontrado" });

  const perfilAtual = perfis[index];
  const atualizado = { ...perfilAtual, ...req.body };

  // se enviou senha em texto, criptografa
  if (req.body.senha) {
    atualizado.senha = bcrypt.hashSync(req.body.senha, 10);
  }

  perfis[index] = atualizado;
  salvarPerfis(perfis);
  const { senha, ...semSenha } = atualizado;
  res.json(semSenha);
});

// DELETE (opcional)
app.delete("/perfil/:id", autenticaToken, (req, res) => {
  const { id } = req.params;
  const perfis = lerPerfis();
  const index = perfis.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Perfil não encontrado" });
  perfis.splice(index, 1);
  salvarPerfis(perfis);
  res.json({ message: "Perfil removido" });
});

/* ========== START ========== */
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
