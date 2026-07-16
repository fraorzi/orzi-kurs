export async function readProductSlug(
  params: Promise<{ readonly slug: string }>,
): Promise<string> {
  const { slug } = await params;
  const normalized = slug.trim();
  if (!normalized) throw new Error("Nieprawidłowy slug produktu");
  return normalized;
}
