import { useTasksStore, type Task } from "@/stores/tasks";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

const task: Task = {
  id: 0,
  title: "New task",
  completed: false,
  completedOn: "20/06/2001 00:00",
  repeatable: false,
  dueTime: "23:00",
  dueDate: "21/06/2001",
  workspace: 0,
};

describe("Task Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initialize an empty store", () => {
    const tasksStore = useTasksStore();
    const expectedResult: Task[] = [];
    expect(tasksStore.tasks).toStrictEqual(expectedResult);
    expect(tasksStore.removedTasks).toStrictEqual(expectedResult);
    expect(tasksStore.completedTasks).toStrictEqual(expectedResult);
  });

  it("add a task", () => {
    const tasksStore = useTasksStore();
    tasksStore.addTask(task);
    const expectedResult: Task[] = [task];
    const actualResult: Task[] = tasksStore.tasks;
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it("remove a task", () => {
    const tasksStore = useTasksStore();
    tasksStore.addTask(task);
    tasksStore.addTask(task);
    tasksStore.addTask(task);
    tasksStore.removeTask(0);
    let expectedResult: Task[] = [task, task];
    let actualResult: Task[] = tasksStore.tasks;
    expect(actualResult).toStrictEqual(expectedResult);
    expectedResult = [task];
    actualResult = tasksStore.removedTasks;
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it("complete a task", () => {
    const tasksStore = useTasksStore();
    tasksStore.addTask(task);
    tasksStore.addTask(task);
    tasksStore.addTask(task);
    let expectedResult: Task[] = [task, task, task];
    let actualResult: Task[] = tasksStore.tasks;
    expect(actualResult).toStrictEqual(expectedResult);
    tasksStore.completeTask(0);
    expectedResult = [task, task];
    actualResult = tasksStore.tasks;
    expect(actualResult).toStrictEqual(expectedResult);
    expectedResult = [task];
    actualResult = tasksStore.completedTasks;
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it("purge a task", () => {
    const tasksStore = useTasksStore();
    tasksStore.addTask(task);
    tasksStore.completeTask(0);
    tasksStore.purgeTask("history", "0");
    const expectedResult: Task[] = [];
    const actualResult: Task[] = tasksStore.completedTasks;
    expect(actualResult).toStrictEqual(expectedResult);
  });
});
