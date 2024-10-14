import { QueryClient } from "@tanstack/react-query";

export async function optimisticUpdate<T>(
  queryKey: any[],
  updateFn: (oldData: T[]) => T[],
  queryClient: QueryClient
) {
  await queryClient.cancelQueries({ queryKey });
  const prevData = queryClient.getQueryData<T[]>(queryKey) || [];
  queryClient.setQueryData(queryKey, updateFn(prevData));
  return { prevData };
}