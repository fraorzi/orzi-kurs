export interface Faq { id?: number; question: string; answer: string }
export function solve(items: Faq[]): Omit<Faq, "id">[] {
  return items
    .map(({ question, answer }) => ({ question: question.trim(), answer: answer.trim() }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
}

