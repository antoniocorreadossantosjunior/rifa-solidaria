import React from "react";
import "./App.css";
import Results from "./Results";
import Register from "./Register";

function App() {
  const [view, setView] = React.useState("home");

  return (
    <div className="App">
      <header className="app-header">
        <h1>Rifa Solidária</h1>
        <nav className="nav">
          <button onClick={() => setView("home")}>Início</button>
          <button onClick={() => setView("register")}>Cadastro</button>
          <button onClick={() => setView("results")}>Resultados</button>
        </nav>
      </header>

      <main className="app-main">
        {view === "home" && (
          <div className="home">
            <p>Bem-vindo! Cadastre participantes e depois veja os resultados.</p>
          </div>
        )}
        {view === "register" && <Register />}
        {view === "results" && <Results />}
      </main>
    </div>
  );
}

export default App;
