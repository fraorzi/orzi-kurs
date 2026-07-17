# [O] Usuń leak listenerów

Subskrypcja ma utrzymywać najwyżej jeden listener na klienta i zwracać cleanup; ponowna rejestracja zastępuje starą.

Kod ma pozostać TypeScript-first, deterministyczny i możliwy do testowania bez zewnętrznych usług.
