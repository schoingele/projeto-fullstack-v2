import { AppDataSource } from '../../ormconfig';
import { Aluno } from "../entities/Aluno";
import { Curso } from "../entities/Curso";

export class AlunoService {
  private repo = AppDataSource.getRepository(Aluno);
  private cursoRepo = AppDataSource.getRepository(Curso);

  async create(data: any) {
    const aluno = this.repo.create({
      nome: data.nome,
      email: data.email,
      senha: data.senha,
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
