export function solve(locale: string, page: number): string {
  if (!Number.isInteger(page) || page < 1) throw new Error("Nieprawidłowa strona");
  const params = new URLSearchParams();
  params.set("fields[0]", "title");
  params.set("fields[1]", "slug");
  params.set("locale", locale);
  params.set("status", "published");
  params.set("sort[0]", "publishedAt:desc");
  params.set("pagination[page]", String(page));
  params.set("pagination[pageSize]", "20");
  return params.toString();
}

