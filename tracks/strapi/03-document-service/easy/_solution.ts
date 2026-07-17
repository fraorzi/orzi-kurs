export function solve(documentId: string, locale: string): { documentId: string; locale: string; status: "published" } {
  if (!/^[a-zA-Z0-9]{24}$/.test(documentId)) throw new Error("Nieprawidłowy documentId");
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(locale)) throw new Error("Nieprawidłowe locale");
  return { documentId, locale, status: "published" };
}

