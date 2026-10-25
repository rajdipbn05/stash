// Shows a price stored in cents, like 1200 → "$12" or 1250 → "$12.50".
export function formatPrice(amount: number, currency: string) {
  const value = amount / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

// Only allow normal web, email and phone links, so a creator can't add a
// link that runs code in a visitor's browser (like "javascript:...").
export function safeHref(url: string): string | null {
  try {
    const parsed = new URL(url);
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol)
      ? parsed.href
      : null;
  } catch {
    return null;
  }
}
