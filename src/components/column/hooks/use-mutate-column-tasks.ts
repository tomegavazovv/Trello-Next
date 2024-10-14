import { useAuthenticatedUser } from '@/auth/hooks/use-auth-context';
import { useAlertContext } from '@/components/alert-card/context/alert-provider';
import { firestoreClient } from '@/lib/firebase/firestore-client';
import { Column } from '@/types/column';
import { Task, TaskInput } from '@/types/task';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { optimisticUpdate } from '@/utils/optimisticUpdate';
import { calculateNewOrder } from '@/utils/task-utils';

export function useMutateColumnTasks() {
  const {
    user: { uid: userId },
  } = useAuthenticatedUser();
  const queryClient = useQueryClient();
  const { showAlert } = useAlertContext();

  function handleMutationError(
    queryClient: QueryClient,
    queryKey: any[],
    prevData: any,
    errorMessage: string
  ) {
    queryClient.setQueryData(queryKey, prevData);
    showAlert({
      message: errorMessage,
      severity: 'error',
    });
  }

  const addTaskToColumn = useMutation({
    mutationFn: (newTask: TaskInput) =>
      firestoreClient.saveTask(userId, newTask),
    onMutate: async (newTask) =>
      optimisticUpdate<Task>(
        ['tasks', userId],
        (oldData: Task[]) => [
          ...oldData,
          {
            ...newTask,
            id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        queryClient
      ),
    onError: (err, newTask, context) =>
      handleMutationError(
        queryClient,
        ['tasks', userId],
        context?.prevData,
        'Error adding task. Please try again.'
      ),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', userId] });
    },
  });

  const deleteTaskFromColumn = useMutation({
    mutationFn: ({ taskId }: { taskId: string; columnId: string }) =>
      firestoreClient.deleteTask(taskId),
    onMutate: async ({ taskId }) =>
      optimisticUpdate<Task>(
        ['tasks', userId],
        (oldData: Task[]) => oldData.filter((task) => task.id !== taskId),
        queryClient
      ),
    onError: (err, { taskId }, context) =>
      handleMutationError(
        queryClient,
        ['tasks', userId],
        context?.prevData,
        'Error deleting task. Please try again.'
      ),
  });

  const updateTasksOrderOfColumn = useMutation({
    mutationFn: ({
      updatedColumnTasks,
    }: {
      updatedColumnTasks: Task[];
      columnId: string;
    }) => firestoreClient.updateTasksOrder(updatedColumnTasks),
    onMutate: async ({ updatedColumnTasks, columnId }) =>
      optimisticUpdate<Task>(
        ['tasks', userId],
        (oldData: Task[]) =>
          oldData.map((task) =>
            task.columnId === columnId
              ? updatedColumnTasks.find((t) => t.id === task.id) || task
              : task
          ),
        queryClient
      ),
    onError: (err, tasks, context) =>
      handleMutationError(
        queryClient,
        ['tasks', userId],
        context?.prevData,
        'Error updating tasks order. Please try again.'
      ),
  });

  const moveTaskToColumn = useMutation({
    mutationFn: ({
      taskId,
      toColumnId,
    }: {
      taskId: string;
      toColumnId: string;
      fromColumnId: string;
    }) => {
      const currentTasks =
        queryClient.getQueryData<Task[]>(['tasks', userId]) || [];
      const targetColumnTasks = currentTasks.filter(
        (task) => task.columnId === toColumnId
      );
      const newOrder = calculateNewOrder(targetColumnTasks);
      return firestoreClient.updateTaskColumn(taskId, toColumnId, newOrder);
    },

    onMutate: async ({ taskId, toColumnId }) =>
      optimisticUpdate<Task>(
        ['tasks', userId],
        (oldData: Task[]) =>
          oldData.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  columnId: toColumnId,
                  order: calculateNewOrder(
                    oldData.filter((t) => t.columnId === toColumnId)
                  ),
                }
              : task
          ),
        queryClient
      ),
    onError: (err, variables, context) =>
      handleMutationError(
        queryClient,
        ['tasks', userId],
        context?.prevData,
        'Error moving task. Please try again.'
      ),
  });

  const addColumn = useMutation({
    mutationFn: (columnName: string) =>
      firestoreClient.saveColumn(userId, columnName),
    onMutate: async (columnName) =>
      optimisticUpdate<Column>(
        ['columns', userId],
        (oldData: Column[]) => [
          ...oldData,
          {
            id: Math.random().toString(36).substring(2, 15),
            title: columnName,
            order: oldData.length + 1,
          },
        ],
        queryClient
      ),
    onError: (err, variables, context) =>
      handleMutationError(
        queryClient,
        ['columns', userId],
        context?.prevData,
        'Error adding column. Please try again.'
      ),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['columns', userId] });
    },
  });

  const deleteColumn = useMutation({
    mutationFn: (columnId: string) =>
      firestoreClient.deleteColumn(userId, columnId),
    onMutate: async (columnId) =>
      optimisticUpdate<Column>(
        ['columns', userId],
        (oldData: Column[]) =>
          oldData.filter((column) => column.id !== columnId),
        queryClient
      ),
    onError: (err, variables, context) =>
      handleMutationError(
        queryClient,
        ['columns', userId],
        context?.prevData,
        'Error deleting column. Please try again.'
      ),
  });

  const updateTask = useMutation({
    mutationFn: (task: Task) => firestoreClient.updateTask(task),
    onMutate: async (updatedTask) =>
      optimisticUpdate<Task>(
        ['tasks', userId],
        (oldData: Task[]) =>
          oldData.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        queryClient
      ),
    onError: (err, variables, context) =>
      handleMutationError(
        queryClient,
        ['tasks', userId],
        context?.prevData,
        'Error updating task. Please try again.'
      ),
  });

  return {
    addTaskToColumn,
    deleteTaskFromColumn,
    updateTasksOrderOfColumn,
    moveTaskToColumn,
    addColumn,
    deleteColumn,
    updateTask,
  };
}
