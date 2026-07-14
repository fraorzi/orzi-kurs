import { createCache } from "./cache.js";
import { debounce } from "./debounce.js";

export { createCache, debounce };

export function createListClient(options = {}) {
  const { fetchImpl = globalThis.fetch } = options;
  const cache = createCache();

  let currentQuery = "";
  let currentPage = 0;
  let hasMore = false;
  let items = [];
  let activeController = null;

  async function fetchPage(query, page) {
    const cached = cache.get(query, page);
    if (cached) return cached;
    const controller = new AbortController();
    activeController = controller;
    const url = `?q=${encodeURIComponent(query)}&page=${page}`;
    const res = await fetchImpl(url, { signal: controller.signal });
    const data = await res.json();
    cache.set(query, page, data);
    return data;
  }

  return {
    async search(query) {
      if (activeController) activeController.abort();
      currentQuery = query;
      currentPage = 1;
      const data = await fetchPage(query, 1);
      items = [...data.items];
      hasMore = data.hasMore;
      return items;
    },
    async next() {
      if (!hasMore) return items;
      const data = await fetchPage(currentQuery, currentPage + 1);
      currentPage += 1;
      items = [...items, ...data.items];
      hasMore = data.hasMore;
      return items;
    },
    getItems() {
      return items;
    },
    get query() {
      return currentQuery;
    },
    get page() {
      return currentPage;
    },
    get hasMore() {
      return hasMore;
    },
    get cacheSize() {
      return cache.size;
    },
  };
}
