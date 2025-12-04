import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Alunos from './pages/Alunos';
import CadastrarAluno from './pages/CadastrarAluno';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/alunos" element={<Alunos />} />
      <Route path="/alunos/cadastrar" element={<CadastrarAluno />} />
    </Routes>
  );
}

export default App;
