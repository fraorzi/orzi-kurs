export { createCache } from "./cache.js";
export { debounce } from "./debounce.js";

export function createListClient(options = {}) {
  // TODO: paginowany klient listy. options: { fetchImpl = globalThis.fetch }.
  // Trzymaj w domknięciu: cache (createCache), currentQuery, currentPage, hasMore,
  // items (zebrane pozycje) i activeController (AbortController ostatniego żądania).
  //
  // Pomocnik fetchPage(query, page):
  //  - jeśli w cache jest (query, page) → zwróć z cache (bez fetcha)
  //  - inaczej: utwórz AbortController, zapamiętaj jako activeController,
  //    zawołaj fetchImpl(`?q=${encodeURIComponent(query)}&page=${page}`, { signal }),
  //    sparsuj JSON ({ items, hasMore }), zapisz do cache i zwróć
  //
  // Zwróć { search, next, getItems, query, page, hasMore, cacheSize }:
  //  - search(query): ANULUJ poprzednie żądanie (activeController.abort()) — zmiana
  //    zapytania unieważnia stare wyniki; ustaw currentQuery, currentPage = 1;
  //    pobierz stronę 1, ustaw items = [...data.items], hasMore; zwróć items
  //  - next(): jeśli !hasMore → zwróć items bez zmian; inaczej pobierz kolejną stronę,
  //    dołącz jej items do zebranych, zaktualizuj currentPage i hasMore; zwróć items
  //  - getItems() → zebrane pozycje; query/page/hasMore/cacheSize → gettery stanu
}
