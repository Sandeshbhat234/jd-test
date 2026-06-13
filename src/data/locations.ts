/**
 * Locations content for the /locations pages.
 *
 * This is the only file you edit to manage dispensaries. For each location set
 * the address, phone, socials, opening `hours`, `lat`/`lng` (used by the map),
 * and an `image` (drop the file into `public/locations/` and point `image` at
 * it). Open/closed status and the displayed time ranges are computed from
 * `hours` — see `src/lib/hours.ts`.
 */

import type { DayHours } from "@/lib/hours";
import { SOCIAL_URLS } from "@/data/site";

export interface Location {
  /** URL segment: /locations/<slug> */
  slug: string;
  /** Full name, e.g. "JD's Jungle Queens". */
  name: string;
  /** Short label shown on the map marker, e.g. "Queens". */
  shortName: string;
  /** Subtitle on the detail page. */
  subtitle: string;
  phone: string;
  /** Address lines (rendered stacked where needed). */
  address: string[];
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  /** Map coordinates. */
  lat: number;
  lng: number;
  /** Path under /public, e.g. "/locations/queens.webp". */
  image: string;
  /** Seven entries, Monday → Sunday. Used for the detail page + open/closed badge. */
  hours: DayHours[];
  /** Condensed open-hours lines shown on the contact page. */
  hoursSummary: string[];
}

const STANDARD_HOURS: DayHours[] = [
  { day: "Monday", open: "09:30", close: "20:30" },
  { day: "Tuesday", open: "09:30", close: "20:30" },
  { day: "Wednesday", open: "09:30", close: "20:30" },
  { day: "Thursday", open: "09:30", close: "20:30" },
  { day: "Friday", open: "09:30", close: "21:00" },
  { day: "Saturday", open: "09:30", close: "21:00" },
  { day: "Sunday", open: "10:00", close: "19:00" },
];

const STANDARD_HOURS_SUMMARY = [
  "Monday - Saturday: 10am - 8pm EST",
  "Sunday: Closed",
];

const SUBTITLE =
  "Visit our sophisticated dispensaries for expert guidance and premium products.";

export const LOCATIONS: Location[] = [
  {
    slug: "queens",
    name: "JD's Jungle Queens",
    shortName: "Queens",
    subtitle: SUBTITLE,
    phone: "+1 (845) 869-9333",
    address: ["28-10 Steinway Street, Storefront C", "Astoria, NY 11103"],
    email: "queens@jdsjungle.com",
    facebookUrl: SOCIAL_URLS.facebook,
    instagramUrl: SOCIAL_URLS.instagram,
    lat: 40.7644,
    lng: -73.9235,
    image: "/locations/queens.webp",
    hours: STANDARD_HOURS,
    hoursSummary: STANDARD_HOURS_SUMMARY,
  },
  {
    slug: "brooklyn",
    name: "JD's Jungle Brooklyn",
    shortName: "Brooklyn",
    subtitle: SUBTITLE,
    phone: "+1 (845) 869-9333",
    address: ["234 North 7th Street, Suite B", "Brooklyn, NY 11211"],
    email: "brooklyn@jdsjungle.com",
    facebookUrl: SOCIAL_URLS.facebook,
    instagramUrl: SOCIAL_URLS.instagram,
    lat: 40.717,
    lng: -73.955,
    image: "/locations/brooklyn.webp",
    hours: STANDARD_HOURS,
    hoursSummary: STANDARD_HOURS_SUMMARY,
  },
  {
    slug: "manhattan",
    name: "JD's Jungle Manhattan",
    shortName: "Manhattan",
    subtitle: SUBTITLE,
    phone: "+1 (845) 869-9333",
    address: ["302 West 46th Street, Unit A", "New York, NY 10036"],
    email: "manhattan@jdsjungle.com",
    facebookUrl: SOCIAL_URLS.facebook,
    instagramUrl: SOCIAL_URLS.instagram,
    lat: 40.7596,
    lng: -73.989,
    image: "/locations/manhattan.webp",
    hours: STANDARD_HOURS,
    hoursSummary: STANDARD_HOURS_SUMMARY,
  },
];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((loc) => loc.slug === slug);
}
