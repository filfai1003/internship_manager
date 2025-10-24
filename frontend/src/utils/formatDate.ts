export function formatDate(iso?: string | null): string | undefined {
  if (!iso) return undefined;
  const datePart = iso.includes('T') ? iso.split('T')[0] : iso;
  const parts = datePart.split('-');
  if (parts.length !== 3) return iso;
  const [year, month, day] = parts;
  return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
}

export default formatDate;
