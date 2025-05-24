import express from 'express';
import tasksRouter from './routes/tasks'; // Importez le routeur

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Routes
app.use('/tasks', tasksRouter); // Montez le routeur sous le préfixe /tasks

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});