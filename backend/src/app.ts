import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks'; // Importez votre routeur

const app = express();
const PORT = 3000;

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Montez le routeur des tâches
app.use('/tasks', tasksRouter); // Préfixe toutes les routes avec /api/tasks

// Route de test
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Gestion des erreurs globales
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});