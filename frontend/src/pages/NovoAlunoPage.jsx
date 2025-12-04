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

    api.post("/aluno", form)
      .then(() => alert("Aluno cadastrado com sucesso!"))
      .catch((err) => alert("Erro ao cadastrar: " + err));
  }

  return (
    <div>
      <h2>Cadastrar Novo Aluno</h2>

      <form className="formulario" onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />

        <input
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
        />

        <input
          type="date"
          name="data_nascimento"
          value={form.data_nascimento}
          onChange={handleChange}
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
