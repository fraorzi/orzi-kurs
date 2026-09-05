# Panel z tytułem i zawartością

Tryb: od zera. Napisz rozwiązanie w `starter.tsx`, korzystając z podanych sygnatur i typów.

Napisz `Panel`, który przyjmuje `title: string`, `children: ReactNode`
i opcjonalny `tone: "info" | "warning"`.
Zwróć `section` z atrybutem `data-tone`, nagłówkiem `h2` równym `title`
i przekazanym `children`. Domyślny `tone` to `"info"`.
Przekazany przycisk ma nadal być przyciskiem i reagować na kliknięcie.
Nie zamieniaj `children` na tekst.
