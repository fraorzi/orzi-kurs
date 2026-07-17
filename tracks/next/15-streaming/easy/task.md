# Zbuduj stabilny page-level fallback

Zaimplementuj komponent `Loading` dla listy zamówień. Ma wystawić region ze
statusem ładowania (`role="status"`, `aria-live="polite"`, `aria-busy="true"`),
tekst dostępny dla czytnika oraz trzy ukryte przed AT wiersze skeletonu.

Kontener skeletonu ma rezerwować co najmniej `240px` wysokości, aby ograniczyć CLS.
