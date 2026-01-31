import type { Type } from "@/components/molecules/TaskInfo.vue";
import { defineStore } from "pinia";
import { useWorkspacesStore } from "./workspaces";

export type DateFilter = "today" | "tomorrow" | "select";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  completedOn: string;
  repeatable: boolean | string;
  dueTime: string;
  dueDate: string;
  workspace: number;
};

export const useTasksStore = defineStore("tasks", {
  state: () => {
    return {
      id: 0 as number,
      tasks: [] as Task[],
      removedTasks: [] as Task[],
      completedTasks: [] as Task[],
    };
  },

  getters: {
    getTasks: (state): Task[] => {
      const workspacesStore = useWorkspacesStore();
      if (workspacesStore.currentWorkspace.id === 0) return state.tasks;
      let tempTasks = [...state.tasks].filter(
        (task) => task.workspace === workspacesStore.currentWorkspace.id,
      );
      return tempTasks;
    },
  },

  actions: {
    addTask(task: Task): void {
      this.tasks.push(task);
      this.id++;
    },

    removeTask(id: number): boolean {
      let functionResult: boolean = true;
      const i: number = this.tasks.findIndex((el) => el.id === id);
      if (i !== -1 && this.tasks[i]) {
        this.removedTasks.push(this.tasks[i]);
        this.tasks.splice(i, 1);
      } else functionResult = false;
      return functionResult;
    },

    completeTask(id: number): boolean {
      let functionResult: boolean = true;
      const i: number = this.tasks.findIndex((task) => task.id === id);
      if (i !== -1 && this.tasks[i]) {
        this.completedTasks.push(this.tasks[i]);
        this.tasks.splice(i, 1);
      } else functionResult = false;
      return functionResult;
    },

    /**
     * Removes task from task array that depend on a type.
     */
    purgeTask(type: Type, id: number): void {
      switch (type) {
        case "history":
          this.completedTasks = this.completedTasks.filter(
            (value) => value.id !== id,
          );
          break;
        case "bin":
          this.removedTasks = this.removedTasks.filter(
            (value) => value.id !== id,
          );
          break;
      }
    },

    recoverTask(type: Type, id: number): void {
      const pointerToArrayOfType =
        type === "history" ? this.completedTasks : this.removedTasks;
      const i: number = pointerToArrayOfType.findIndex(
        (task) => task.id === id,
      );
      const task: Task | undefined = pointerToArrayOfType[i];
      if (!task) return;
      pointerToArrayOfType.splice(i, 1);
      this.tasks.push(task);
    },
  },
});
