import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const destinatario = location.state?.destinatario || "Usuário";

  const [mensagens, setMensagens] = useState([]);
  const [input, setInput] = useState("");

  const enviarMensagem = () => {
    if (input.trim() === "") return;
    setMensagens([...mensagens, { de: "Você", texto: input }]);
    setInput("");
  };

  const handleVoltar = () => {
    navigate(-1); 
  };

  return (
    <div className="font-special min-h-screen bg-[#0A1122] text-white p-6 md:p-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chat com {destinatario}</h1>
        <button
          onClick={handleVoltar}
          className="cursor-pointer bg-[#570000] px-4 py-2 rounded-lg hover:bg-[#3d0000]"
        >
          Voltar
        </button>
      </div>

      <div className="bg-[#0A1022] p-4 rounded-xl h-[60vh] overflow-y-auto mb-4 border border-[#1a2238]">
        {mensagens.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">Nenhuma mensagem ainda.</p>
        ) : (
          mensagens.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span className="font-semibold">{msg.de}: </span>
              <span>{msg.texto}</span>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 p-3 rounded-lg bg-[#0A1022] border border-[#1a2238] outline-none"
          onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
        />
        <button
          onClick={enviarMensagem}
          className="bg-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 cursor-pointer"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
