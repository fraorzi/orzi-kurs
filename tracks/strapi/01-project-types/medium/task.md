# Medium — wyprowadź publiczny kontrakt pól

Warstwa serializacji odpowiedzi (np. dokumentacja API albo eksport OpenAPI)
potrzebuje listy pól, które wolno pokazać na zewnątrz. Zaimplementuj
`solve(attributes)` dla mapy atrybutów schematu content type:

- pole z `private: true` nigdy nie trafia do kontraktu, niezależnie od typu;
- pole typu `"password"` nigdy nie trafia do kontraktu, nawet gdy nie ma
  `private: true` — to osobny, niezależny mechanizm ukrywania w Strapi 5;
- pole bez klucza `private` traktuj jako publiczne (`undefined` ≠ `true`);
- pozostałe typy (`string`, `richtext`, `relation`, `enumeration`, ...) są
  publiczne bez wyjątków;
- zwróć nazwy pól posortowane alfabetycznie, nie w kolejności deklaracji.
