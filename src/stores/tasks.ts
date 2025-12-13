import { useCalendarStore } from "@/stores/calendar";
import { defineStore } from "pinia";

export type DateFilter = "today" | "tomorrow" | "select";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  repeatable: boolean | string;
  dueTime: string;
  dueDate: Date;
  space: string;
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
        (task) => task.dueDate === calendarStore.selectedDateAsDate,
      );
    },
  },

  actions: {
    addTask(task: Task): void {
      this.tasks.push(task);
    },

    removeTask(id: number) {
      this.tasks = this.tasks.filter((task: Task) => id !== task.id);
    },
  },
});
