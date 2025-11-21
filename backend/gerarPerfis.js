const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const TOTAL_DESEJADO = 60;
const areas = ["ux", "ui", "backend", "frontend", "embeddedIoT", "cybersecurity"];
const senioridades = ["estagiario", "junior", "pleno", "senior", "techLead", "cto"];
const nomes = ["Ana", "Bia", "Carla", "Daniel", "Eduardo", "Fernanda", "Gustavo", "Helena", "Igor", "Julia", "Karen", "Lucas", "Marina", "Natalia", "Otavio", "Paula", "Quintino", "Rafaela", "Sofia", "Tiago"];
const fotos = [
  "http://localhost:3001/uploads/1763753565756-688306372.png",
  "http://localhost:3001/uploads/1763753565756-111111111.png",
  "http://localhost:3001/uploads/1763753565756-222222222.png"
];
const logos = [
  "http://localhost:3001/uploads/1763754783687-936159025.png",
  "http://localhost:3001/uploads/1763754783687-111111111.png",
  "http://localhost:3001/uploads/1763754783687-222222222.png"
];

async function gerarPerfis() {
  let perfis = [];

  // Lê o JSON atual, se existir
  if (fs.existsSync('perfis.json')) {
    const dados = fs.readFileSync('perfis.json', 'utf-8');
    perfis = JSON.parse(dados);
  }

  const quantidadeAtual = perfis.length;
  const faltando = TOTAL_DESEJADO - quantidadeAtual;

  if (faltando <= 0) {
    console.log(`Já existem ${quantidadeAtual} perfis. Nada a adicionar.`);
    return;
  }
        /*SENHA DOS PERFIS GERADOS!!!*/
  const senhaHash = await bcrypt.hash("123456", 10); 

  for (let i = 0; i < faltando; i++) {
    const nome = nomes[Math.floor(Math.random() * nomes.length)] + Math.floor(Math.random() * 100);
    const email = `${nome.toLowerCase()}@email.com`;
    const tipo = Math.random() < 0.15 ? "empresa" : "pessoal";

    const perfil = {
      id: uuidv4(),
      tipo,
      nome: tipo === "pessoal" ? nome : undefined,
      nomeEmpresa: tipo === "empresa" ? `Empresa ${nome}` : undefined,
      email,
      senha: senhaHash,
      areaDesenvolvimento: tipo === "pessoal" ? areas[Math.floor(Math.random() * areas.length)] : undefined,
      nivelSenioridade: tipo === "pessoal" ? senioridades[Math.floor(Math.random() * senioridades.length)] : undefined,
      dataNascimento: tipo === "pessoal" ? `${Math.floor(Math.random() * 23 + 1980)}-${Math.floor(Math.random()*12 + 1).toString().padStart(2,'0')}-${Math.floor(Math.random()*28 + 1).toString().padStart(2,'0')}` : undefined,
      sobre: tipo === "pessoal" ? "Perfil fictício" : undefined,
      foto: tipo === "pessoal" ? fotos[Math.floor(Math.random() * fotos.length)] : undefined,
      areaAtuacao: tipo === "empresa" ? "programacao" : undefined,
      logo: tipo === "empresa" ? logos[Math.floor(Math.random() * logos.length)] : undefined,
      site: tipo === "empresa" ? `www.${nome.toLowerCase()}.com` : undefined,
      descricao: tipo === "empresa" ? `Empresa ${nome} fictícia.` : undefined
    };

    perfis.push(perfil);
  }

  fs.writeFileSync('perfis.json', JSON.stringify(perfis, null, 2));
  console.log(`Perfis adicionados! Agora existem ${perfis.length} perfis.`);
}

gerarPerfis();
