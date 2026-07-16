# Medium — auth rozszerzające RequestContext

Moduł `request.ts` należy do rdzenia i nie wolno go zmieniać.

W `auth.ts`:

- zdefiniuj `AuthUser`,
- rozszerz przez `declare module "./request"` interfejs `RequestContext` o
  opcjonalne pole `user?: AuthUser`,
- zaimplementuj `attachUser` bez mutacji,
- zaimplementuj `requireUser`, która zwraca użytkownika albo rzuca
  `"unauthenticated"`.

Testy importują bazowy `RequestContext`, ale po załadowaniu pluginu ma on zawierać
pole `user`.
