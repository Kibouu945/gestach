import { useState } from 'react';
import type { Task } from '../types/task';


// Props pour le composant TaskItem
interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => Promise<void>;
  onUpdateStatus: (id: string, status: 'pending' | 'done') => Promise<void>;
}

export const TaskItem = ({ task, onDelete, onUpdateStatus }: TaskItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusToggle = async () => {
    try {
      setIsUpdating(true);
      await onUpdateStatus(task.id, task.status === 'pending' ? 'done' : 'pending');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`p-4 border rounded-lg transition-all ${
      task.status === 'done' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={`font-medium ${
            task.status === 'done' ? 'text-green-700 line-through' : 'text-gray-800'
          }`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            onClick={handleStatusToggle}
            disabled={isUpdating}
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              task.status === 'pending'
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                : 'bg-green-100 hover:bg-green-200 text-green-800'
            } transition-colors`}
          >
            {isUpdating ? '...' : task.status === 'pending' ? '✓ Done' : '↻ Undo'}
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 rounded-md text-xs font-medium bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
          >
            {isDeleting ? '...' : '✕ Delete'}
          </button>
        </div>
      </div>
      
      <div className="mt-2 flex items-center">
        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
          task.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {task.status}
        </span>
      </div>
    </div>
  );
};