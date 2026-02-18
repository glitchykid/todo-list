import { useTasksStore, type TaskDraft } from "@/stores/tasks";

export const useAddTask = async (task: TaskDraft): Promise<boolean> => {
  const tasksStore = useTasksStore();
  return tasksStore.addTask(task);
};
