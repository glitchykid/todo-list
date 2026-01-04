import { useCalendarStore } from "@/stores/calendar";
import { defineStore } from "pinia";
import { useWorkspacesStore } from "./workspaces";

export type DateFilter = "today" | "tomorrow" | "select";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  repeatable: boolean | string;
  dueTime: string;
  dueDate: string;
  workspace: string;
}

export const useTasksStore = defineStore("tasks", {
  state: () => {
    return {
      tasks: [] as Task[],
      removedTasks: [] as Task[],
      completedTasks: [] as Task[],
    };
  },

  getters: {
    filteredTasks: (state): Task[] => {
      const calendarStore = useCalendarStore();
      const workspacesStore = useWorkspacesStore();
      let result: Task[] = [];
      result = state.tasks.filter(
        (task) =>
          task.dueDate === calendarStore.selectedDate &&
          (workspacesStore.currentWorkspace === "All tasks" ||
            task.workspace === workspacesStore.currentWorkspace),
      );
      result.sort((a, b) => {
        const firstArr: string[] = a.dueTime.split(":");
        const secondArr: string[] = b.dueTime.split(":");

        let result = 0;

        firstArr.forEach((v, i) => {
          if (Number(v) > Number(secondArr[i])) result = -1;
          else if (Number(v) > Number(secondArr[i])) result = -1;
        });

        return result;
      });
      return result;
    },
  },

  actions: {
    addTask(task: Task): void {
      this.tasks.push(task);
    },

    removeTask(id: number): void {
      this.removedTasks = this.tasks.filter((task: Task) => id === task.id);
      this.tasks = this.tasks.filter((task: Task) => id !== task.id);
    },

    completeTask(id: number): void {
      this.completedTasks = this.tasks.filter((task: Task) => id === task.id);
      this.tasks = this.tasks.filter((task: Task) => id !== task.id);
    },
  },
});
