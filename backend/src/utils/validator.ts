export function isValidEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();

  // Regex for basic email structure validation
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(normalized)) return false;

  return true;
}

export function isValidISODate(dateStr: string): boolean {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/; // Simple YYYY-MM-DD format check
  if (!isoDateRegex.test(dateStr)) return false;

  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}