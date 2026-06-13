/**
 * Site-wide brand details: head-office contact, the flagship address shown in
 * the footer, opening hours and social profiles. Edit here — the footer (and
 * any other brand-level UI) reads from this file.
 *
 * (Per-store address / phone / email / socials live in
 * `src/data/locations.ts`, driven by the store selected in the navbar.)
 */

/**
 * Brand social profiles (external). Edit a URL here and it updates everywhere:
 * the footer icons AND the per-store Facebook/Instagram links on the location
 * pages (see `src/data/locations.ts`).
 */
export const SOCIAL_URLS = {
  linkedin: "https://www.linkedin.com/",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
};

/** Footer social icons, built from {@link SOCIAL_URLS}. */
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: SOCIAL_URLS.linkedin, icon: "/home/social/linkedin.svg" },
  { label: "Instagram", href: SOCIAL_URLS.instagram, icon: "/home/social/instagram.svg" },
  { label: "Facebook", href: SOCIAL_URLS.facebook, icon: "/home/social/facebook.svg" },
];

/** Primary contact + flagship location shown in the footer. */
export const SITE_CONTACT = {
  email: "contact@jdsjungle.com",
  /** Address lines (rendered stacked). */
  address: ["302 West 46th Street, Unit A", "New York, NY 10036"],
  /** Open-hours lines. */
  openHours: ["Monday – Saturday: 10am – 8pm EST", "Sunday: Closed"],
};
