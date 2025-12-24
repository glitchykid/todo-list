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
    tasksForSelectedDate: (state) => {
      const calendarStore = useCalendarStore();
      return state.tasks.filter(
        (task) => task.dueDate === calendarStore.selectedDate,
      );
    },

    tasksForSelectedWorkspace: (state) => {
      const workspacesStore = useWorkspacesStore();
      return state.tasks.filter(
        (task) => task.workspace === workspacesStore.currentWorkspace,
      );
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
