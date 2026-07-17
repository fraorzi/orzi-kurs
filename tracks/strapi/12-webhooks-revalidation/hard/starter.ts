export interface Event { model: string; action: string; documentId: string; locale: string; category?: string }
export function solve(event: Event): string[] {
  return ["content"];
}

