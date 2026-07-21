# Regresja, a11y i wydajność zastanego feature

## Kontekst

Prawie każda praca mid-levela to nie zielone pole, tylko dotknięcie
istniejącego widoku, który już działa dla większości użytkowników i ma
własną historię zgłoszeń. `buildRows` łączy dwie kolekcje z różnych warstw
(pozycje listy i właściciele) w wiersze gotowe do wyrenderowania — dokładnie
tam, gdzie w realnych projektach spotykają się trzy niezależne osie jakości:
poprawność (identity po reorderze), dostępność (etykiety dla czytnika
ekranu) i wydajność (koszt złączenia rosnący z danymi klienta). Projekt uczy
oceniać zastany kod pod wszystkimi trzema naraz, zamiast traktować "działa"
jako wystarczające kryterium.

## Decyzje

- **Klucz wiersza = `item.id`, nie indeks.** Indeks jest stabilny tylko
  dopóki kolejność się nie zmienia; każdy sort, filtr czy reorder w UI
  przesuwa dane pod tym samym indeksem, więc React myli wiersze i gubi ich
  lokalny stan (zaznaczenie, otwarty edytor).
- **Etykieta akcji zawiera tytuł pozycji.** Czytnik ekranu ogłasza kontrolkę
  poza jej wizualnym kontekstem — sama nazwa akcji ("Edytuj") jest
  nieodróżnialna między wierszami. WCAG 2.5.3 wymaga, by dostępna nazwa
  odzwierciedlała widoczny cel kontrolki.
- **Indeks właścicieli budowany raz, nie per wiersz.** `Map` z `users`
  zamienia dopasowanie z O(items × users) na O(items + users) — różnica,
  która na 20 rekordach jest niezauważalna, a na tysiącach blokuje wątek UI.
- **Fallback zamiast `undefined`.** Brakujący właściciel to stan, który się
  zdarza (usunięty użytkownik, niespójne dane migracji) — UI musi go pokazać
  wprost, nie renderować puste pole.

## Pułapki

- `String(index)` jako klucz przechodzi każdy test na statycznych danych —
  regresja ujawnia się dopiero przy sortowaniu/filtrowaniu w prawdziwym UI,
  więc pisz test na reorder, nie tylko na render początkowy.
- Generyczna etykieta akcji nie rzuca błędu ani ostrzeżenia — a11y-regresje
  są ciche z definicji, dlatego wymagają dedykowanego testu, nie code review
  "na oko".
- `.find()` wewnątrz `.map()` wygląda identycznie do poprawnej wersji w
  diffie — różnica jest algorytmiczna, nie syntaktyczna, więc lint jej nie
  złapie. Test `[quality]` liczy wywołania, nie mierzy czasu (czas na CI jest
  niedeterministyczny).
- Nie myl fallbacku "Nieznany" z ukryciem błędu — jeśli `ownerId` nigdy nie
  powinien być osierocony, to defensywny fallback maskuje bug gdzie indziej;
  tutaj zakładamy, że osierocone rekordy to legalny stan danych.

## Źródła (audyt 2026-07-20)

- [WCAG 2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)
- [React: Rendering Lists — dlaczego klucz nie może być indeksem](https://react.dev/learn/rendering-lists#why-does-react-need-keys)
- [MDN: Map — złożoność i kiedy używać zamiast tablicy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
