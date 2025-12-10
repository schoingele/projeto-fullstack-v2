import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import alunoRoutes from './routes/aluno.routes';
import cursoRoutes from './routes/curso.routes';
import matriculaRoutes from './routes/matricula.routes';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

// Request logger para diagnosticar chamadas HTTP (útil em dev)
app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
	// Log do body em requests JSON para diagnosticar payloads
	if (req.is('application/json') && (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH')) {
		try {
			console.log('Body:', JSON.stringify(req.body));
		} catch (e) {
			console.log('Body: <unserializable>');
		}
	}
	// Log dos headers relevantes para diagnosticar CORS / Origin / Content-Type
	try {
		const relevant = {
			origin: req.headers['origin'],
			host: req.headers['host'],
			referer: req.headers['referer'] || req.headers['referrer'],
			'content-type': req.headers['content-type'],
			accept: req.headers['accept'],
			authorization: req.headers['authorization'] ? 'present' : 'absent',
			method: req.method
		};
		console.log('Headers:', JSON.stringify(relevant));
	} catch (e) {
		console.log('Headers: <unserializable>');
	}
	next();
});

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/alunos', alunoRoutes);
// Alias em português/variante para compatibilidade com requests que usem '/usuarios'
app.use('/usuarios', alunoRoutes);
app.use('/cursos', cursoRoutes);
app.use('/matriculas', matriculaRoutes);

app.use(errorHandler);

export default app;
