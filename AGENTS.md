<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Długoterminowe rozwijanie curriculum

- Nie odpalaj dev servera do sprawdzania zmian, chyba że użytkownik wprost o to
  poprosi.
- Nie uruchamiaj buildu, jeśli środowisko nie ma dostępu do internetu, a build
  wymaga pobrania zewnętrznych zasobów, na przykład Google Fonts.
- Proste wartości używane jeden raz zapisuj inline. Wyciągaj je do `const` lub
  helpera tylko wtedy, gdy są używane wielokrotnie, mają znaczenie domenowe,
  upraszczają złożony warunek, unikają kosztownych obliczeń albo pomagają w
  typowaniu lub testowaniu.
- Celem repo jest doprowadzenie ucznia z obecnego poziomu interna do samodzielności
  mida, nie samo pokrycie składni.
- Przed pracą nad treścią przeczytaj
  `docs/curriculum/OPERATING_MODEL.md`, `docs/curriculum/ROADMAP.md` oraz
  `docs/curriculum/STATE.md`.
- Używaj wyłącznie GPT-5.6 Sol. Nie uruchamiaj subagenta, jeśli nie można
  zagwarantować mu tego modelu.
- Każdy język lub framework rozwijaj na osobnym branchu `feature/curriculum-<track>`.
- Nie modyfikuj rozwiązań ucznia ani `progress.json`, chyba że zadanie wprost tego
  wymaga. Po testach przywróć stan użytkownika.
- Treść opieraj na aktualnych źródłach pierwotnych i zapisuj datę audytu. Materiał
  wersjozależny musi wskazywać wersję docelową.
- Ukończenie tracka wymaga: zielonych rozwiązań wzorcowych, czerwonych starterów,
  audytu merytorycznego, zadań debugowych, optymalizacyjnych i modułów praktycznych.
