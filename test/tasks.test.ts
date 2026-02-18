import { loadState, saveState } from "@/services/persistence";
import { useCalendarStore } from "@/stores/calendar";
import { useTasksStore, type Task } from "@/stores/tasks";
import { useWorkspacesStore } from "@/stores/workspaces";
import { createPinia, setActivePinia, type Pinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/services/persistence", () => ({
  loadState: vi.fn().mockResolvedValue(undefined),
  saveState: vi.fn().mockResolvedValue(undefined),
}));

const todayIso = "2024-01-15";
const tomorrowIso = "2024-01-16";

const buildTaskInput = (
  overrides: Partial<Omit<Task, "id">> = {},
): Omit<Task, "id"> => ({
  title: "Task",
  completed: false,
  completedOn: "",
  repeatable: false,
  dueTime: "08:00",
  dueDate: todayIso,
  workspace: 0,
  ...overrides,
});

describe("Task Store", () => {
  let pinia: Pinia;
  let calendarStore: ReturnType<typeof useCalendarStore>;
  let workspaceStore: ReturnType<typeof useWorkspacesStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    pinia = createPinia();
    setActivePinia(pinia);
    calendarStore = useCalendarStore(pinia);
    workspaceStore = useWorkspacesStore(pinia);
    calendarStore.selectedDate = todayIso;
    calendarStore.calendarCursor = todayIso;
    useTasksStore(pinia).$reset();
    workspaceStore.$reset();
  });

  it("adds tasks with incremental ids and persists state", async () => {
    const tasksStore = useTasksStore(pinia);

    await tasksStore.addTask(buildTaskInput({ title: "First" }));
    await tasksStore.addTask(buildTaskInput({ title: "Second" }));

    expect(tasksStore.tasks.map((t) => t.id)).toEqual([0, 1]);
    expect(tasksStore.tasks.map((t) => t.title)).toEqual(["First", "Second"]);
    expect(saveState).toHaveBeenCalledTimes(2);
  });

  it("rejects empty task titles after normalization", async () => {
    const tasksStore = useTasksStore(pinia);
    const added = await tasksStore.addTask(buildTaskInput({ title: "   " }));

    expect(added).toBe(false);
    expect(tasksStore.tasks).toHaveLength(0);
    expect(saveState).not.toHaveBeenCalled();
  });

  it("returns only tasks for the selected date while honoring skips", async () => {
    const tasksStore = useTasksStore(pinia);

    await tasksStore.addTask(buildTaskInput({ title: "Keep me" }));
    await tasksStore.addTask(buildTaskInput({ title: "Skip me" }));
    await tasksStore.addTask(
      buildTaskInput({ title: "Tomorrow", dueDate: tomorrowIso }),
    );

    const secondTask = tasksStore.tasks[1];
    expect(secondTask).toBeDefined();
    if (!secondTask) throw new Error("Expected second task to exist");

    await tasksStore.skipTask(secondTask.id, calendarStore.selectedDateAsDate);
    tasksStore.skippedTasks = [{ taskId: secondTask.id, date: todayIso }];

    workspaceStore.currentWorkspaceId = 0;
    const visibleTasks = tasksStore.getTasks;

    expect(visibleTasks).toHaveLength(1);
    expect(visibleTasks[0]?.title).toBe("Keep me");
    expect(tasksStore.skippedTasks).toHaveLength(1);
    await tasksStore.skipTask(secondTask.id, calendarStore.selectedDateAsDate);
    expect(tasksStore.skippedTasks).toHaveLength(1);
  });

  it("filters tasks by workspace and moves removed tasks to the bin", async () => {
    const tasksStore = useTasksStore(pinia);
    workspaceStore.currentWorkspaceId = 1;

    await tasksStore.addTask(
      buildTaskInput({ title: "Personal", workspace: 1 }),
    );
    await tasksStore.addTask(buildTaskInput({ title: "Work", workspace: 2 }));

    const personalTask = tasksStore.tasks[0];
    expect(personalTask).toBeDefined();
    if (!personalTask) throw new Error("Expected personal task to exist");

    const personalTaskId = personalTask.id;
    const removed = await tasksStore.removeTask(personalTaskId);

    expect(removed).toBe(true);
    expect(tasksStore.getTasks.map((t) => t.title)).toEqual([]);
    expect(tasksStore.getBin).toHaveLength(1);
    expect(tasksStore.getBin[0]?.workspaceSnapshot).toBe("Personal");
    expect(await tasksStore.removeTask(999)).toBe(false);
  });

  it("completes, recovers, and purges tasks correctly", async () => {
    const tasksStore = useTasksStore(pinia);

    await tasksStore.addTask(buildTaskInput({ title: "Finish me" }));
    await tasksStore.addTask(buildTaskInput({ title: "Leave completed" }));

    const firstTask = tasksStore.tasks[0];
    const secondTask = tasksStore.tasks[1];
    expect(firstTask).toBeDefined();
    expect(secondTask).toBeDefined();
    if (!firstTask || !secondTask) throw new Error("Expected tasks to exist");

    const firstId = firstTask.id;
    const secondId = secondTask.id;

    expect(await tasksStore.completeTask(firstId)).toBe(true);
    expect(await tasksStore.completeTask(secondId)).toBe(true);

    expect(tasksStore.getHistory.map((t) => t.title)).toEqual([
      "Finish me",
      "Leave completed",
    ]);
    expect(tasksStore.getHistory.every((task) => task.completed)).toBe(true);
    expect(tasksStore.getHistory[0]?.completedOn).not.toBe("");
    expect(tasksStore.getHistory[1]?.completedOn).not.toBe("");

    await tasksStore.recoverTask("history", firstId);
    expect(tasksStore.getHistory.map((t) => t.title)).toEqual([
      "Leave completed",
    ]);
    expect(tasksStore.getTasks.map((t) => t.title)).toEqual(["Finish me"]);
    expect(tasksStore.tasks.find((t) => t.id === firstId)?.completed).toBe(
      false,
    );
    expect(tasksStore.tasks.find((t) => t.id === firstId)?.completedOn).toBe(
      "",
    );

    await tasksStore.purgeTask("history", secondId);
    expect(tasksStore.getHistory).toHaveLength(0);
  });

  it("archives every task from a workspace in one operation", async () => {
    const tasksStore = useTasksStore(pinia);
    await tasksStore.addTask(buildTaskInput({ title: "A", workspace: 1 }));
    await tasksStore.addTask(buildTaskInput({ title: "B", workspace: 1 }));
    await tasksStore.addTask(buildTaskInput({ title: "C", workspace: 2 }));

    const archived = await tasksStore.archiveWorkspaceTasks(1, "Personal");

    expect(archived).toBe(2);
    expect(tasksStore.tasks.map((task) => task.title)).toEqual(["C"]);
    expect(tasksStore.removedTasks.map((task) => task.title)).toEqual([
      "A",
      "B",
    ]);
    expect(
      tasksStore.removedTasks.every(
        (task) => task.workspaceSnapshot === "Personal",
      ),
    ).toBe(true);
  });

  it("hydrates state from IndexedDB snapshot", async () => {
    const storedState = {
      nextId: 5,
      tasks: [
        {
          id: 3,
          title: "Stored",
          completed: false,
          completedOn: "",
          repeatable: "every day",
          dueTime: "09:00",
          dueDate: todayIso,
          workspace: 0,
        },
      ],
      removedTasks: [],
      completedTasks: [],
      skippedTasks: [{ taskId: 3, date: todayIso }],
    };
    vi.mocked(loadState).mockResolvedValueOnce(storedState);

    const tasksStore = useTasksStore(pinia);
    await tasksStore.hydrate();

    expect(tasksStore.tasks[0]?.title).toBe("Stored");
    expect(tasksStore.nextId).toBe(5);
    expect(loadState).toHaveBeenCalledWith("tasks");
  });
});
