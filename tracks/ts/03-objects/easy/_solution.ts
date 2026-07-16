export interface Product {
  id: number;
  name: string;
  price: number;
  tags?: string[];
}

export interface DiscountedProduct extends Product {
  discount: number;
}

export function label(product: Product): string {
  const base = `${product.name} — ${product.price.toFixed(2)} zł`;
  if (!product.tags || product.tags.length === 0) return base;
  return `${base} [${product.tags.join(", ")}]`;
}

export function finalPrice(product: DiscountedProduct): number {
  const price = product.price * (1 - product.discount);
  return Math.round(price * 100) / 100;
}
