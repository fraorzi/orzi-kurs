# Nawigacja i URL jako źródło prawdy

Filtry, sortowanie i strona listy powinny być reprezentowane w URL, gdy użytkownik
ma móc skopiować widok, odświeżyć stronę i użyć Wstecz/Dalej. Server Component
odczytuje `searchParams` jako Promise zwykłego obiektu, a Client Component może
użyć `useSearchParams`, `usePathname` i routera.

Przy zmianie jednego pola sklonuj bieżące `URLSearchParams`, aby zachować niezależne
parametry. Zmiana query lub sortowania zwykle resetuje `page`, bo poprzedni numer
może nie istnieć w nowym zbiorze. Domyślne wartości warto usuwać z URL.

## Historia i przejścia

`router.push` dodaje wpis historii i pasuje do nawigacji, do której użytkownik chce
wrócić. `router.replace` zastępuje bieżący wpis i jest lepszy dla korekty tekstowego
filtra, która nie powinna produkować kilkunastu kroków Wstecz. `<Link>` zapewnia
client transition i prefetch; zwykły `<a>` powoduje pełne przeładowanie.

## Kiedy używać

- URL dla udostępnialnych filtrów, sortowania, zakładek i paginacji.
- `replace` dla częstych korekt jednego stanu, `push` dla świadomych kroków historii.
- `<Link>` dla deklaratywnej nawigacji i paginacji.
- `loading.tsx` przy dynamicznej trasie, aby częściowy prefetch miał fallback.

## Pułapki

- Duplikowanie search params w `useState` i synchronizowanie efektem.
- Budowanie nowego query od zera i przypadkowe kasowanie innych filtrów.
- Pozostawienie `page=8` po zmianie zapytania.
- Ufanie `page`, `sort` i powtarzającym się parametrom bez walidacji.
- `push` przy każdym znaku inputa i zaśmiecenie historii.
- Wyłączanie prefetch dla wszystkich linków bez pomiaru kosztu.

## Źródła

- <https://nextjs.org/docs/app/getting-started/linking-and-navigating>
- <https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional>
- <https://nextjs.org/docs/app/api-reference/functions/use-search-params>
- <https://nextjs.org/docs/app/api-reference/functions/use-router>
