export interface Faq { id?: number; question: string; answer: string }
export function solve(items: Faq[]): Omit<Faq, "id">[] {
  return items;
}

