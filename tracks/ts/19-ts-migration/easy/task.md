# Easy — migracja baseUrl i paths

Zaimplementuj `migratePathMappings(baseUrl, paths)`. W TS 5.x wartości `paths` były
często względne wobec `baseUrl`. Po usunięciu `baseUrl` każdy target ma być jawną
ścieżką względem katalogu tsconfiga.

```ts
migratePathMappings("./src", {
  "@app/*": ["app/*"],
  "@shared/*": ["../shared/*"],
});
// {
//   "@app/*": ["./src/app/*"],
//   "@shared/*": ["./shared/*"],
// }
```

Wymagania:

- obsłuż `.` i `..` w obu częściach ścieżki,
- zamień backslashe na `/`,
- wynik każdego targetu ma zaczynać się od `./`,
- zachowaj aliasy, kolejność targetów i wejście bez mutacji,
- nie używaj systemowego `path.resolve`, bo wynik ma pozostać przenośny i względny.
