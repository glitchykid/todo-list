import { currentLocale } from "@/locales/locales";
import { fromISODate, toISODate } from "@/utils/isodateconverter";
import { defineStore } from "pinia";

export type DateFilter = "today" | "tomorrow" | "select";

export const useCalendarStore = defineStore("calendar", {
  state: () => {
    const today = new Date();
    const todayIso = toISODate(today);

    return {
      activeFilter: "today" as DateFilter,
      selectedDate: todayIso,
      calendarCursor: todayIso,
      isCalendarOpen: false,
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

    setSelectedDate(date: Date): void {
      const iso = toISODate(date);
      this.selectedDate = iso;
      this.calendarCursor = iso;
      this.activeFilter = "select";
      this.isCalendarOpen = false;
    },

    setCalendarMonth(date: Date): void {
      const iso = toISODate(date);
      if (this.calendarCursor === iso) return;
      this.calendarCursor = iso;
    },
  },
});
