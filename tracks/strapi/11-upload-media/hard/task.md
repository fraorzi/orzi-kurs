# Hard - autoryzuj bezpieczne powiązanie media

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Upload pliku przed sprawdzeniem uprawnień marnuje zasoby (dysk, storage
w chmurze) na dane, których użytkownik i tak nie miał prawa dodać. A gdy
upload się powiedzie, ale powiązanie z dokumentem już nie - osierocony
plik zostaje w Media Library na zawsze, jeśli nikt go nie posprząta.

Zaimplementuj `solve(deps)`, gdzie `deps` udostępnia `authorize`,
`upload`, `link(id)`, `remove(id)`:

- najpierw `authorize()` - gdy zwróci `false`, rzuć `Error` zawierający
  `Forbidden` i **nie wywołuj** `upload()` w ogóle;
- po autoryzacji wywołaj `upload()` i zapamiętaj zwrócone `id`;
- następnie `link(id)` - łączy plik z dokumentem;
- gdy `link(id)` rzuci błąd, wywołaj `remove(id)` (sprzątanie osieroconego
  pliku) i dopiero potem przekaż oryginalny błąd dalej;
- gdy wszystko się powiedzie, zwróć `id` i **nigdy** nie wywołuj `remove`;
- błąd samego `upload()` (przed uzyskaniem `id`) propaguje się bez
  wywołania `link` ani `remove` - nie ma jeszcze czego czyścić.
