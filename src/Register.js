import React, { useState } from "react";

export default function Register() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [participantes, setParticipantes] = useState([]);
  const [editando, setEditando] = useState(null); // guarda o índice que está sendo editado

  // Função para adicionar ou salvar edição
  const salvarParticipante = (e) => {
    e.preventDefault();

    if (!nome || !numero) {
      alert("Preencha todos os campos!");
      return;
    }

    if (editando !== null) {
      // Atualiza participante existente
      const listaAtualizada = [...participantes];
      listaAtualizada[editando] = { nome, numero };
      setParticipantes(listaAtualizada);
      setEditando(null);
    } else {
      // Adiciona novo participante
      setParticipantes([...participantes, { nome, numero }]);
    }

    // Limpa os campos
    setNome("");
    setNumero("");
  };

  // Função para editar um participante
  const editarParticipante = (index) => {
    const participante = participantes[index];
    setNome(participante.nome);
    setNumero(participante.numero);
    setEditando(index);
  };

  // Função para excluir participante
  const excluirParticipante = (index) => {
    const novaLista = participantes.filter((_, i) => i !== index);
    setParticipantes(novaLista);
  };

  return (
    <div style={estilos.container}>
      <h2>Cadastro de Participantes</h2>

      <form onSubmit={salvarParticipante} style={estilos.form}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={estilos.input}
        />
        <input
          type="text"
          placeholder="Número da rifa"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          style={estilos.input}
        />
        <button type="submit" style={estilos.botao}>
          {editando !== null ? "Salvar Edição" : "Cadastrar"}
        </button>
      </form>

      <h3>Lista de Participantes</h3>
      <table style={estilos.tabela}>
        <thead>
          <tr>
            <th>Número</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {participantes.map((p, index) => (
            <tr key={index}>
              <td>{p.numero}</td>
              <td>{p.nome}</td>
              <td>
                <button
                  onClick={() => editarParticipante(index)}
                  style={estilos.botaoEditar}
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirParticipante(index)}
                  style={estilos.botaoExcluir}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 🎨 Estilos inline simples
const estilos = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  botao: {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#4caf50",
    color: "white",
    cursor: "pointer",
  },
  tabela: {
    width: "100%",
    borderCollapse: "collapse",
  },
  botaoEditar: {
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer",
  },
  botaoExcluir: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
