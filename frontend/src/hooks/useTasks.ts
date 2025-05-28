import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskApi } from '../api/taskApi';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [], error } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskApi.getTasks,
  });

  const createMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'done' }) =>
      taskApi.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    tasks,
    error: error || createMutation.error || deleteMutation.error || updateStatusMutation.error,
    createTask: createMutation.mutateAsync,
    deleteTask: deleteMutation.mutateAsync,
    updateTaskStatus: updateStatusMutation.mutateAsync,
  };
};