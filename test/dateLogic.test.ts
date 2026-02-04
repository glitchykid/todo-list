import { type Task } from "@/stores/tasks";
import {
  occursOnDate,
  toISODate,
  fromISODate,
  toLocaleDate,
} from "@/utils/dateLogic";
import { describe, expect, it } from "vitest";

describe("dateLogic helpers", () => {
  it("converts dates to ISO without time information", () => {
    const date = new Date("2024-02-03T15:45:00Z");
    expect(toISODate(date)).toBe("2024-02-03");
  });

  it("determines task occurrence with repeat rules", () => {
    const start = fromISODate("2024-01-01");
    const baseTask: Pick<Task, "dueDate" | "repeatable"> = {
      dueDate: toISODate(start),
      repeatable: "every week",
    };

    expect(occursOnDate(baseTask, fromISODate("2024-01-08"))).toBe(true);
    expect(occursOnDate(baseTask, fromISODate("2023-12-31"))).toBe(false);

    const monthlyTask: Pick<Task, "dueDate" | "repeatable"> = {
      dueDate: "2024-01-15",
      repeatable: "every month",
    };
    expect(occursOnDate(monthlyTask, fromISODate("2024-02-15"))).toBe(true);

    const invalidTask: Pick<Task, "dueDate" | "repeatable"> = {
      dueDate: "not-a-date",
      repeatable: false,
    };
    expect(occursOnDate(invalidTask, new Date())).toBe(false);
  });

  it("formats locale dates and rejects invalid inputs", () => {
    const formatted = toLocaleDate("2024-05-06", "14:30");
    const expected = new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(Date.UTC(2024, 4, 6, 14, 30)));
    expect(formatted).toBe(expected);

    expect(toLocaleDate("2024-02-30", "10:00")).toBe(false);
    expect(toLocaleDate("2024-02-10", "25:00")).toBe(false);
  });
});
