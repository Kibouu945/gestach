import type { Task } from '../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => Promise<void>;
  onUpdateStatus: (id: string, status: 'pending' | 'done') => Promise<void>;
  isLoading?: boolean;
}

export const TaskList = ({ tasks, onDelete, onUpdateStatus, isLoading }: TaskListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Pas de taches à afficher. Commencez par en créer une !
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};