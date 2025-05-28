import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import { useState } from 'react';

function App() {
  const {
    tasks,
    createTask,
    deleteTask,
    updateTaskStatus
  } = useTasks();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'done'>('all');

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    return task.status === activeFilter;
  });


  // Handlers pour les actions de l'utilisateur
  const handleCreateTask = async (taskData: { title: string; description: string }) => {
    try {
      await createTask(taskData);
    } catch (err) {
      console.error("Task creation failed:", err);
    }
  };

  const handleUpdateTaskStatus = async (id: string, status: 'pending' | 'done') => {
    await updateTaskStatus({ id, status });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-8 pb-16">
      <div className="w-full max-w-3xl px-4">
        {/* Formulaire de création */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <TaskForm onSubmit={handleCreateTask} />
        </div>

        {/* Liste des tâches avec filtres */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Tasks</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 text-sm rounded-full ${
                  activeFilter === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setActiveFilter('pending')}
                className={`px-3 py-1 text-sm rounded-full ${
                  activeFilter === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                En cours
              </button>
              <button
                onClick={() => setActiveFilter('done')}
                className={`px-3 py-1 text-sm rounded-full ${
                  activeFilter === 'done' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Complétées
              </button>
            </div>
          </div>

          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onUpdateStatus={handleUpdateTaskStatus}
          />
        </div>
      </div>
    </div>
  );
}

export default App;