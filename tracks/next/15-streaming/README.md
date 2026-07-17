# Streaming UI i odpowiedzi

App Router wykorzystuje strumień HTML i React Server Component payload. To, co
renderuje się przed pracą asynchroniczną, tworzy static shell. Każda granica
`Suspense` jest niezależnym punktem streamingu: fallback trafia wcześniej, a gotowa
sekcja zastępuje go bez blokowania rodzeństwa.

`loading.tsx` automatycznie otacza stronę granicą i nadaje się do page-level
fallbacku. Jawne `Suspense` bliżej wolnego odczytu pozwala zachować więcej realnego
UI w shellu. Dynamiczny odczyt (`params`, `cookies()`, dane) warto przesunąć do
komponentu, który naprawdę go potrzebuje, zamiast awaitować wysoko w layoucie.

Route Handler może osobno streamować surowe dane przez Web Streams API. Po wysłaniu
pierwszego chunku status i nagłówki są już niezmienne, dlatego istnienie zasobu i
uprawnienia trzeba sprawdzić przed rozpoczęciem odpowiedzi.

## Kiedy używać

- Wolne, niezależne sekcje dashboardu za osobnymi granicami Suspense.
- Page-level `loading.tsx`, gdy bez danych nie ma jeszcze sensownej treści.
- Duży eksport, SSE albo generowanie pliku bez buforowania całości w pamięci.
- Static shell z nagłówkiem/LCP poza wolną granicą.

## Kiedy unikać

- Granicy wokół każdej drobnej wartości, gdy powoduje migotanie UI.
- Skeletonu o innym rozmiarze niż treść, który pogarsza CLS.
- Streamingu, jeśli reverse proxy lub platforma buforuje całą odpowiedź.
- Rozpoczęcia streamu przed authz i decyzją o prawdziwym statusie HTTP.

## Pułapki

- Jeden wysoki `loading.tsx` zastępujący cały ekran zamiast niezależnych sekcji.
- Sekwencyjne `await` przed JSX, które tworzą waterfall i pusty shell.
- LCP schowane za wolnym Suspense.
- Próba zmiany 200 na 404 po wysłaniu pierwszego chunku.
- Brak obsługi anulowania przy zamknięciu pobierania.

## Źródła

- <https://nextjs.org/docs/app/guides/streaming>
- <https://nextjs.org/docs/app/api-reference/file-conventions/loading>
- <https://developer.mozilla.org/docs/Web/API/Streams_API>
