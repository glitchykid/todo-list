import type { Task } from "@/stores/tasks";

export const useSelectAll = (
  checkedTasks: string[],
  tasks: Task[],
): string[] => {
  if (checkedTasks.length >= tasks.length) {
    checkedTasks = [];
  } else {
    tasks.forEach((el) => {
      const isThereNoTheSameTask: boolean = checkedTasks.every(
        (el2) => el2 !== String(el.id),
      );
      if (isThereNoTheSameTask) {
        checkedTasks.push(String(el.id));
      }
    });
  }
  return checkedTasks;
};
