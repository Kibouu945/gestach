import { Router, Request, Response } from 'express';
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask
} from './services/tasks';

const router = Router();

router.get('/', (req, res) => {
  res.json(getTasks());
});

router.post('/', (req, res) => {
  try {
    const newTask = createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Invalid task data' });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  const success = deleteTask(req.params.id);
  if (!success) return res.status(404).json({ error: 'Task not found' });
  res.status(204).end();
});

router.patch('/:id', (req, res) => {
  const updatedTask = updateTask(req.params.id, req.body);
  if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
  res.json(updatedTask);
});

export default router;