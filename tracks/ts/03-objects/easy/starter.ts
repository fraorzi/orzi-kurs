// TODO: id, name, price + opcjonalne tags: string[]
export interface Product {
  id: number;
}

// TODO: rozszerz Product o discount: number (użyj extends)
export interface DiscountedProduct {
  discount: number;
}

export function label(product: Product): string {
  // TODO: "Kubek — 29.90 zł" albo "Kubek — 29.90 zł [kuchnia, x]"
  return "";
}

export function finalPrice(product: DiscountedProduct): number {
  // TODO: cena po rabacie, zaokrąglona do dwóch miejsc
  return 0;
}
