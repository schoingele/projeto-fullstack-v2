import { Request, Response, NextFunction } from 'express';
// Desabilitado temporariamente para facilitar testes locais sem JWT.
// Para reativar, restaure a implementação anterior que valida o header Authorization.
export default (req: Request, res: Response, next: NextFunction) => {
  // Comentado: validação JWT removida para testes.
  // const authHeader = req.headers.authorization;
  // if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
  // ...validations...
  return next();
};
