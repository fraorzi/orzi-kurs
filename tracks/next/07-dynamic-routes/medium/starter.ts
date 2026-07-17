export async function readCatalogSegments(
  params: Promise<{ readonly slug?: readonly string[] }>,
): Promise<readonly string[]> {
  const { slug } = await params;
  return slug ?? [];
}
