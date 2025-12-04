import { Request, Response } from "express";
import alunoService from "../services/aluno.service";

export async function criarAluno(req: Request, res: Response) {
  try {
    const criado = await alunoService.create(req.body);
    return res.status(201).json(criado);
  } catch (err: any) {
    return res.status(400).json({ message: err.message || "Erro ao criar aluno" });
  }
}

export async function listarAlunos(req: Request, res: Response) {
  try {
    const lista = await alunoService.findAll();
    return res.json(lista);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

export async function buscarAluno(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const a = await alunoService.findById(id);
    if (!a) return res.status(404).json({ message: "Aluno não encontrado" });
    return res.json(a);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
