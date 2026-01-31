import { useTasksStore, type Task } from "@/stores/tasks";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

const getTask = (id: number): Task => {
  const task: Task = {
    id: id,
    title: "New task",
    completed: false,
    completedOn: "20/06/2001 00:00",
    repeatable: false,
    dueTime: "23:00",
    dueDate: "21/06/2001",
    workspace: 0,
  };
  return task;
};

const getMultipleTasks = (amount: number): Task[] => {
  let tasks: Task[] = [];
  for (let i = 0; i < amount; i++) {
    tasks.push(getTask(i));
  }
  return tasks;
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
    const task = getTask(0);
    tasksStore.addTask(task);
    const expectedResult: Task[] = [task];
    const actualResult: Task[] = tasksStore.tasks;
    expect(actualResult).toStrictEqual(expectedResult);
  });

  it("remove a task #1", () => {
    const tasksStore = useTasksStore();
    const tasks: Task[] = getMultipleTasks(3);
    tasks.forEach((task) => tasksStore.addTask(task));
    tasksStore.removeTask(1);
    let expectedResult: Task[] = tasks.filter((task) => task.id !== 1);
    let actualResult: Task[] = tasksStore.getTasks;
    expect(expectedResult).toStrictEqual(actualResult);
    expect(expectedResult).toHaveLength(actualResult.length);
    expectedResult = [];
    expectedResult.push(getTask(1));
    actualResult = tasksStore.removedTasks;
    expect(expectedResult).toStrictEqual(actualResult);
    expect(expectedResult).toHaveLength(actualResult.length);
  });

  it("remove a task #2", () => {
    const tasksStore = useTasksStore();
    const tasks: Task[] = getMultipleTasks(3);
    tasks.forEach((task) => tasksStore.addTask(task));
    tasksStore.removeTask(1);
    tasksStore.removeTask(2);
    let expectedResult: Task[] = tasks.filter(
      (task) => task.id !== 1 && task.id !== 2,
    );
    let actualResult: Task[] = tasksStore.getTasks;
    expect(expectedResult).toStrictEqual(actualResult);
    expect(expectedResult).toHaveLength(actualResult.length);
    expectedResult = [];
    expectedResult.push(getTask(1), getTask(2));
    actualResult = tasksStore.removedTasks;
    expect(expectedResult).toStrictEqual(actualResult);
    expect(expectedResult).toHaveLength(actualResult.length);
  });

  it("complete a task #1", () => {
    const tasksStore = useTasksStore();
    const tasks: Task[] = getMultipleTasks(3);
    tasks.forEach((task) => tasksStore.addTask(task));
    tasksStore.completeTask(1);
    tasksStore.completeTask(2);
    let expectedResult: Task[] = tasks.filter(
      (task) => task.id !== 1 && task.id !== 2,
    );
    let actualResult: Task[] = tasksStore.getTasks;
    expect(expectedResult).toStrictEqual(actualResult);
    expect(expectedResult).toHaveLength(actualResult.length);
    expectedResult = [];
    expectedResult.push(getTask(1), getTask(2));
    actualResult = tasksStore.completedTasks;
    expect(expectedResult).toStrictEqual(actualResult);
    expect(expectedResult).toHaveLength(actualResult.length);
  });

  it("recover a task from completed taks #1", () => {
    const tasksStore = useTasksStore();
    const tasks = getMultipleTasks(8);
    tasks.forEach((task) => {
      tasksStore.addTask(task);
    });
    tasksStore.completeTask(3);
    tasksStore.completeTask(0);
    tasksStore.recoverTask("history", 3);
    tasksStore.recoverTask("history", 0);
    let expectedResult: Task[] = tasks;
    let actualResult: Task[] = tasksStore.getTasks;
    expect(expectedResult).toStrictEqual(actualResult);
  });

  it("purge a task", () => {
    const tasksStore = useTasksStore();
    tasksStore.addTask(getTask(0));
    tasksStore.completeTask(0);
    tasksStore.purgeTask("history", 0);
    const expectedResult: Task[] = [];
    const actualResult: Task[] = tasksStore.completedTasks;
    expect(actualResult).toStrictEqual(expectedResult);
  });
});
