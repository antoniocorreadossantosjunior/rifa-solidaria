// src/Register.js
import React, { useState, useEffect } from "react";

export default function Register() {
  const [numero, setNumero] = useState("");
  const [nome, setNome] = useState("");
  const [participantes, setParticipantes] = useState([]);

  // carregar dados do localStorage
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("participantes");
    if (dadosSalvos) {
      setParticipantes(JSON.parse(dadosSalvos));
    }
  }, []);

  // salvar no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem("participantes", JSON.stringify(participantes));
  }, [participantes]);

  function adicionarParticipante(e) {
    e.preventDefault();
    if (!numero || !nome) {
      alert("Preencha todos os campos!");
      return;
    }

    const novo = { id: Date.now(), numero, nome };
    setParticipantes([...participantes, novo]);
    setNumero("");
    setNome("");
  }

  return (
    <div className="register-container">
      <h2>Cadastrar Participante</h2>

      <form onSubmit={adicionarParticipante} className="register-form">
        <input
          type="text"
          placeholder="Número da rifa"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome do participante"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <h3>Participantes cadastrados</h3>
      <ul>
        {participantes.map((p) => (
          <li key={p.id}>
            Nº {p.numero} — {p.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}
