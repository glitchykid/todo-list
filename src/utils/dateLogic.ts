import { currentLocale } from "@/locales/locales";
import type { Task } from "@/stores/tasks";

/**
 * @returns Date with follow format: year-month-day
 */

export function toISODate(date: Date): string {
  const d = stripTime(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function occursOnDate(
  task: Pick<Task, "dueDate" | "repeatable">,
  date: Date,
): boolean {
  const start = stripTime(fromISODate(task.dueDate));
  const target = stripTime(date);

  if (Number.isNaN(start.getTime()) || Number.isNaN(target.getTime())) {
    return false;
  }

  if (target < start) return false;

  if (!task.repeatable || task.repeatable === "none") {
    return sameDay(start, target);
  }

  const diffDays = Math.floor((target.getTime() - start.getTime()) / 86400000);

  switch (task.repeatable) {
    case "every day":
      return true;

    case "every week":
      return diffDays % 7 === 0;

    case "every month":
      return start.getDate() === target.getDate();

    default:
      return false;
  }
}

/**
@param iso Must be in "year-month-day" format
*/
export function fromISODate(iso: string): Date {
  const [yearPart, monthPart, dayPart] = iso.split("-");
  const year = Number(yearPart);
  const month = Number(monthPart) || 1;
  const day = Number(dayPart) || 1;
  return new Date(year, month - 1, day);
}

/**
 *
 * @param date Must be in "year-month-day" format
 * @param time Must be in "hour:minute" format
 * @returns The date and time variables to local timezone otherwise if there's an incorrect format returns false
 */
export function toLocaleDate(date: string, time: string): string | boolean {
  const [yearPart, monthPart, dayPart] = date.split("-");
  if (!yearPart || !monthPart || !dayPart) return false;

  const year = Number(yearPart);
  const month = Number(monthPart);
  const day = Number(dayPart);
  const [hourPart, minutePart] = time.split(":");
  const hours = Number(hourPart);
  const minutes = Number(minutePart);

  const partsValid =
    Number.isInteger(year) &&
    Number.isInteger(month) &&
    Number.isInteger(day) &&
    Number.isInteger(hours) &&
    Number.isInteger(minutes) &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31 &&
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59;

  if (!partsValid) return false;

  const result = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const utcDateMatchesInput =
    result.getUTCFullYear() === year &&
    result.getUTCMonth() === month - 1 &&
    result.getUTCDate() === day;

  if (!utcDateMatchesInput) return false;

  return new Intl.DateTimeFormat(currentLocale, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(result);
}
