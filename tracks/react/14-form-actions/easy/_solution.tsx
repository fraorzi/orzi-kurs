export function SearchActionForm({
  search,
}: {
  readonly search: (query: string) => Promise<void>;
}) {
  async function searchAction(formData: FormData) {
    const query = String(formData.get("query") ?? "").trim();

    if (query) {
      await search(query);
    }
  }

  return (
    <form action={searchAction}>
      <label htmlFor="search-query">Fraza</label>
      <input id="search-query" name="query" />
      <button type="submit">Szukaj</button>
    </form>
  );
}
