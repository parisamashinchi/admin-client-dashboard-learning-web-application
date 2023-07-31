export function convertToSlug(title) {
  if (typeof title !== "string") return "";
  return title.split(" ").join("_");
}
