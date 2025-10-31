import { defineStore } from "pinia";
import { currentLocale } from "@/locales/locales";

export type DateFilter = "today" | "tomorrow" | "select";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export const useTasksStore = defineStore("tasks", {
  state: () => {
    const today = new Date();
    const todayIso = toISODate(today);

    return {
      activeFilter: "today" as DateFilter,
      selectedDate: todayIso,
      calendarCursor: todayIso,
      isCalendarOpen: false,
      tasks: [] as Task[],
    };
  },
  getters: {
    selectedDateAsDate: (state) => fromISODate(state.selectedDate),
    calendarCursorDate: (state) => fromISODate(state.calendarCursor),
    formattedSelectedDate(): string {
      return new Intl.DateTimeFormat(currentLocale).format(
        this.selectedDateAsDate,
      );
    },
    tasksForSelectedDate: (state) =>
      state.tasks.filter((task) => task.dueDate === state.selectedDate),
  },
  actions: {
    selectToday() {
      const today = new Date();
      const iso = toISODate(today);
      this.selectedDate = iso;
      this.calendarCursor = iso;
      this.activeFilter = "today";
      this.isCalendarOpen = false;
    },
    selectTomorrow() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const iso = toISODate(tomorrow);
      this.selectedDate = iso;
      this.calendarCursor = iso;
      this.activeFilter = "tomorrow";
      this.isCalendarOpen = false;
    },
    toggleCalendar(force?: boolean) {
      if (typeof force === "boolean") {
        this.isCalendarOpen = force;
      } else {
        this.isCalendarOpen = !this.isCalendarOpen;
      }

      if (this.isCalendarOpen) {
        this.calendarCursor = this.selectedDate;
      }
    },
    setSelectedDate(date: Date) {
      const iso = toISODate(date);
      this.selectedDate = iso;
      this.calendarCursor = iso;
      this.activeFilter = "select";
      this.isCalendarOpen = false;
    },
    setCalendarMonth(date: Date) {
      const iso = toISODate(date);
      if (this.calendarCursor === iso) return;
      this.calendarCursor = iso;
    },
    addTask(task: Task) {
      this.tasks.push(task);
    },
    removeTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    toggleTask(id: string) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.completed = !task.completed;
    },
  },
});

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromISODate(iso: string): Date {
  const [yearPart, monthPart, dayPart] = iso.split("-");
  const year = Number(yearPart);
  const month = Number(monthPart) || 1;
  const day = Number(dayPart) || 1;
  return new Date(year, month - 1, day);
}
