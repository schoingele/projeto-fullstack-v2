import { AppDataSource } from '../../ormconfig';
import { Aluno } from "../entities/Aluno";
import { Curso } from "../entities/Curso";
import bcrypt from 'bcrypt';

export class AlunoService {
  private repo = AppDataSource.getRepository(Aluno);
  private cursoRepo = AppDataSource.getRepository(Curso);

  async create(data: any) {
    // Verifica se o email já existe para evitar violação de constraint
    if (data.email) {
      const existing = await this.repo.findOne({ where: { email: data.email } });
      if (existing) {
        const err: any = new Error('Email já cadastrado');
        err.code = 'EMAIL_DUPLICADO';
        throw err;
      }
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);

    const aluno = this.repo.create({
      nome: data.nome,
      email: data.email,
      senha: hashedPassword,
      telefone: data.telefone,
      data_nascimento: data.data_nascimento
    });

    if (data.cursoId) {
      const curso = await this.cursoRepo.findOne({ where: { id: data.cursoId } });
      if (!curso) throw new Error("Curso não encontrado");
      aluno.curso = curso;
      aluno.cursoId = curso.id;
    }

    return this.repo.save(aluno);
  }

  async findAll() {
    return this.repo.find();
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}

export default new AlunoService();
