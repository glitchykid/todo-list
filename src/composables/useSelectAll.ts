import type { Task } from "@/stores/tasks";

export const useSelectAll = (
  checkedTasks: number[],
  tasks: Task[],
): number[] => {
  if (checkedTasks.length >= tasks.length) {
    checkedTasks = [];
  } else {
    tasks.forEach((el) => {
      const isThereNoTheSameTask: boolean = checkedTasks.every(
        (el2) => el2 !== el.id,
      );
      if (isThereNoTheSameTask) {
        checkedTasks.push(el.id);
      }
    });
  }
  return checkedTasks;
};
