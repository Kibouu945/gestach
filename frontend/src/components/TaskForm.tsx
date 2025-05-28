import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title requis').max(100, 'Titre trop long'),
  description: z.string().min(1, 'Description requise').max(500, 'Description trop longue')
});

type FormData = z.infer<typeof schema>;

export const TaskForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Créer une nouvelle tache</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          {...register('title')}
          className={`block w-full px-4 py-3 rounded-lg border ${
            errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
          } focus:outline-none focus:ring-2 ${
            errors.title ? 'focus:ring-red-500' : 'focus:ring-blue-500'
          }`}
          placeholder="Titre de la tache..."
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className={`block w-full px-4 py-3 rounded-lg border ${
            errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
          } focus:outline-none focus:ring-2 ${
            errors.description ? 'focus:ring-red-500' : 'focus:ring-blue-500'
          }`}
          placeholder="Description de la tache..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-4 rounded-lg font-medium ${
          isSubmitting 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white transition-colors shadow-md`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Create Task'
        )}
      </button>
    </form>
  );
};