// src/Results.js
import React, { useEffect, useState } from "react";

export default function Results() {
  const [participantes, setParticipantes] = useState([]);
  const [ganhador, setGanhador] = useState(null);

  // carregar participantes do localStorage
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("participantes");
    if (dadosSalvos) {
      setParticipantes(JSON.parse(dadosSalvos));
    }
  }, []);

  function sortear() {
    if (participantes.length === 0) {
      alert("Nenhum participante cadastrado!");
      return;
    }

    const indiceAleatorio = Math.floor(Math.random() * participantes.length);
    setGanhador(participantes[indiceAleatorio]);
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
            </tr>
          </thead>
          <tbody>
            {participantes.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.numero}</td>
                <td>{p.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
