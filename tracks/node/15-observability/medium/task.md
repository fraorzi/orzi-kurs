# Medium — normalizuj event-loop delay

Histogram `monitorEventLoopDelay` raportuje **nanosekundy**; dashboard mówi
w milisekundach. Zaimplementuj `solve(metrics, budgetMs)`:

- przelicz `p50Ns`, `p99Ns`, `maxNs` na ms z zaokrągleniem do **dwóch miejsc
  po przecinku**;
- `degraded` jest prawdą, gdy `p99Ms` **przekracza** budżet (równość to
  jeszcze zdrowy stan);
- zwróć `{ p50Ms, p99Ms, maxMs, degraded }`.
