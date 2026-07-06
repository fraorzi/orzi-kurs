# orzi-kurs — MVP todo

- [x] Scaffold (Next 16 + Tailwind 4 + Vitest + git init)
- [x] SPEC.md — kontrakty harnessu i konwencje zadań (+ debug, wieloplikowe)
- [x] Harness (Opus): runner, pipeline test→lint, bench, progress, auto-commit, CLI, API routes, verify:solutions
- [x] Treść JS (Fable): 01-closures, 02-array-methods, 03-promises, 04-async-await, 05-event-loop × easy/medium/hard (verify:solutions 15/15)
- [x] UI (Sonnet + frontend-design): sidebar, widoki zagadnienia/zadania, submit, wyniki, hinty, statusy
- [x] Kurykulum pełnego zakresu (tasks/curriculum.md) + prompty sesji (tasks/prompts.md)
- [x] Weryfikacja end-to-end: build OK, strona główna/teoria/zadanie OK, submit → NIEZALICZONE 0/6 z nazwami testów, hinty odkrywane, konsola czysta, 0 italików/gradientów, progress wyzerowany
- [ ] Pierwszy commit (propozycja złożona, czeka na akceptację)

## Review

MVP kompletny. Pipeline sprawdzania deterministyczny (vitest + ESLint + bench),
treść w 100% kurowana ze źródeł i zweryfikowana wzorcami (15/15). UI bez generycznej
AI-estetyki, jeden ciemny motyw, monospace. Znane ograniczenia: zadania wieloplikowe
wymagają rozszerzenia harnessu (SPEC, zrobi to sesja js/module-01); e2e dla tracku
next odroczone; audyt treści (Prompt 2) do odpalenia po każdym module.
