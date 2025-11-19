import { useCalendarStore } from "@/stores/calendar";
import { defineStore } from "pinia";

export type DateFilter = "today" | "tomorrow" | "select";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

const calendarStore = useCalendarStore();

export const useTasksStore = defineStore("tasks", {
  state: () => {
    return {
      tasks: [] as Task[],
    };
  },

  getters: {
    tasksForSelectedDate: (state) =>
      state.tasks.filter((task) => task.dueDate === calendarStore.selectedDate),
  },

  actions: {
    addTask(task: Task): void {
      this.tasks.push(task);
    },

    removeTask(id: string) {
      this.tasks = this.tasks.filter((task: Task) => task.id !== id);
    },

    toggleTask(id: string) {
      const task = this.tasks.find((t: Task) => t.id === id);
      if (task) task.completed = !task.completed;
    },
  },
});
