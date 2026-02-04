import { currentLocale } from "@/locales/locales";
import { fromISODate, toISODate } from "@/utils/dateLogic";
import { loadState, saveState } from "@/services/persistence";
import { defineStore } from "pinia";
import { toRaw } from "vue";

export type DateFilter = "today" | "tomorrow" | "select";

type CalendarState = {
  activeFilter: DateFilter;
  selectedDate: string;
  calendarCursor: string;
};

const DEFAULT_STATE: CalendarState = {
  activeFilter: "today",
  selectedDate: toISODate(new Date()),
  calendarCursor: toISODate(new Date()),
};

export const useCalendarStore = defineStore("calendar", {
  state: (): CalendarState => ({ ...DEFAULT_STATE }),

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
    async hydrate() {
      const stored = await loadState<CalendarState>("calendar");
      if (stored) {
        this.$patch(stored);
      }
    },

    async persist() {
      await saveState("calendar", {
        activeFilter: toRaw(this.activeFilter),
        selectedDate: toRaw(this.selectedDate),
        calendarCursor: toRaw(this.calendarCursor),
      });
    },

    async selectToday(): Promise<void> {
      const today = new Date();
      const iso = toISODate(today);
      this.selectedDate = iso;
      this.calendarCursor = iso;
      this.activeFilter = "today";
      await this.persist();
    },

    async selectTomorrow(): Promise<void> {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const iso = toISODate(tomorrow);
      this.selectedDate = iso;
      this.calendarCursor = iso;
      this.activeFilter = "tomorrow";
      await this.persist();
    },

    async setSelectedDate(date: Date): Promise<void> {
      const iso = toISODate(date);
      this.selectedDate = iso;
      this.calendarCursor = iso;
      this.activeFilter = "select";
      await this.persist();
    },

    async setCalendarMonth(date: Date): Promise<void> {
      const iso = toISODate(date);
      if (this.calendarCursor === iso) return;
      this.calendarCursor = iso;
      await this.persist();
    },
  },
});
