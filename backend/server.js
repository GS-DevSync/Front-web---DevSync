const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota inicial (teste)
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando!" });
});

// Servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
