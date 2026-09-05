# Hard - wyznacz precyzyjne tagi rewalidacji

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Webhook dostaje payload zdarzenia cyklu życia treści i musi zdecydować,
które tagi cache frontendu (`revalidateTag`) unieważnić - bez
przesadnego zasięgu (globalny purge) i bez pominięcia czegoś, co
faktycznie się zmieniło. Zaimplementuj `solve(event)` dla
`{ model, action, documentId, locale, category? }`:

- reaguj wyłącznie na `model: "article"` z `action` równą `"publish"`
  albo `"unpublish"` - każdy inny model albo inna akcja (np. `"update"`,
  webhook dla `media`) zwraca pustą tablicę, ta funkcja nie odpowiada za
  nic poza tym zakresem;
- dla trafienia zwróć zawsze tag dokumentu (`article:<documentId>`) i tag
  listy tego locale (`articles:<locale>`);
- gdy `category` jest podana, dołącz też `category:<category>:<locale>` -
  gdy jej brak, **nie** dodawaj żadnego tagu kategorii (ani pustego
  stringa, ani placeholdera);
- wynik bez duplikatów, kolejność dowolna, i bez żadnego globalnego tagu
  „unieważnij wszystko” - dokładnie tyle tagów, ile realnie się zmieniło.
