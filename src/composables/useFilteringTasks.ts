import { type Task } from "@/stores/tasks";
import { useWorkspacesStore } from "@/stores/workspaces";

type ForFiltering = {
  space: string;
  task: string;
};

export const filteringTasks = (
  forFiltering: ForFiltering,
  tasks: Task[],
): Task[] => {
  const workspacesStore = useWorkspacesStore();
  let result: Task[] = [];
  if (forFiltering.task && forFiltering.task !== "") {
    result = tasks.filter((task) => task.title.includes(forFiltering.task));
  } else {
    result = Array.from(tasks);
  }
  if (forFiltering.space && forFiltering.space !== "") {
    result = result.filter((el) =>
      workspacesStore
        .getWorkspaceById(el.workspace)
        ?.name.includes(forFiltering.space),
    );
  }
  return result;
};
