# Zrób stabilny rewrite eksperymentu cenowego

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj Proxy dla `/pricing`. Wybierz wariant z cookie `pricing-variant`, jeśli
ma wartość `a` lub `b`. W przeciwnym razie policz sumę kodów znaków nagłówka
`x-anonymous-id` (fallback: `anonymous`) i wybierz `a` dla sumy parzystej, `b` dla
nieparzystej.

Przepisz request na `/pricing/{variant}`, zachowaj query, przekaż downstream mały
nagłówek requestu `x-pricing-variant` i ustaw takie samo cookie odpowiedzi z
`httpOnly`, `sameSite: lax`, ścieżką `/` i `maxAge` równym 30 dni. Inne trasy
przepuść bez rewrite'u.
