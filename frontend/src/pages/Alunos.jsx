import React from 'react'
import { useEffect, useState } from "react";
import api from "../services/api";

export default function AlunosPage() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    api.get("/aluno")
      .then((res) => setAlunos(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Lista de Alunos</h2>

      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
