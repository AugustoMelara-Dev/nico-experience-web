export function formatCurrency(amount: number, currency: "HNL" | "USD") {
  return new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
