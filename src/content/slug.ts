/**
 * A heading's anchor: "What stays on your Mac" is #what-stays-on-your-mac. Kept apart from blog.ts,
 * which reads files, so the heading component can use it too.
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
