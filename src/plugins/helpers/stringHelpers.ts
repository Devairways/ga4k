export const truncateString = (string: string, chars: number): string => {
  if (!string) return "";

  if (string.length <= chars) {
    return string ?? "";
  }
  return string.substring(0, chars) + "...";
};
