import { filteringTasks } from "@/composables/useFilteringTasks";
import type { Task } from "@/stores/tasks";
import { describe, expect, it } from "vitest";

const buildTask = (overrides: Partial<Task>): Task => ({
  id: 1,
  title: "Task",
  completed: false,
  completedOn: "",
  repeatable: false,
  dueTime: "08:00",
  dueDate: "2024-01-15",
  workspace: 1,
  ...overrides,
});

describe("filteringTasks", () => {
  it("filters by task title and workspace name with injected resolver", () => {
    const tasks: Task[] = [
      buildTask({ id: 1, title: "Buy milk", workspace: 1 }),
      buildTask({ id: 2, title: "Deploy app", workspace: 2 }),
    ];

    const getWorkspaceName = (workspaceId: number) =>
      workspaceId === 1 ? "Personal" : "Work";

    const filtered = filteringTasks(
      { task: "Buy", space: "Personal" },
      tasks,
      getWorkspaceName,
    );

    expect(filtered.map((task) => task.id)).toEqual([1]);
  });
});

