let tasks: Task[] = [];
let idCounter = 1;

export const getTasks = () => tasks;

export const createTask = (data: CreateTaskDTO): Task => {
  const newTask: Task = {
    id: (idCounter++).toString(),
    ...data,
    status: 'pending'
  };
  tasks.push(newTask);
  return newTask;
};

export const deleteTask = (id: string): boolean => {
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  return tasks.length !== initialLength;
};

export const updateTask = (id: string, data: UpdateTaskDTO): Task | null => {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;
  
  Object.assign(task, data);
  return task;
};