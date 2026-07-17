# Audyt tracka JavaScript

Data: 2026-07-16. Branch: `feature/curriculum-javascript`.

## Wynik wykonawczy

- Stan wejściowy: 51 zwykłych tematów, 5 modułów i 158 zadań.
- `pnpm verify:solutions js`: 158/158 przed zmianami.
- Nowa bramka `pnpm verify:starters js`: 158/158 pierwotnych starterów przed
  dodaniem nowego tematu.
- Dodano `09b-modules`: 3 wieloplikowe zadania o ESM, żywych wiązaniach,
  publicznym API i dynamicznym imporcie z allow-listą.
- Stan końcowy: 161/161 rozwiązań przechodzi. Bramki starterów: 158/158 dla stanu
  wejściowego oraz 3/3 dla nowego tematu, łącznie 161/161.
- Usunięto metadane IDE przypadkowo zapisane wewnątrz startera `module-01`.

## Najważniejsze decyzje programowe

### Rdzeń mida

Rdzeń kończy się na `module-05` i obejmuje:

- świadomą pracę z typami runtime, tekstem i kolekcjami,
- moduły ESM jako granice odpowiedzialności,
- błędy synchroniczne i asynchroniczne,
- Promise, event loop, fetch, anulowanie i kontrolę współbieżności,
- iteratory, generatory, deskryptory i WeakMap,
- debugowanie, dobór struktur danych, koszt alokacji i powtórzonej pracy,
- pięć modułów praktycznych.

### Elective

Po rdzeniu umieszczono API, które może być użyteczne, lecz nie powinno opóźniać
przejścia do TypeScriptu i Reacta:

- `Intl.Segmenter`,
- BigInt,
- `Promise.withResolvers`,
- iterator helpers,
- async generators,
- Proxy/Reflect,
- WeakRef/FinalizationRegistry,
- trampoliny,
- zaawansowane wyrażenia regularne.

WeakRef jest elective szczególnie celowo: oficjalna dokumentacja ostrzega, że jego
semantyka zależy od garbage collectora i zaleca unikanie go, gdy istnieje prostsze
rozwiązanie.

## Audyt mechaniczny

Każdy istniejący temat miał README, komplet task/test/hints/solution i trzy poziomy,
a każdy moduł komplet wieloplikowy. Wszystkie rozwiązania wzorcowe przeszły pipeline.

Dotychczasowy proces sprawdzał jedynie `_solution`. Dodana komenda odtwarza starter
z commita, w którym został utworzony, dzięki czemu zaliczone rozwiązanie ucznia nie
jest mylone z wadliwym starterem. Dla `[O]` testy jakości mają znacznik `[quality]`:
poprawność musi być zielona, a bramka jakości czerwona.

## Źródła i aktualność

- MDN JavaScript Guide: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide>
- MDN JavaScript Modules: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules>
- ECMAScript 2025: <https://tc39.es/ecma262/2025/>
- TC39 finished proposals: <https://github.com/tc39/proposals/blob/main/finished-proposals.md>
- MDN Memory Management: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management>

Materiały o nowościach pozostają przypięte do oficjalnych stron MDN w
`harness/resources.ts`. Funkcje zależne od świeżego runtime są w elective albo mają
testy zgodne z lokalnym Node 22.

## Dalsze ryzyka

- Track jest bardzo szeroki. Uczeń powinien przejść rdzeń, rozpocząć TypeScript,
  a do elective wracać według potrzeb projektu.
- Temporal jest już standardem Stage 4, ale nie należy do rdzenia tego brancha:
  docelowy Node 24 go nie udostępnia bezpiecznie jako wspólnego minimum, podczas gdy
  Node 26 już go dostarcza. Temat należy ponownie ocenić przy audycie wersji runtime.
- Ten branch nie zmienia istniejących rozwiązań ucznia ani `progress.json`.
