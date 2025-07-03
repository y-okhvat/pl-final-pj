export function getExpirationDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${month}/${year}`;
}