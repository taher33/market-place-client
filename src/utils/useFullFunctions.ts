export function trimStrings(
  str: string,
  limit: number,
  removeDots?: boolean
): string {
  if (removeDots || str.length <= limit) return str.slice(0, limit);
  return str.slice(0, limit) + "...";
}
