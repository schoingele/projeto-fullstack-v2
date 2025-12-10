import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Alunos from './pages/Alunos';
import CadastrarAluno from './pages/NovoAlunoPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Sistema Acadêmico</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <Link to="/alunos" className="text-blue-600 hover:underline">Alunos</Link>
            <Link to="/alunos/cadastrar" className="text-blue-600 hover:underline">Cadastrar Aluno</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/alunos/cadastrar" element={<CadastrarAluno />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
