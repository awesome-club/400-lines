import { locale } from "~/config";

export interface CalendarView {
  active: Date;
  current: Date;
  weekIndex: number;
  startOfWeek: Date;
  endOfWeek: Date;
}

export function getCalendarView(active: Date, startOfWeek: Date | null = null): CalendarView {
  startOfWeek = startOfWeek ?? weekMoment(active);
  const current = new Date();
  return {
    active,
    current,
    weekIndex: getWeekIndex(startOfWeek),
    startOfWeek,
    endOfWeek: weekMoment(startOfWeek, 7),
  }
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
}

function getWeekIndex(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((((date.getTime() - start.getTime()) / 86400000) + start.getDay() + 1) / 7);
}

function weekMoment(date: Date, add: number = 1) {
  const next = new Date(date);
  next.setDate(date.getDate() - (date.getDay() || 7) + add)
  return next;
}

export function weekday(date: Date) {
  return date.toLocaleDateString(locale, { weekday: 'long' });
} 

export function pretty(date: Date, month: "long" | "short" = "long") {
  return date.toLocaleDateString(locale, {month, day: "numeric" });
}

export function isSameDate(one: Date, two: Date = new Date()) {
  return one.getFullYear() === two.getFullYear() &&
    one.getMonth() === two.getMonth() &&
    one.getDate() === two.getDate();
}

export function getWeekDates(start: Date): Date[] {
  return [0, 1, 2, 3, 4, 5, 6].map(it => addDays(start, it));
}

export function fmt(date: Date = new Date()): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}