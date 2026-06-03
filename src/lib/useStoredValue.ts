"use client";

import { useCallback, useSyncExternalStore } from "react";

const CHANGE_EVENT = "jd-stored-value-change";

/**
 * Reads a string from localStorage and keeps React in sync via
 * useSyncExternalStore — the idiomatic React 19 way to subscribe to an
 * external store without setting state inside an effect or tripping
 * hydration mismatches.
 *
 * `serverValue` is what the server (and the hydrating client render) sees;
 * the real localStorage value is read immediately after hydration. Pick it
 * to control first-paint behaviour, e.g. `null` to block content until we
 * know better, or a sentinel to keep something hidden until hydration.
 */
export function useStoredValue(
  key: string,
  serverValue: string | null,
): readonly [string | null, (value: string) => void] {
  const subscribe = useCallback(
    (callback: () => void) => {
      const handler = (event: Event) => {
        if (event instanceof StorageEvent && event.key !== null && event.key !== key) {
          return;
        }
        callback();
      };
      window.addEventListener("storage", handler);
      window.addEventListener(CHANGE_EVENT, handler);
      return () => {
        window.removeEventListener("storage", handler);
        window.removeEventListener(CHANGE_EVENT, handler);
      };
    },
    [key],
  );

  const getSnapshot = useCallback(() => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }, [key]);

  const value = useSyncExternalStore(subscribe, getSnapshot, () => serverValue);

  const setValue = useCallback(
    (next: string) => {
      try {
        localStorage.setItem(key, next);
      } catch {
        /* storage unavailable — listeners still fire so the UI updates */
      }
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [key],
  );

  return [value, setValue] as const;
}
