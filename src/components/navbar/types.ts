export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
  /** Render the children as a full-width mega menu (desktop). */
  mega?: "shop" | "explore";
};
