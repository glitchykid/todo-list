import { isTaskTitleEmpty, normalizeTaskTitle } from "@/domain/tasks/title";
import { describe, expect, it } from "vitest";

describe("task title domain helpers", () => {
  it("normalizes extra spaces in titles", () => {
    expect(normalizeTaskTitle("  Hello    world   ")).toBe("Hello world");
  });

  it("detects empty titles after normalization", () => {
    expect(isTaskTitleEmpty("   ")).toBe(true);
    expect(isTaskTitleEmpty("  Task  ")).toBe(false);
  });
});

