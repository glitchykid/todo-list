import { type Task } from "@/stores/tasks";

type ForFiltering = {
  space: string;
  task: string;
};

export const filteringTasks = (
  forFiltering: ForFiltering,
  tasks: Task[],
  getWorkspaceName: (workspaceId: number) => string | undefined,
): Task[] => {
  let result: Task[] = [];
  if (forFiltering.task && forFiltering.task !== "") {
    result = tasks.filter((task) => task.title.includes(forFiltering.task));
  } else {
    result = Array.from(tasks);
  }
  if (forFiltering.space && forFiltering.space !== "") {
    result = result.filter((el) =>
      getWorkspaceName(el.workspace)?.includes(forFiltering.space),
    );
  }
  return result;
};
