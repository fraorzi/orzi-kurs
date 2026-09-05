# Hard - zapisz plik atomowo

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Usługa nadpisuje plik stanu, którego nie wolno zostawić zapisanego w połowie.
Zaimplementuj `solve(target, content)`:

- zapisz do pliku tymczasowego obok celu (np. `target + ".<pid>.tmp"`),
  otwartego z flagą `"wx"`;
- po zapisie wykonaj `sync()` i `close()` na uchwycie, dopiero wtedy
  `rename` na `target` - rename na tym samym systemie plików jest atomowy;
- po dowolnym błędzie zamknij uchwyt i usuń plik tymczasowy (`rm` z
  `force: true`), a błąd wyrzuć dalej;
- nadpisanie istniejącego celu ma być dozwolone (to sedno wzorca).
