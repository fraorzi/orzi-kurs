# Stan curriculum intern → mid

Aktualizacja: 2026-09-05.

## Audyt użyteczności 2026-09-05

Wszystkie 606 zadań mają jawny tryb pracy. Ujednolicono formatowanie diffa,
uproszczono polecenia, usunięto obowiązek implementowania ARIA i modyfikatory pól
propsów. Poprawione szablony są oddzielone od kodu ucznia. Wszystkie rozwiązania
i bramki starterów przechodzą. Szczegóły: [USABILITY_AUDIT.md](USABILITY_AUDIT.md).

## Wynik

Curriculum jest ukończone na gałęzi `feature/curriculum-final-audit`. Obejmuje
8 publicznych tracków, 222 tematy i 606 zadań. Każde zadanie ma starter,
rozwiązanie wzorcowe, test oraz progresywne hinty. Dodatkowe 8 zadań `_smoke`
sprawdza sam harness i nie jest widoczne jako materiał ucznia.

Kolejność frontendu jest zgodna z planem użytkownika:
JavaScript → TypeScript → React w TypeScript/TSX → Next.js w TypeScript/TSX.
Node, MySQL i Strapi rozwijają backend, a combined ćwiczy pracę przekrojową.
Java (PPJ → GUI → UTP → SKJ + TPO) została 2026-07-18 przeniesiona do osobnego
repo `orzi-kurs_java` z natywnym toolchainem Gradle/JUnit/IntelliJ; `tracks/java`
i adapter kompilacji usunięto z tego repo, plan zachowany w README tamtego repo.

## Branche

| Etap | Branch | Commit |
|---|---|---|
| Fundament | `feature/curriculum-foundation` | `38f9880` |
| JavaScript | `feature/curriculum-javascript` | `bc81b47` |
| TypeScript | `feature/curriculum-typescript` | `b769e5c` |
| React | `feature/curriculum-react` | `dfa1196` |
| Next.js | `feature/curriculum-next` | `01b5064` |
| Node.js | `feature/curriculum-node` | `6b04aa7` |
| MySQL | `feature/curriculum-mysql` | `0ed8206` |
| Strapi | `feature/curriculum-strapi` | `19cb675` |
| Combined | `feature/curriculum-combined` | `0b9cef3` |
| Audyt końcowy | `feature/curriculum-final-audit` | bieżący HEAD |

Wszystkie branche technologiczne są wypchnięte do `origin`. Agent tworzy branche,
commity i pushe; użytkownik otwiera PR-y.

## Dowody

- JavaScript: 161/161 rozwiązań i 161/161 bramek starterów.
- TypeScript: 95/95 na TS 6 oraz natywnym TS 7, rozwiązania i startery.
- React: 99/99, wyłącznie TypeScript/TSX.
- Next.js: 62/62, wyłącznie TypeScript/TSX i API zgodne z lokalnymi docs Next 16.2.
- Node.js: 62/62 rozwiązań i starterów.
- MySQL: 68/68 rozwiązań i starterów na realnym MySQL 8.4.10.
- Strapi: 46/46 rozwiązań i 46/46 starterów.
- Combined: 13/13 rozwiązań, 13/13 starterów i strict TypeScript bez diagnostyki.

Dokładna macierz, źródła i ograniczenia środowiskowe są w `FINAL_AUDIT.md`.

## Reguły dalszego utrzymania

- Wyłącznie GPT-5.6 Sol; bez subagentów, jeśli modelu nie da się potwierdzić.
- Bez dev servera, o ile użytkownik nie poprosi.
- React i Next pozostają TypeScript/TSX-only.
- Zmiana oficjalnego API wymaga aktualizacji źródła, teorii, startera, rozwiązania
  i testu, a następnie `pnpm audit:curriculum`.
- Audyt nie resetuje `progress.json` ani kodu ucznia.
