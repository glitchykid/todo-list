import type { TaskArchiveScope } from "@/domain/tasks/archive-scope";
import type { TaskRepeatRule } from "@/domain/tasks/repeat";
import { isTaskTitleEmpty, normalizeTaskTitle } from "@/domain/tasks/title";
import { currentLocale } from "@/locales/locales";
import { loadState, saveState } from "@/services/persistence";
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
  repeatable: TaskRepeatRule | false;
  dueTime: string;
  dueDate: string;
  workspace: number;
  workspaceSnapshot?: string;
};

export type TaskDraft = Omit<Task, "id">;

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

const createDefaultState = (): TaskState => ({
  nextId: 0,
  tasks: [],
  removedTasks: [],
  completedTasks: [],
  skippedTasks: [],
});

export const useTasksStore = defineStore("tasks", {
  state: (): TaskState => createDefaultState(),

  getters: {
    getTasks(): Task[] {
      const workspaceStore = useWorkspacesStore();
      const calendarStore = useCalendarStore();
      const selectedDate = calendarStore.selectedDateAsDate;
      const iso = toISODate(selectedDate);

      // Tasks are scoped by workspace, per-day occurrence, and skip list.
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
      // Rehydrate state from persistent storage; noop if nothing was stored.
      const stored = await loadState<TaskState>("tasks");
      if (stored) {
        this.$patch(stored);
      }
    },

    async persist() {
      // Store a raw snapshot; callers keep mutations in-memory until persisted.
      await saveState("tasks", {
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

    async addTask(task: TaskDraft): Promise<boolean> {
      if (isTaskTitleEmpty(task.title)) return false;

      this.tasks.push({
        ...task,
        title: normalizeTaskTitle(task.title),
        id: this.nextId++,
      });
      await this.persist();
      return true;
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
      const completedOn = new Intl.DateTimeFormat(currentLocale, {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date());
      const task: Task = {
        ...this.tasks[i],
        completed: true,
        completedOn,
        workspaceSnapshot:
          wsStore.getWorkspaceById(this.tasks[i].workspace)?.name ??
          "Deleted workspace",
      };

      this.completedTasks.push(task);
      this.tasks.splice(i, 1);
      await this.persist();
      return true;
    },

    async archiveWorkspaceTasks(
      workspaceId: number,
      workspaceSnapshot?: string,
    ): Promise<number> {
      const wsStore = useWorkspacesStore();
      const snapshot =
        workspaceSnapshot ??
        wsStore.getWorkspaceById(workspaceId)?.name ??
        "Deleted workspace";

      const tasksToArchive = this.tasks
        .filter((task) => task.workspace === workspaceId)
        .map((task) => ({
          ...task,
          workspaceSnapshot: snapshot,
        }));

      if (tasksToArchive.length === 0) return 0;

      this.removedTasks.push(...tasksToArchive);
      this.tasks = this.tasks.filter((task) => task.workspace !== workspaceId);
      await this.persist();
      return tasksToArchive.length;
    },

    async purgeTask(type: TaskArchiveScope, id: number): Promise<void> {
      if (type === "history") {
        this.completedTasks = this.completedTasks.filter((t) => t.id !== id);
      } else {
        this.removedTasks = this.removedTasks.filter((t) => t.id !== id);
      }
      await this.persist();
    },

    async recoverTask(type: TaskArchiveScope, id: number): Promise<void> {
      const source =
        type === "history" ? this.completedTasks : this.removedTasks;
      const i = source.findIndex((t) => t.id === id);
      if (i === -1 || !source[i]) return;
      const taskToRecover: Task =
        type === "history"
          ? {
              ...source[i],
              completed: false,
              completedOn: "",
              workspaceSnapshot: undefined,
            }
          : { ...source[i], workspaceSnapshot: undefined };

      this.tasks.push(taskToRecover);
      source.splice(i, 1);
      await this.persist();
    },
  },
});
