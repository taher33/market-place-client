export function trimStrings(
  str: string,
  limit: number,
  removeDots?: boolean
): string {
  if (removeDots) return str.slice(0, limit);
  return str.slice(0, limit) + "...";
}
