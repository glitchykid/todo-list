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
    };
  },

  getters: {
    filteredTasks: (state) => {
      const calendarStore = useCalendarStore();
      const workspacesStore = useWorkspacesStore();
      let result: Task[] = [];
      result = state.tasks.filter(
        (task) =>
          task.dueDate === calendarStore.selectedDate &&
          task.workspace === workspacesStore.currentWorkspace,
      );
      return result;
    },
  },

  actions: {
    addTask(task: Task): void {
      this.tasks.push(task);
    },

    removeTask(id: number): void {
      this.tasks = this.tasks.filter((task: Task) => id !== task.id);
    },
  },
});
