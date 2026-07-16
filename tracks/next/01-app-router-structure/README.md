# App Router: pliki routingu, layouty i organizacja

App Router mapuje foldery na segmenty URL, ale sam folder nie publikuje trasy.
Dopiero `page.tsx` udostępnia UI, a `route.ts` endpoint HTTP. Pozostałe pliki można
bezpiecznie colocate'ować przy feature, ponieważ do klienta trafia tylko wynik
renderowania trasy, nie cały katalog.

## Hierarchia UI

Specjalne pliki tworzą zagnieżdżoną hierarchię: layout rodzica opakowuje layout
dziecka, a ten stronę. Root `app/layout.tsx` jest wymagany i musi zwrócić `html`
oraz `body`. Layout zachowuje stan podczas nawigacji; `template.tsx` ma inną
semantykę i celowo tworzy nową instancję.

`loading.tsx`, `error.tsx` i `not-found.tsx` są granicami konkretnego segmentu.
Ich położenie jest decyzją o zasięgu UI, nie tylko o porządku plików.

## Organizacja bez zmiany URL

- `(workspace)` jest route group: organizuje trasy i może mieć własny layout, ale
  nie pojawia się w URL.
- `_components` jest folderem prywatnym, wyłączonym z routingu.
- `@analytics` jest slotem parallel route, a nie segmentem URL.
- Zwykłe colocated pliki również nie stają się trasą bez `page` lub `route`.

Route groups umożliwiają kilka layoutów na tym samym poziomie. Przy wielu root
layouts przejście między grupami wykonuje pełne przeładowanie strony. Dwie grupy
nie mogą jednocześnie publikować tego samego URL.

## Kiedy używać

- Layoutu dla UI i stanu wspólnego dla całej gałęzi tras.
- Route group, gdy organizacja albo layout ma się różnić bez dodatkowego segmentu URL.
- Prywatnego folderu dla jednoznacznego oddzielenia implementacji od routingu.
- Colocation, gdy komponent lub loader należy wyłącznie do jednego feature'u.

## Pułapki

- Folder bez `page.tsx` nie publikuje strony.
- Route group nie jest częścią URL i może przypadkiem utworzyć konflikt z inną grupą.
- Nawigacja między wieloma root layouts powoduje full page load.
- Root layout bez `html` i `body` łamie kontrakt App Routera.
- Umieszczenie nawigacji workspace'u w root layout ujawnia ją także na loginie i marketingu.
- `layout.tsx` zachowuje stan; użycie go tam, gdzie potrzebny jest reset, daje ukryte bugi.

## Źródła

- <https://nextjs.org/docs/app/getting-started/project-structure>
- <https://nextjs.org/docs/app/getting-started/layouts-and-pages>
- <https://nextjs.org/docs/app/api-reference/file-conventions/layout>
- <https://nextjs.org/docs/app/api-reference/file-conventions/route-groups>
