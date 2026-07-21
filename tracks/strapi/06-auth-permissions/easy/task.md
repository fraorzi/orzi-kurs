# Easy — odczytaj Bearer token bez wycieku

Middleware autoryzacji parsuje nagłówek `Authorization` przed przekazaniem
żądania dalej — musi rozpoznać dokładnie jeden schemat i nigdy nie
zalogować surowej wartości przy błędzie. Zaimplementuj `solve(header)`:

- dla `"Bearer <token>"` zwróć samo `<token>`;
- dla innego schematu (`Basic`, brak schematu, wielkość liter inna niż
  `Bearer`) zwróć `null`;
- dla `"Bearer "` (pusty token po spacji) i dla `undefined` zwróć `null`;
- token to jeden ciąg bez spacji — nagłówek z dodatkową spacją albo
  drugim segmentem też ma dać `null`.
