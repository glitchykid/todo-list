export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromISODate(iso: string): Date {
  const [yearPart, monthPart, dayPart] = iso.split("-");
  const year = Number(yearPart);
  const month = Number(monthPart) || 1;
  const day = Number(dayPart) || 1;
  return new Date(year, month - 1, day);
}
