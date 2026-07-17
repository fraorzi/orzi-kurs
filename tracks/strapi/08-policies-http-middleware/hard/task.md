# Skomponuj middleware z poprawną kolejnością

Zwróć runner realizujący onion model: before A,B, handler, after B,A; przerwanie nie może wywołać dalszego łańcucha.

Kod ma być TypeScript-first, deterministyczny i testowalny bez panelu administracyjnego ani zewnętrznych usług.

