import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask
} from '../services/tasks';
import { Task, TaskStatus } from '../types/task';

const router = Router();

// Schémas de validation Zod
const taskIdSchema = z.string().uuid();
const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
});
const updateTaskStatusSchema = z.object({
  status: z.enum(["pending", "done"]),
});

// Middleware de validation
const validate = (schema: z.ZodObject<any>) => 
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          errors: err.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      } else {
        next(err);
      }
    }
  };

// GET /tasks
router.get<{}, Task[], {}>(
  '/',
  (req: Request, res: Response<Task[]>, next: NextFunction) => {
    try {
      const tasks = getTasks();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
);

// POST /tasks
router.post<{}, Task | { errors: Array<{ field: string; message: string }> }, z.infer<typeof createTaskSchema>>(
  '/',
  validate(createTaskSchema),
  (req: Request, res: Response<Task | { errors: Array<{ field: string; message: string }> }>, next: NextFunction) => {
    try {
      const newTask = createTask(req.body);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /tasks/:id
router.delete<{ id: string }, {} | { error: string }>(
  '/:id',
  (req: Request<{ id: string }>, res: Response<{} | { error: string }>, next: NextFunction): void => {
    try {
      if (!taskIdSchema.safeParse(req.params.id).success) {
        res.status(400).json({ error: 'Invalid task ID format' });
        return;
      }
      
      const success = deleteTask(req.params.id);
      if (!success) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

// PATCH /tasks/:id
router.patch<{ id: string }, Task | { error: string } | { errors: Array<{ field: string; message: string }> }, z.infer<typeof updateTaskStatusSchema>>(
  '/:id',
  validate(updateTaskStatusSchema),
  (req: Request<{ id: string }>, res: Response<Task | { error: string } | { errors: Array<{ field: string; message: string }> }>, next: NextFunction): void => {
    try {
      if (!taskIdSchema.safeParse(req.params.id).success) {
        res.status(400).json({ error: 'Invalid task ID format' });
        return;
      }

      const updatedTask = updateTask(req.params.id, req.body);
      if (!updatedTask) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  }
);

export default router;