import { loadState, saveState } from "@/services/persistence";
import { useCalendarStore } from "@/stores/calendar";
import { fromISODate, toISODate } from "@/utils/dateLogic";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/persistence", () => ({
  loadState: vi.fn().mockResolvedValue(undefined),
  saveState: vi.fn().mockResolvedValue(undefined),
}));

const baseDate = new Date("2024-02-10T12:00:00Z");

describe("Calendar Store", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(baseDate);
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("selects today and persists", async () => {
    const store = useCalendarStore();
    await store.selectToday();

    const expectedIso = toISODate(new Date(baseDate));
    expect(store.selectedDate).toBe(expectedIso);
    expect(store.calendarCursor).toBe(expectedIso);
    expect(store.activeFilter).toBe("today");
    expect(saveState).toHaveBeenCalledTimes(1);
  });

  it("selects tomorrow and persists", async () => {
    const store = useCalendarStore();
    await store.selectTomorrow();

    const expectedIso = toISODate(new Date(baseDate.getTime() + 86400000));
    expect(store.selectedDate).toBe(expectedIso);
    expect(store.activeFilter).toBe("tomorrow");
    expect(saveState).toHaveBeenCalledTimes(1);
  });

  it("sets a selected date and switches to select filter", async () => {
    const store = useCalendarStore();
    const customDate = new Date("2024-03-01T00:00:00Z");

    await store.setSelectedDate(customDate);

    const expectedIso = toISODate(customDate);
    expect(store.selectedDate).toBe(expectedIso);
    expect(store.activeFilter).toBe("select");
    expect(store.calendarCursor).toBe(expectedIso);
    expect(saveState).toHaveBeenCalledTimes(1);
  });

  it("updates calendar month only when the cursor changes", async () => {
    const store = useCalendarStore();
    const currentCursor = store.calendarCursor;

    await store.setCalendarMonth(fromISODate(currentCursor));
    expect(saveState).not.toHaveBeenCalled();

    const nextMonth = new Date("2024-04-15T00:00:00Z");
    await store.setCalendarMonth(nextMonth);
    expect(store.calendarCursor).toBe(toISODate(nextMonth));
    expect(saveState).toHaveBeenCalledTimes(1);
  });

  it("hydrates stored calendar state", async () => {
    vi.mocked(loadState).mockResolvedValueOnce({
      activeFilter: "select",
      selectedDate: "2024-05-05",
      calendarCursor: "2024-05-05",
    });
    const store = useCalendarStore();
    await store.hydrate();

    expect(store.selectedDate).toBe("2024-05-05");
    expect(store.activeFilter).toBe("select");
    expect(loadState).toHaveBeenCalledWith("calendar");
  });

  it("exposes derived dates and formatted date", async () => {
    const store = useCalendarStore();
    const customDate = new Date("2024-06-10T00:00:00Z");

    await store.setSelectedDate(customDate);

    expect(store.selectedDateAsDate.toDateString()).toBe(
      fromISODate(store.selectedDate).toDateString(),
    );
    expect(store.calendarCursorDate.toDateString()).toBe(
      customDate.toDateString(),
    );
    expect(store.formattedSelectedDate).toBe(
      new Intl.DateTimeFormat("en-US").format(customDate),
    );
  });
});
