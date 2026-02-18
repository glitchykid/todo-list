const MAX_TASK_TITLE_LENGTH = 120;

export function normalizeTaskTitle(rawTitle: string): string {
  return rawTitle.replace(/\s+/g, " ").trim().slice(0, MAX_TASK_TITLE_LENGTH);
}

export function isTaskTitleEmpty(rawTitle: string): boolean {
  return normalizeTaskTitle(rawTitle).length === 0;
}

