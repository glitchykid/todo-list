import { useTasksStore, type Task } from "@/stores/tasks";

export const useAddTask = (task: Task): void => {
  const tasksStore = useTasksStore();
  if (task.title === "") return;
  tasksStore.addTask(task);
};
