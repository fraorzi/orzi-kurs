# Zweryfikuj env przy starcie

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj `readServerEnv`. Wymagaj `DATABASE_URL` zaczynającego się od
`postgres://` lub `postgresql://`, `SESSION_SECRET` o długości co najmniej 32 oraz
niepustego `OTEL_SERVICE_NAME`. Jeśli istnieje `NEXT_PUBLIC_SESSION_SECRET` albo
`NEXT_PUBLIC_DATABASE_URL`, przerwij z błędem wycieku.

Zwróć wyłącznie trzy jawnie dozwolone pola w zamrożonym obiekcie. Komunikat błędu
ma wymieniać nazwy błędnych zmiennych, nigdy ich wartości.
