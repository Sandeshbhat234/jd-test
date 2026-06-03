/**
 * Helpers for opening-hours stored as 24-hour "HH:MM" strings.
 * `open`/`close` are null on closed days.
 */

export interface DayHours {
  /** Full day name, e.g. "Monday". Order in the array is the display order. */
  day: string;
  /** 24-hour "HH:MM", or null if closed that day. */
  open: string | null;
  /** 24-hour "HH:MM", or null if closed that day. */
  close: string | null;
}

/** "20:30" → 1230 (minutes since midnight). Returns null for null input. */
function toMinutes(time: string | null): number | null {
  if (!time) return null;
  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

/** "09:30" → "9:30am", "20:00" → "8:00pm". */
export function formatTime(time: string | null): string {
  const mins = toMinutes(time);
  if (mins === null) return "Closed";
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")}${period}`;
}

/** Display range for a day, e.g. "9:30am – 8:30pm" or "Closed". */
export function formatRange(entry: DayHours): string {
  if (!entry.open || !entry.close) return "Closed";
  return `${formatTime(entry.open)} – ${formatTime(entry.close)}`;
}

/** JS Date.getDay() (0=Sun) mapped to the lowercased day names we store. */
const DAY_NAMES = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export interface OpenState {
  open: boolean;
  /** e.g. "9:00 PM" — the close time today, when open. */
  closesAt?: string;
}

/**
 * Whether the location is open right now, based on the visitor's local clock.
 * `now` is injectable for testing.
 */
export function getOpenState(hours: DayHours[], now: Date = new Date()): OpenState {
  const todayName = DAY_NAMES[now.getDay()];
  const today = hours.find((h) => h.day.toLowerCase() === todayName);
  if (!today) return { open: false };

  const openM = toMinutes(today.open);
  const closeM = toMinutes(today.close);
  if (openM === null || closeM === null) return { open: false };

  const nowM = now.getHours() * 60 + now.getMinutes();
  const isOpen = nowM >= openM && nowM < closeM;
  return isOpen
    ? { open: true, closesAt: formatTime(today.close).toUpperCase() }
    : { open: false };
}
