export async function readProductSlug(
  params: Promise<{ readonly slug: string }>,
): Promise<string> {
  await params;
  return "unknown";
}
