// utils/validation.ts
import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});

export const updateTaskSchema = z.object({
  status: z.enum(['pending', 'done']).optional()
});