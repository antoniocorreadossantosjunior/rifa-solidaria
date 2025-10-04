// src/Register.js
import React, { useState, useEffect } from "react";

export default function Register() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [participantes, setParticipantes] = useState([]);
  const [editando, setEditando] = useState(null);

  // Carregar participantes salvos
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("participantes");
    if (dadosSalvos) {
      setParticipantes(JSON.parse(dadosSalvos));
    }
  }, []);

  // Salvar participantes no localStorage
  useEffect(() => {
    localStorage.setItem("participantes", JSON.stringify(participantes));
  }, [participantes]);

  // Adicionar novo participante
  function adicionarParticipante(e) {
    e.preventDefault();

    if (!nome || !numero) {
      alert("Por favor, preencha nome e número.");
      return;
    }

    if (editando) {
      const atualizados = participantes.map((p) =>
        p.id === editando ? { ...p, nome, numero } : p
      );
      setParticipantes(atualizados);
      setEditando(null);
    } else {
      const novoParticipante = {
        id: Date.now(),
        nome,
        numero,
      };
      setParticipantes([...participantes, novoParticipante]);
    }

    setNome("");
    setNumero("");
  }

  // Editar participante
  function editarParticipante(p) {
    setNome(p.nome);
    setNumero(p.numero);
    setEditando(p.id);
  }

  // Excluir participante
  function excluirParticipante(id) {
    const confirmacao = window.confirm("Tem certeza que deseja excluir?");
    if (!confirmacao) return;

    const filtrados = participantes.filter((p) => p.id !== id);
    setParticipantes(filtrados);
  }

  return (
    <div className="register-container">
      <h2>Cadastro de Participantes</h2>

      <form onSubmit={adicionarParticipante}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Número da sorte"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <button type="submit">
          {editando ? "💾 Salvar Alterações" : "➕ Adicionar"}
        </button>
      </form>

      {participantes.length === 0 ? (
        <p>Nenhum participante cadastrado ainda.</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Número</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {participantes.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.numero}</td>
                <td>{p.nome}</td>
                <td>
                  <button onClick={() => editarParticipante(p)}>✏️ Editar</button>
                  <button onClick={() => excluirParticipante(p.id)}>🗑️ Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
