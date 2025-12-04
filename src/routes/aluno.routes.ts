import { Router } from 'express';
import * as AlunoController from '../controllers/aluno.controller';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', AlunoController.criarAluno);
router.get('/',  AlunoController.listarAlunos);
router.get('/:id', AlunoController.buscarAluno);
// router.put('/:id', authMiddleware, AlunoController.atualizarAluno);
// router.patch('/:id', authMiddleware, AlunoController.atualizarParcial);
// router.delete('/:id', authMiddleware, AlunoController.deletarAluno);

export default router;
