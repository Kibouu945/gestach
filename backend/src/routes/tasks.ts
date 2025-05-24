import { Router, Request, Response } from 'express';
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask
} from '../services/tasks';

const router = Router();

// GET /tasks
router.get('/', (req: Request, res: Response) => {
  try {
    const tasks = getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /tasks
router.post('/', (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({ error: 'Missing fields' });
      return;
    }
    const newTask = createTask({ title, description });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// DELETE /tasks/:id
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = deleteTask(id);
    if (!success) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /tasks/:id
router.patch('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !['pending', 'done'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }
    const updatedTask = updateTask(id, { status });
    if (!updatedTask) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;