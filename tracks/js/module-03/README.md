# Moduł 03 — Paginowany klient listy z cache

Trzeci **projekt wieloplikowy**. Odtwarzasz mechanikę, którą ma niemal każda lista
z wyszukiwarką: piszesz w polu → po chwili leci zapytanie → wyniki są stronicowane
i doładowywane, a raz pobrana strona nie jest ściągana drugi raz. Trzy pułapki, które
tu rozbrajasz, to realne bugi produkcyjne: nadmiar żądań przy pisaniu, wyścig starych
odpowiedzi i zbędne pobrania.

To synteza czterech zagadnień: **Map jako cache/indeks** (17/35), **debounce** (25),
**fetch + AbortController** (32) oraz **async/await**.

## Architektura

```
src/
├─ cache.js     # createCache() — Map kluczowany (query, page)
├─ debounce.js  # debounce(fn, waitMs) — dławi wpisywanie
└─ index.js     # createListClient — search / next + cache + anulowanie
```

`index.js` używa `cache.js`; `debounce.js` jest niezależny (eksportowany do użycia
w warstwie UI). Cały ruch sieciowy zamknięty jest w jednym pomocniku `fetchPage`,
więc reguły cache i anulowania żyją w jednym miejscu.

## Kluczowe idee

- **Debounce ucina lawinę żądań.** Bez niego każde naciśnięcie klawisza to jedno
  zapytanie. Debounce czeka na ciszę i wysyła tylko ostatnią wersję frazy — mniej
  ruchu, mniej wyścigów.
- **AbortController rozbraja wyścig odpowiedzi.** Gdy zapytanie się zmienia, stara
  odpowiedź jest już nieaktualna. Jeśli przyjdzie później niż nowa, wyrenderuje złe
  wyniki. Anulowanie w locie sprawia, że stare żądanie po prostu nie dobiega końca.
- **Cache kluczowany (query, page).** Powrót do poprzedniej frazy albo strony jest
  natychmiastowy — `Map` odpowiada bez sieci. Klucz łączący oba wymiary to ten sam
  wzorzec, co indeks w bazie: jedna struktura, wiele wymiarów dostępu.

## Kiedy używać / czego unikać

- **Używaj** debounce'a do wejść sterowanych człowiekiem (search, autosave, resize);
  do zdarzeń o stałym tempie (scroll, mousemove) częściej pasuje throttle.
- **Nie cache'uj** bez strategii unieważniania, gdy dane szybko się zmieniają — łatwo
  pokazać nieświeży wynik. Tu cache żyje tyle, co instancja klienta; produkcyjnie
  dodałbyś TTL albo ręczne `clear()`.
- **Nie zapominaj** anulować przy zmianie zapytania — „pierwsze wraca ostatnie"
  to jeden z najczęstszych, a najtrudniej powtarzalnych, bugów UI.

## Pułapki

- Klucz cache musi obejmować zarówno zapytanie, jak i stronę.
- Odrzucony Promise nie powinien na stałe zatruć cache poprawnych kolejnych prób.
- Abort poprzedniego requestu jest oczekiwanym sterowaniem przepływem, nie błędem UI.
- Debounce wymaga cleanupu, inaczej callback może wykonać się po zakończeniu konsumenta.
