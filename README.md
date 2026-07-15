# orzi-kurs

Lokalna apka do nauki JS/TS/React/Next/Strapi/MySQL. Zadania rozwiązujesz we własnym
edytorze, submit sprawdza je deterministycznie (testy + lint + benchmarki) — zero AI
w sprawdzaniu.

## Start

```bash
pnpm install
pnpm dev          # dashboard na http://localhost:3000
```

## Workflow

1. W dashboardzie wybierz track → zagadnienie → przeczytaj teorię (README).
2. Otwórz poziom (easy/medium/hard) i edytuj `starter.js` w swoim edytorze
   (ścieżka jest w widoku zadania).
3. Kliknij **Submit** — wyniki testów, lint i ewentualne benchmarki pojawią się od razu.
4. Utknąłeś? Odkrywaj hinty pojedynczo.
5. Po zaliczeniu zobaczysz porównanie własnego kodu z rozwiązaniem wzorcowym. Licznik
   prób, użycie hinta, poziom opanowania i termin powtórki zapisują się w `progress.json`.
6. Jeśli chcesz utrwalić zaliczenie w gicie, uruchom świadomie
   `pnpm commit:task <taskId>`. Submit nigdy nie tworzy commita sam.

Z terminala zamiast UI: `pnpm submit js/01-closures/easy`.

Przycisk **Następne zadanie** prowadzi kolejno przez easy → medium → hard, a po hard
otwiera easy następnego zagadnienia. Reset postępu nie modyfikuje plików rozwiązania.

## Struktura zadania

```
tracks/js/01-closures/
├─ README.md      # teoria zagadnienia
├─ easy|medium|hard/
│  ├─ task.md     # polecenie
│  ├─ starter.js  # TWÓJ plik — jedyny, który edytujesz
│  ├─ run.test.js # testy (nie podglądaj przed rozwiązaniem ;))
│  ├─ hints.md    # hinty
│  └─ _solution.js# wzorzec — UI pokazuje po zaliczeniu
```

## Dla utrzymującego

- `pnpm verify:solutions [track]` — dowód, że każdy wzorzec przechodzi swoje testy.
  Musi być zielone po każdej zmianie treści.
- Konwencje treści i kontrakty harnessu: [SPEC.md](SPEC.md).
- Zadania są kurowane ze sprawdzonych źródeł (javascript.info, Exercism, MDN,
  oficjalne docs) — nie wymyślane. Testy pisane pod rozwiązania wzorcowe.
- Review po module: rozwiązania zapisane komendą `pnpm commit:task` są w gicie
  (`solve:` commity) — otwórz PR z gałęzi
  i daj do przejrzenia człowiekowi albo `/code-review`.
