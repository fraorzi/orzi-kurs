# Hard - wykonaj atomową operację redakcyjną

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

`strapi.db.transaction()` grupuje kilka operacji tak, żeby albo wszystkie
się powiodły i zacommitowały razem, albo żadna nie zostawiła śladu.
Aktualizacja dokumentu i zapis audytu to jedna operacja domenowa: klient
nie może dostać sukcesu aktualizacji bez wpisu audytowego ani odwrotnie.

Zaimplementuj `solve(tx)`, gdzie `tx` udostępnia `update`, `audit`,
`commit`, `rollback`:

- wykonaj `update()`, potem `audit()`, potem `commit()` - w tej kolejności;
- jeśli `update()` rzuci błąd, **nie** wywołuj `audit()` ani `commit()`,
  ale wykonaj `rollback()` i przekaż błąd dalej;
- jeśli `audit()` rzuci błąd (już po udanym `update()`), pomiń `commit()`,
  wykonaj `rollback()` i przekaż ten sam błąd dalej;
- gdy obie operacje się powiodą, wywołaj `commit()` **dokładnie raz**
  i nigdy nie wywołuj przy tym `rollback()`.
