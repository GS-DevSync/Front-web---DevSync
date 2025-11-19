import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './routes/Home.jsx';
import Login from './routes/Login.jsx';
import Cadastro from './routes/Cadastro.jsx';
import Contato from './routes/Contato.jsx';
import Projetos from './routes/Projetos.jsx';
import Error from './routes/Error.jsx';
import Nav from './components/Nav';
import Footer from './components/Footer';
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <main>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
