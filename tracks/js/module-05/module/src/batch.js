export function createBatcher(batchFn, options = {}) {
  // TODO: grupowanie pojedynczych żądań w jedno wywołanie batchFn(keys).
  // options: { maxSize = Infinity }. Trzymaj kolejkę oczekujących w domknięciu.
  // Zwróć { load, flush, size }:
  //  - load(key): dorzuć klucz do kolejki i zwróć Promise na jego wynik;
  //    gdy kolejka osiągnie maxSize → automatyczny flush()
  //  - flush(): jeśli kolejka pusta → Promise.resolve(); inaczej zawołaj
  //    batchFn(keys) RAZ dla wszystkich zebranych kluczy, a wyniki (tablica w tej
  //    samej kolejności) rozdaj do odpowiednich Promise'ów; wyczyść kolejkę.
  //    Gdy batchFn odrzuci — odrzuć wszystkie Promise'y z tej partii.
  //  - size (getter): ile kluczy czeka
}
