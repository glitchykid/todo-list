import { currentLocale } from "@/locales/locales";
import { fromISODate, toISODate } from "@/utils/isodateconverter";
import { defineStore } from "pinia";

export type DateFilter = "today" | "tomorrow" | "select";

export const useCalendarStore = defineStore("calendarSelect", {
  state: () => {
    const today = new Date();
    const todayIso = toISODate(today);

    return {
      activeFilter: "today" as DateFilter,
      selectedDate: todayIso,
      calendarCursor: todayIso,
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
  },

  actions: {
    selectToday(): void {
      const today = new Date();
      const iso = toISODate(today);
      this.selectedDate = iso;
      this.calendarCursor = iso;
      this.activeFilter = "today";
    },

    selectTomorrow(): void {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const iso = toISODate(tomorrow);
      this.selectedDate = iso;
      this.calendarCursor = iso;
      this.activeFilter = "tomorrow";
    },

    setSelectedDate(date: Date): void {
      const iso = toISODate(date);
      this.selectedDate = iso;
      this.calendarCursor = iso;
      this.activeFilter = "select";
    },

    setCalendarMonth(date: Date): void {
      const iso = toISODate(date);
      if (this.calendarCursor === iso) return;
      this.calendarCursor = iso;
    },
  },
});
