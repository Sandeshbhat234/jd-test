"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns false during SSR and the first client render, then true. Use it to
 * gate browser-only / time-dependent UI (e.g. "Open now") so it renders
 * identically on server and client and avoids hydration mismatches — without
 * setting state inside an effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
