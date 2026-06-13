"use client";

import { useMemo, useState } from "react";
import { LOCATIONS } from "@/data/locations";
import { matchesAny } from "@/lib/search";
import SearchBar from "@/components/ui/SearchBar";
import LocationCard from "./LocationCard";
import LocationsMap from "./LocationsMap";

export default function LocationsExplorer() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      LOCATIONS.filter((loc) =>
        matchesAny(query, [loc.name, loc.shortName, ...loc.address]),
      ),
    [query],
  );

  // Map shows the filtered set, or all locations when a search returns nothing.
  const mapLocations = filtered.length > 0 ? filtered : LOCATIONS;

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,545px)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-16 lg:gap-y-8 lg:[grid-template-areas:'search_map''list_map']">
      <div className="order-1 lg:[grid-area:search]">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search"
          ariaLabel="Search locations"
        />
      </div>

      {/* Sticks alongside the list while the whole page scrolls, until the
          section ends (same pattern as the loyalty card). */}
      <div className="order-2 h-[340px] overflow-hidden rounded-2xl border border-[#1e1e1e] sm:h-[420px] lg:order-none lg:sticky lg:top-25 lg:h-[clamp(560px,80vh,900px)] lg:[grid-area:map]">
        <LocationsMap locations={mapLocations} className="h-full w-full" />
      </div>

      <div className="order-3 flex flex-col gap-6 lg:order-none lg:[grid-area:list]">
        {filtered.length === 0 ? (
          <p className="py-8 text-center font-cy text-[clamp(15px,1.5vw,18px)] text-[rgba(30,30,30,0.6)]">
            No locations match your search.
          </p>
        ) : (
          filtered.map((loc) => <LocationCard key={loc.slug} location={loc} />)
        )}
      </div>
    </div>
  );
}
