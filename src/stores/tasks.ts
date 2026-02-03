import type { Repeat } from "@/components/atoms/Repeatable.vue";
import type { Type } from "@/components/molecules/TaskInfo.vue";
import { idbGet, idbSet } from "@/db/indexedDb";
import { occursOnDate, toISODate } from "@/utils/dateLogic";
import { defineStore } from "pinia";
import { toRaw } from "vue";
import { useCalendarStore } from "./calendar";
import { useWorkspacesStore } from "./workspaces";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  completedOn: string;
  repeatable: Repeat | false;
  dueTime: string;
  dueDate: string;
  workspace: number;
  workspaceSnapshot?: string;
};

type SkippedTask = {
  taskId: number;
  date: string; // YYYY-MM-DD
};

type TaskState = {
  nextId: number;
  tasks: Task[];
  removedTasks: Task[];
  completedTasks: Task[];
  skippedTasks: SkippedTask[];
};

const DEFAULT_STATE: TaskState = {
  nextId: 0,
  tasks: [],
  removedTasks: [],
  completedTasks: [],
  skippedTasks: [],
};

export const useTasksStore = defineStore("tasks", {
  state: () => ({ ...DEFAULT_STATE }),

  getters: {
    getTasks(): Task[] {
      const workspaceStore = useWorkspacesStore();
      const calendarStore = useCalendarStore();
      const selectedDate = calendarStore.selectedDateAsDate;
      const iso = toISODate(selectedDate);

      return this.tasks.filter((task) => {
        if (
          workspaceStore.currentWorkspaceId !== 0 &&
          task.workspace !== workspaceStore.currentWorkspaceId
        ) {
          return false;
        }

        const skipped = this.skippedTasks.some(
          (s) => s.taskId === task.id && s.date === iso,
        );
        if (skipped) return false;

        return occursOnDate(task, selectedDate);
      });
    },

    getHistory(): Task[] {
      return this.completedTasks;
    },

    getBin(): Task[] {
      return this.removedTasks;
    },
  },

  actions: {
    async hydrate() {
      const stored = await idbGet<TaskState>("tasks", "state");
      if (stored) {
        this.$patch(stored);
      }
    },

    async persist() {
      await idbSet("tasks", "state", {
        nextId: toRaw(this.nextId),
        tasks: toRaw(this.tasks),
        removedTasks: toRaw(this.removedTasks),
        completedTasks: toRaw(this.completedTasks),
        skippedTasks: toRaw(this.skippedTasks),
      });
    },

    async skipTask(taskId: number, date: Date): Promise<void> {
      const key = toISODate(date);
      if (
        !this.skippedTasks.some((s) => s.taskId === taskId && s.date === key)
      ) {
        this.skippedTasks.push({ taskId, date: key });
      }
      await this.persist();
    },

    async addTask(task: Omit<Task, "id">): Promise<void> {
      this.tasks.push({
        ...task,
        id: this.nextId++,
      });
      await this.persist();
    },

    async removeTask(id: number): Promise<boolean> {
      const i = this.tasks.findIndex((t) => t.id === id);
      if (i === -1 || !this.tasks[i]) return false;
      const wsStore = useWorkspacesStore();
      const task: Task = {
        ...this.tasks[i],
        workspaceSnapshot:
          wsStore.getWorkspaceById(this.tasks[i].workspace)?.name ??
          "Deleted workspace",
      };

      this.removedTasks.push(task);
      this.tasks.splice(i, 1);
      await this.persist();
      return true;
    },

    async completeTask(id: number): Promise<boolean> {
      const i = this.tasks.findIndex((t) => t.id === id);
      if (i === -1 || !this.tasks[i]) return false;
      const wsStore = useWorkspacesStore();
      const task: Task = {
        ...this.tasks[i],
        workspaceSnapshot:
          wsStore.getWorkspaceById(this.tasks[i].workspace)?.name ??
          "Deleted workspace",
      };

      this.completedTasks.push(task);
      this.tasks.splice(i, 1);
      await this.persist();
      return true;
    },

    async purgeTask(type: Type, id: number): Promise<void> {
      if (type === "history") {
        this.completedTasks = this.completedTasks.filter((t) => t.id !== id);
      } else {
        this.removedTasks = this.removedTasks.filter((t) => t.id !== id);
      }
      await this.persist();
    },

    async recoverTask(type: Type, id: number): Promise<void> {
      const source =
        type === "history" ? this.completedTasks : this.removedTasks;
      const i = source.findIndex((t) => t.id === id);
      if (i === -1 || !source[i]) return;
      this.tasks.push(source[i]);
      source.splice(i, 1);
      await this.persist();
    },
  },
});
