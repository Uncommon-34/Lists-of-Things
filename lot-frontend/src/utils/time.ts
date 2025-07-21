export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "long", // e.g., July
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
