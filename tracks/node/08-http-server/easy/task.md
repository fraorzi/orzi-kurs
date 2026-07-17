# Dopasuj metodę i pathname

Router ma ignorować query string, dekodować pathname i zwracać 405 z Allow, gdy istnieje trasa dla innej metody.

Kod ma pozostać TypeScript-first, deterministyczny i możliwy do testowania bez zewnętrznych usług.
