import { currentLocale } from "@/locales/locales";

/**
 * @returns Date with follow format: year-month-day
 */
export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  const year = Number(yearPart);
  const month = Number(monthPart) || 1;
  const day = Number(dayPart) || 1;
  const [hourPart, minutePart] = time.split(":");
  const hours = Number(hourPart);
  const minutes = Number(minutePart);
  const result = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  return new Intl.DateTimeFormat(currentLocale, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(result);
}
