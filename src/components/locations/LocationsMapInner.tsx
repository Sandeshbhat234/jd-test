"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Link from "next/link";
import type { Location } from "@/data/locations";

function markerIcon(shortName: string, active: boolean) {
  return L.divIcon({
    className: "jd-marker",
    html: `
      <div style="position:relative">
        <div style="width:44px;height:44px;border-radius:9999px;background:#fffff8;
          border:${active ? "2px" : "1px"} solid #0c1e46;display:flex;align-items:center;
          justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.3)">
          <img src="/home/Logos/jd-jungle-mark.svg" alt="" style="width:26px;height:26px;filter:brightness(0)"/>
        </div>
        <span style="position:absolute;left:52px;top:50%;transform:translateY(-50%);
          font-family:var(--font-cy-grotesk),sans-serif;font-weight:500;color:#1e1e1e;
          font-size:18px;white-space:nowrap;text-shadow:0 1px 3px rgba(255,255,255,.95)">${shortName}</span>
      </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

/** Pans/zooms the map to fit the given locations whenever they change. */
function FitToLocations({
  locations,
  singleZoom,
}: {
  locations: Location[];
  singleZoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (locations.length === 0) return;
    if (locations.length === 1) {
      map.setView([locations[0].lat, locations[0].lng], singleZoom);
      return;
    }
    const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
  }, [locations, map, singleZoom]);
  return null;
}

export interface LocationsMapProps {
  locations: Location[];
  activeSlug?: string;
  /** Zoom used when a single location is shown (detail page). */
  singleZoom?: number;
  className?: string;
}

export default function LocationsMapInner({
  locations,
  activeSlug,
  singleZoom = 15,
  className,
}: LocationsMapProps) {
  const center: [number, number] = locations.length
    ? [locations[0].lat, locations[0].lng]
    : [40.7128, -74.006];

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={false}
      className={className ?? "h-full w-full"}
      style={{ background: "#eae9e4" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitToLocations locations={locations} singleZoom={singleZoom} />
      {locations.map((loc) => (
        <Marker
          key={loc.slug}
          position={[loc.lat, loc.lng]}
          icon={markerIcon(loc.shortName, loc.slug === activeSlug)}
        >
          <Popup>
            <span className="block font-cy text-[15px] font-medium text-[#1e1e1e]">
              {loc.name}
            </span>
            <span className="mt-1 block font-cy text-[13px] text-[#555]">
              {loc.address.join(", ")}
            </span>
            <Link
              href={`/locations/${loc.slug}`}
              className="mt-2 inline-block font-cy text-[13px] font-medium text-[#0c1e46] underline"
            >
              View location
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
