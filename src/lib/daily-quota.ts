/**
 * Daily free-reading quota ("3 free readings every day").
 *
 * Enforced client-side because the reading engine itself runs locally
 * (src/lib/reading-local.ts). Credits (paid) always bypass the quota.
 *
 * Storage shape: mt_daily_usage_v1 = { date: "YYYY-MM-DD", used: number }
 * The counter resets itself whenever the stored date differs from today.
 */
export const DAILY_FREE_LIMIT = 3;

const KEY = "mt_daily_usage_v1";

type DailyState = { date: string; used: number };

export type DailyInfo = { used: number; remaining: number; limit: number };

/** Local calendar date as YYYY-MM-DD (en-CA gives exactly this format). */
function today(): string {
  return new Date().toLocaleDateString("en-CA");
}

function readState(): DailyState {
  if (typeof window === "undefined") return { date: today(), used: 0 };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DailyState;
      if (parsed && typeof parsed.used === "number" && parsed.date === today()) {
        return { date: parsed.date, used: Math.min(parsed.used, DAILY_FREE_LIMIT) };
      }
    }
  } catch {
    /* corrupted or unavailable storage — treat as fresh day */
  }
  return { date: today(), used: 0 };
}

function writeState(state: DailyState): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* private mode / storage disabled — quota just won't persist */
  }
}

/** How many free readings are used / left today. */
export function dailyInfo(): DailyInfo {
  const { used } = readState();
  return { used, remaining: Math.max(0, DAILY_FREE_LIMIT - used), limit: DAILY_FREE_LIMIT };
}

/** Record one free reading against today's quota. Returns the new info. */
export function recordDailyReading(): DailyInfo {
  const state = readState();
  state.used = Math.min(DAILY_FREE_LIMIT, state.used + 1);
  writeState(state);
  return { used: state.used, remaining: Math.max(0, DAILY_FREE_LIMIT - state.used), limit: DAILY_FREE_LIMIT };
}
