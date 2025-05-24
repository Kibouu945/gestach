// backend/src/types/task.ts
export type TaskStatus = 'pending' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
}

export interface UpdateTaskDTO {
  status?: TaskStatus;
}