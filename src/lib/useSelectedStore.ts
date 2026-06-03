"use client";

import { LOCATIONS, getLocation, type Location } from "@/data/locations";
import { useStoredValue } from "./useStoredValue";

const STORAGE_KEY = "jd-selected-store";
/** Default store shown before the visitor picks one. */
const DEFAULT_SLUG = LOCATIONS[0].slug;

/**
 * Globally selected store, persisted to localStorage and shared across
 * components (the navbar selector and the contact page) via `useStoredValue`,
 * so changing it in one place updates everywhere instantly.
 */
export function useSelectedStore(): {
  store: Location;
  setStore: (slug: string) => void;
  stores: Location[];
} {
  const [slug, setSlug] = useStoredValue(STORAGE_KEY, DEFAULT_SLUG);
  const store = getLocation(slug ?? DEFAULT_SLUG) ?? LOCATIONS[0];
  return { store, setStore: setSlug, stores: LOCATIONS };
}
