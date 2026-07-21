export function solve(response: { data: Array<{ documentId: string; title: string }> }): string[] {
  return response.data.map((item) => item.title);
}

