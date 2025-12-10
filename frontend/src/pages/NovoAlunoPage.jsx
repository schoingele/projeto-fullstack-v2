import React from "react";
import { useState } from "react";
import api from "../services/api";

export default function NovoAlunoPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    data_nascimento: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    api.post("/alunos", form)
      .then(() => alert("Aluno cadastrado com sucesso!"))
      .catch((err) => alert("Erro ao cadastrar: " + err));
  }

  return (
    <div>
      <h2>Cadastrar Novo Aluno</h2>

      <form className="formulario max-w-md mx-auto space-y-3" onSubmit={handleSubmit}>
        <input
          className="border rounded px-3 py-2 w-full"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <input
          className="border rounded px-3 py-2 w-full"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="border rounded px-3 py-2 w-full"
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />

        <input
          className="border rounded px-3 py-2 w-full"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
        />

        <input
          className="border rounded px-3 py-2 w-full"
          type="date"
          name="data_nascimento"
          value={form.data_nascimento}
          onChange={handleChange}
        />

        <div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
