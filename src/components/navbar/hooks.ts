"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";

// `useLayoutEffect` measures DOM synchronously before paint (so the sliding
// underline never flashes at the wrong spot), but warns during SSR — fall back
// to `useEffect` on the server.
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Effect-free "are we on the client?" check, for SSR-safe portal rendering.
const subscribeNoop = () => () => {};
export const useIsClient = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
