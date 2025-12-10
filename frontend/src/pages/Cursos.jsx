import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function CursosPage() {
  const [cursos, setCursos] = useState([]);
  const [alunosCurso, setAlunosCurso] = useState([]);

  useEffect(() => {
    api.get("/cursos")
      .then((res) => setCursos(res.data))
      .catch((err) => console.log(err));
  }, []);

  function buscarAlunos(id) {
    api.get(`/cursos/${id}/alunos`)
      .then((res) => setAlunosCurso(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h2>Cursos</h2>

      <ul className="lista">
        {cursos.map((curso) => (
          <li key={curso.id}>
            <strong>{curso.titulo}</strong>
            <button onClick={() => buscarAlunos(curso.id)}>
              Ver alunos
            </button>
          </li>
        ))}
      </ul>

      <h3>Alunos do Curso Selecionado</h3>
      <ul className="lista">
        {alunosCurso.map((aluno) => (
          <li key={aluno.id}>{aluno.nome}</li>
        ))}
      </ul>
    </div>
  );
}
