export const TextSlicer = (text: string, max: number = 50) => {
  if (text.length >= max) {
    return text.slice(0, max) + "...";
  }
  return text;
};
export function formatCurrency(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-US");
}
