## Hint 1

Sekcja „Przekład then ↔ await" w README pokazuje dokładnie tę transformację
dla `loadUserProfile`. Każde `.then((x) => ...)` staje się `const x = await ...`.

## Hint 2

`loadWithFallback`: `.catch(() => fallback)` to `try { return await fetchData(); }
catch { return fetchBackup(); }`. Pamiętaj o `await` w `try` — bez niego catch
nie złapie odrzucenia.
