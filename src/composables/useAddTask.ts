import { useTasksStore, type Task } from "@/stores/tasks";

export type AddTask = {
  id: number;
  task: Task | null;
};

export const useAddTask = (valuesForAddTask: AddTask): void => {
  const tasksStore = useTasksStore();
  if (valuesForAddTask.task === null || valuesForAddTask.task.title === "")
    return;
  tasksStore.addTask(valuesForAddTask.task);
};
