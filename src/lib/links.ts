/**
 * Central navigation links. Change a URL here and every button / link across
 * the site follows it. Internal paths start with "/"; you can also drop in a
 * full external URL (e.g. "https://shop.jdsjungle.com") and the helpers below
 * still build the right links.
 */

// ---------------------------------------------------------------------------
// Shop
// ---------------------------------------------------------------------------

/**
 * Storefront base. Point this at your real shop and EVERY shop link updates:
 * the "Shop Now" buttons, the navbar Shop mega-menu, the home category grid,
 * the "Choose your feeling" cards and the best-seller product cards.
 */
export const SHOP_URL = "/shop";

/** Shopping cart / checkout. */
export const CART_URL = `${SHOP_URL}/cart`;

/** Link to a product category, e.g. `shopCategory("pre-rolls")`. */
export const shopCategory = (slug: string) => `${SHOP_URL}/${slug}`;

/** Link to a single product, e.g. `shopProduct("apex-vaporizer")`. */
export const shopProduct = (slug: string) => `${SHOP_URL}/${slug}`;

/** Link to the shop filtered by a "feeling", e.g. `shopFeeling("relaxing")`. */
export const shopFeeling = (feeling: string) => `${SHOP_URL}?feeling=${feeling}`;

/**
 * Product categories shown in the navbar Shop menu and the home category grid.
 * `slug` is appended to {@link SHOP_URL} via {@link shopCategory}.
 */
export const SHOP_CATEGORIES = [
  { label: "Flower", slug: "flower" },
  { label: "Pre-Rolls", slug: "pre-rolls" },
  { label: "Vapes", slug: "vapes" },
  { label: "Edibles", slug: "edibles" },
  { label: "Concentrate", slug: "concentrate" },
  { label: "Tinctures", slug: "tinctures" },
  { label: "Oil", slug: "oil" },
  { label: "Topicals", slug: "topicals" },
  { label: "Accessories", slug: "accessories" },
] as const;

// ---------------------------------------------------------------------------
// Account
// ---------------------------------------------------------------------------

/** Loyalty / account sign-up ("Join for free"). */
export const SIGNUP_URL = "/signup";
