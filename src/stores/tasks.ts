import type { Type } from "@/components/molecules/TaskInfo.vue";
import { defineStore } from "pinia";

export type DateFilter = "today" | "tomorrow" | "select";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  completedOn: string;
  repeatable: boolean | string;
  dueTime: string;
  dueDate: string;
  workspace: number;
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
      return state.tasks;
    },
  },

  actions: {
    addTask(task: Task): void {
      this.tasks.push(task);
    },

    removeTask(id: number): boolean {
      let functionResult: boolean = true;
      const i: number = this.tasks.findIndex((el) => el.id === id);
      if (i != -1 && this.tasks[i]) {
        this.removedTasks.push(this.tasks[i]);
        this.tasks.splice(i, 1);
      } else functionResult = false;
      return functionResult;
    },

    completeTask(id: number): boolean {
      let functionResult: boolean = true;
      const i: number = this.tasks.findIndex((el) => el.id === id);
      if (i != -1 && this.tasks[i]) {
        this.completedTasks.push(this.tasks[i]);
        this.tasks.splice(i, 1);
      } else functionResult = false;
      return functionResult;
    },

    /**
     * Removes task from task array that depend on a type.
     */
    purgeTask(type: Type, id: string): void {
      switch (type) {
        case "history":
          this.completedTasks = this.completedTasks.filter(
            (value) => value.id !== Number(id),
          );
          break;
        case "bin":
          this.removedTasks = this.removedTasks.filter(
            (value) => value.id !== Number(id),
          );
          break;
      }
    },

    recoverTask(type: Type, id: string): void {
      let source: Task[] =
        type === "history" ? this.completedTasks : this.removedTasks;
      const index: number = source.findIndex((el) => el.id === Number(id));
      const task: Task | undefined = source[index];
      if (!task) {
        return;
      }
      source.splice(index, 1);
      this.tasks.push(task);
    },
  },
});
