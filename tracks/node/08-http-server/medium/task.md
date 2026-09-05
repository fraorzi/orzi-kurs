# Medium - czytaj body z limitem

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Body requestu kontroluje klient - także złośliwy. Zaimplementuj
`solve<T>(body, maxBytes)`:

- zbieraj chunki z `AsyncIterable<Uint8Array>`, licząc **bajty**;
- przekroczenie `maxBytes` przerywa czytanie **natychmiast** (kolejne chunki
  nie mogą zostać pobrane) i rzuca `Error` z `413` w komunikacie;
- komplet bajtów parsuj jako JSON; błąd parsowania to `Error` z `400`
  w komunikacie - to inna klasa błędu niż "za duże";
- rozmiar dokładnie równy limitowi jest legalny.
