export async function readCatalogSegments(
  params: Promise<{ readonly slug?: readonly string[] }>,
): Promise<readonly string[]> {
  const { slug } = await params;

  return (slug ?? []).map((segment) => {
    let decoded: string;
    try {
      decoded = decodeURIComponent(segment).trim();
    } catch {
      throw new Error("Nieprawidłowy segment katalogu");
    }

    if (
      !decoded ||
      decoded === "." ||
      decoded === ".." ||
      decoded.includes("/") ||
      decoded.includes("\\")
    ) {
      throw new Error("Nieprawidłowy segment katalogu");
    }

    return decoded;
  });
}
