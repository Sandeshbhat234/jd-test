"use client";

import { useEffect } from "react";

/**
 * Hides the site footer (rendered in the root layout) for the duration that
 * this component is mounted. Used by full-bleed pages like 404 / Coming Soon.
 */
export default function HideFooter() {
  useEffect(() => {
    document.body.classList.add("hide-footer");
    return () => document.body.classList.remove("hide-footer");
  }, []);

  return null;
}
