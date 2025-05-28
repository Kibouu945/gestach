import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/tasks', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Types
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

export interface UpdateTaskStatusDTO {
  status: TaskStatus;
}



// Fonctions pour interagir avec l'API des tâches
export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const { data } = await apiClient.get<Task[]>('/'); // Chemin relatif : /tasks déjà dans baseURL
    return data;
  },

  createTask: async (taskData: CreateTaskDTO): Promise<Task> => {
    const { data } = await apiClient.post<Task>('/', taskData); // Chemin relatif
    return data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/${id}`); // Chemin relatif
  },

  updateTaskStatus: async (id: string, status: TaskStatus): Promise<Task> => {
    const { data } = await apiClient.patch<Task>(`/${id}`, { status });
    return data;
  }
};

// Error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = data?.error || 
                         (status === 400 ? 'Invalid request' :
                          status === 404 ? 'Resource not found' :
                          'Server error');
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error('Network error - please check your connection');
    } else {
      throw new Error('Request configuration error');
    }
  }
);