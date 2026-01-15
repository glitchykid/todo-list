import { useTasksStore, type Task } from "@/stores/tasks";

export type AddTask = {
  id: number;
  task: Task | null;
};

export const useAddTask = (valuesForAddTask: AddTask): AddTask | boolean => {
  const tasksStore = useTasksStore();
  if (valuesForAddTask.task === null || valuesForAddTask.task.title === "")
    return false;
  tasksStore.addTask(valuesForAddTask.task);
  valuesForAddTask.id++;
  return valuesForAddTask;
};
