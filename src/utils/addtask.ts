import { useTasksStore, type Task } from "@/stores/tasks";
import type { Ref } from "vue";

export type AddTask = {
  id: Ref<number>;
  task: Ref<Task | null>;
};

export const addTask = (valuesForAddTask: AddTask): void => {
  const tasksStore = useTasksStore();
  if (
    valuesForAddTask.task.value === null ||
    valuesForAddTask.task.value.title === ""
  )
    return;
  tasksStore.addTask(valuesForAddTask.task.value);
  valuesForAddTask.id.value++;
};
