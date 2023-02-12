export function formatShortDate(date: Date): string {
  return date.toLocaleString("de-De", {
    minute: "numeric",
    hour: "numeric",
    second: "numeric",
  });
}