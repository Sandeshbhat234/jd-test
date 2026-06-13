/**
 * "What We Stand For" values. Shared so the desktop reveal (merged into the
 * What Makes Us Different capsule) and the mobile list (WhatWeStandFor) stay in
 * sync from one source.
 */

export type StandForValue = {
  icon: string;
  title: string;
  sub: string;
  /** Which side of the centre timeline the desktop card sits on. */
  side: "right" | "left";
};

const A4 = "/About%20page/Animation%204";

export const STAND_FOR_VALUES: StandForValue[] = [
  {
    icon: `${A4}/Legitimacy.svg`,
    title: "Legitimacy",
    sub: "Proudly licensed by the New York Office of Cannabis Management.",
    side: "right",
  },
  {
    icon: `${A4}/Quality.svg`,
    title: "Quality",
    sub: "Every product meets our standard – lab tested and hand-selected.",
    side: "left",
  },
  {
    icon: `${A4}/Community.svg`,
    title: "Community",
    sub: "We exist at the intersection of cannabis culture and New York.",
    side: "right",
  },
  {
    icon: `${A4}/Clarity.svg`,
    title: "Clarity",
    sub: "We cut through the noise so you feel confident every time.",
    side: "left",
  },
];
