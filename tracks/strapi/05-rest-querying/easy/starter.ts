export function solve(response: { data: Array<{ attributes?: { title?: string }; title?: string }> }): string[] {
  return response.data.map((item) => item.attributes?.title ?? "");
}

