// src/Results.js
import React, { useEffect, useState } from "react";

export default function Results() {
  const [participantes, setParticipantes] = useState([]);
  const [ganhador, setGanhador] = useState(null);
  const [editando, setEditando] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [novoNumero, setNovoNumero] = useState("");

  // Carregar participantes do localStorage
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("participantes");
    if (dadosSalvos) {
      setParticipantes(JSON.parse(dadosSalvos));
    }
  }, []);

  // Sortear ganhador
  function sortear() {
    if (participantes.length === 0) {
      alert("Nenhum participante cadastrado!");
      return;
    }

    const indiceAleatorio = Math.floor(Math.random() * participantes.length);
    setGanhador(participantes[indiceAleatorio]);
  }

  // Iniciar edição
  function iniciarEdicao(participante) {
    setEditando(participante.id);
    setNovoNome(participante.nome);
    setNovoNumero(participante.numero);
  }

  // Salvar edição
  function salvarEdicao(id) {
    const atualizados = participantes.map((p) =>
      p.id === id ? { ...p, nome: novoNome, numero: novoNumero } : p
    );

    setParticipantes(atualizados);
    localStorage.setItem("participantes", JSON.stringify(atualizados));
    setEditando(null);
  }

  // Cancelar edição
  function cancelarEdicao() {
    setEditando(null);
  }

  // Excluir participante
  function excluirParticipante(id) {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este participante?");
    if (!confirmacao) return;

    const filtrados = participantes.filter((p) => p.id !== id);
    setParticipantes(filtrados);
    localStorage.setItem("participantes", JSON.stringify(filtrados));
  }

  return (
    <div className="results-container">
      <h2>Resultados da Rifa Solidária</h2>

      <button onClick={sortear} className="sortear-btn">
        🎲 Sortear
      </button>

      {ganhador && (
        <div className="ganhador">
          <h3>🎉 Ganhador!</h3>
          <p>
            <strong>Número:</strong> {ganhador.numero} <br />
            <strong>Nome:</strong> {ganhador.nome}
          </p>
        </div>
      )}

      {participantes.length === 0 ? (
        <p>Nenhum participante cadastrado ainda.</p>
      ) : (
        <table className="results-table" aria-label="Resultados da rifa">
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

                {editando === p.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={novoNumero}
                        onChange={(e) => setNovoNumero(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={novoNome}
                        onChange={(e) => setNovoNome(e.target.value)}
                      />
                    </td>
                    <td>
                      <button onClick={() => salvarEdicao(p.id)}>💾 Salvar</button>
                      <button onClick={cancelarEdicao}>❌ Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{p.numero}</td>
                    <td>{p.nome}</td>
                    <td>
                      <button onClick={() => iniciarEdicao(p)}>✏️ Editar</button>
                      <button onClick={() => excluirParticipante(p.id)}>🗑️ Excluir</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
