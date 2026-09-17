/**
 * Converts a room title or name into a clean URL slug.
 * Examples:
 * "Premium Single Room" -> "premium-single-room"
 * "Single Room" -> "single-room"
 * "Three sharing Room" -> "three-sharing-room"
 * "Two Sharing" -> "two-sharing-room"
 */
export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/ sharing /gi, "-sharing-")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getRoomSlug(nameOrTitle: string, explicitSlug?: string): string {
  if (explicitSlug && explicitSlug.trim().length > 0) {
    return explicitSlug.trim().toLowerCase();
  }
  const slug = slugify(nameOrTitle);
  if (slug === "two-sharing") return "two-sharing-room";
  if (slug === "four-sharing") return "four-sharing-room";
  if (slug === "three-sharing") return "three-sharing-room";
  return slug;
}
