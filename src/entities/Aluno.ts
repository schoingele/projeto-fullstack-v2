import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { Curso } from "./Curso";
import { Matricula } from "./Matricula";

@Entity({ name: "aluno" })
export class Aluno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120 })
  nome!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column({ length: 150 })
  senha!: string;

  @Column({ length: 30, nullable: true })
  telefone?: string;

  @Column({ type: "date", nullable: true })
  data_nascimento?: string;

  @CreateDateColumn({ name: "criado_em" })
  criadoEm!: Date;

  @OneToMany(() => Matricula, (matricula) => matricula.aluno)
  matriculas!: Matricula[];

  // Relacionamento many-to-one: cada aluno pode ter um curso associado
  @ManyToOne(() => Curso, (curso) => curso.alunos, { eager: true, nullable: true })
  @JoinColumn({ name: "cursoId" })
  curso?: Curso;

  @Column({ type: "int", nullable: true })
  cursoId?: number;
}
