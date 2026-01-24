import type { Type } from "@/components/molecules/TaskInfo.vue";
import { useCalendarStore } from "@/stores/calendar";
import { defineStore } from "pinia";
import { useWorkspacesStore } from "./workspaces";

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
      const calendarStore = useCalendarStore();
      const workspacesStore = useWorkspacesStore();
      let result: Task[] = [];
      result = state.tasks.filter(
        (task) =>
          task.dueDate === calendarStore.selectedDate &&
          (workspacesStore.currentWorkspace.id ===
            workspacesStore.workspaces[0]?.id ||
            task.workspace === workspacesStore.currentWorkspace.id),
      );
      result.sort((a, b) => {
        const firstArr: string[] = a.dueTime.split(":");
        const secondArr: string[] = b.dueTime.split(":");

        let result = 0;

        firstArr.forEach((v, i) => {
          if (Number(v) > Number(secondArr[i])) result = -1;
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

    removeTask(id: number): boolean {
      let functionResult: boolean = true;
      const i = this.tasks.findIndex((el) => el.id === id);
      if (this.tasks[i]) {
        this.removedTasks.push(this.tasks[i]);
        this.tasks.splice(i, 1);
      } else functionResult = false;
      return functionResult;
    },

    completeTask(id: number): boolean {
      let functionResult: boolean = true;
      const i = this.tasks.findIndex((el) => el.id === id);
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
      let task: Task | undefined;
      let source: Task[] =
        type === "history" ? this.completedTasks : this.removedTasks;
      task = source.find((el) => String(el.id) === id);
      if (!task) {
        return;
      }
      if (type === "history") {
        this.completedTasks = this.completedTasks.filter(
          (el) => String(el.id) !== id,
        );
      } else {
        this.removedTasks = this.removedTasks.filter(
          (el) => String(el.id) !== id,
        );
      }
      this.tasks.push(task);
    },
  },
});
