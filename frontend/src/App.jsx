import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AlunosPage from "./pages/AlunosPage";
import NovoAlunoPage from "./pages/NovoAlunoPage";
import CursosPage from "./pages/CursosPage";

export default function App() {
  return (
    <Router>
      <header className="menu">
        <h1>Sistema Acadêmico</h1>
        <nav>
          <Link to="/">Alunos</Link>
          <Link to="/novo-aluno">Cadastrar Aluno</Link>
          <Link to="/cursos">Cursos</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<AlunosPage />} />
          <Route path="/novo-aluno" element={<NovoAlunoPage />} />
          <Route path="/cursos" element={<CursosPage />} />
        </Routes>
      </main>
    </Router>
  );
}
