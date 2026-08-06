const PREFIX = "artikel-trainer:";

export function getBestStreak(key: string): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(PREFIX + "best-streak:" + key);
  return raw ? parseInt(raw, 10) || 0 : 0;
}

export function setBestStreak(key: string, value: number): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREFIX + "best-streak:" + key, String(value));
}
