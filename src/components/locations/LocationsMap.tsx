"use client";

import dynamic from "next/dynamic";
import type { LocationsMapProps } from "./LocationsMapInner";

// Leaflet touches `window` at import time, so the map must only render on the
// client. next/dynamic with ssr:false keeps it out of the server bundle.
const LocationsMapInner = dynamic(() => import("./LocationsMapInner"), {
  ssr: false,
  loading: () => (
    <div className="size-full animate-pulse rounded-2xl bg-[#eae9e4]" />
  ),
});

export default function LocationsMap(props: LocationsMapProps) {
  return <LocationsMapInner {...props} />;
}
