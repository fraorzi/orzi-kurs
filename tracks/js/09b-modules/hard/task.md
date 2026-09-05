# Hard - bezpieczny loader pluginów

Tryb: projekt. Uzupełnij pliki w `src/`. Gotowe typy i połączenia między plikami są punktem wyjścia.

Uzupełnij rejestr pluginów ładowanych dopiero na żądanie:

- `plugins/uppercase.js` i `plugins/slugify.js` eksportują domyślnie gotowe funkcje;
  nie zmieniaj ich kontraktu.
- `registry.js` eksportuje `loadPlugin(name)`:
  - używa jawnej allow-listy loaderów dla `"uppercase"` i `"slugify"`;
  - każdy loader korzysta z dynamicznego `import()`;
  - dla nieznanej nazwy rzuca `Error("Unknown plugin: <nazwa>")`.
- `index.js` re-eksportuje `loadPlugin` i eksportuje
  `runPlugin(name, value)`, które ładuje moduł i wywołuje jego eksport domyślny.

Nie składaj ścieżki importu bezpośrednio z `name`. W prawdziwym systemie nazwa może
pochodzić z konfiguracji lub requestu; jawny rejestr ogranicza dozwolone moduły.

```js
await runPlugin("uppercase", "Zażółć"); // "ZAŻÓŁĆ"
await runPlugin("slugify", "  Żółta Łódź  "); // "zolta-lodz"
await runPlugin("admin", "x"); // Error: Unknown plugin: admin
```
