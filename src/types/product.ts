export type Money = {
  amount: number;
  currency?: string;
};

export type Product = {
  id: string;
  title: string;
  price: Money;
  comparePrice?: Money;
  imageUrl: string;
  badge?: string;
  rating?: number;
};

export function formatPrice(money: Money): string {
  const { amount, currency = "USD" } = money;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}
