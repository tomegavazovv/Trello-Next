import { useAuthenticatedUser } from '@/auth/hooks/use-auth-context';
import { firestoreClient } from '@/lib/firebase/firestore-client';
import { Task, TaskColumns } from '@/types/task';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useColumnTasks() {
  const { user: { uid: userId } } = useAuthenticatedUser();

  const [
    { data: columns = [], isLoading: isColumnsLoading },
    { data: tasks = [], isLoading: isTasksLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['columns', userId],
        queryFn: () => firestoreClient.getColumns(userId),
      },
      {
        queryKey: ['tasks', userId],
        queryFn: () => firestoreClient.getTasks(userId),
      },
    ],
  });

  const isLoading = isColumnsLoading || isTasksLoading;

  const tasksByColumnId = useMemo(() => {
    const map: { [key: string]: Task[] } = {};
    tasks.forEach((task) => {
      if (!map[task.columnId]) {
        map[task.columnId] = [];
      }
      map[task.columnId].push(task);
    });
    return map;
  }, [tasks]);

  const columnToTasks = useMemo(() => {
    const map: TaskColumns = {};
    columns.forEach((column) => {
      map[column.id] = {
        ...column,
        tasks: tasksByColumnId[column.id]?.sort((a, b) => a.order - b.order) || [],
      };
    });
    return map;
  }, [columns, tasksByColumnId]);

  return {
    columnToTasks,
    isLoading,
  };
}
