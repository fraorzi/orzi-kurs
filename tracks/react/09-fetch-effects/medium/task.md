# Najnowsze wyniki wyszukiwania wygrywają

Zaimplementuj `SearchResults`.

Po każdej zmianie `query` wywołaj `search(query)`. Pokazuj `Szukanie…` do czasu
zakończenia bieżącego żądania, a potem listę `Wyniki`.

Odpowiedzi mogą zakończyć się w dowolnej kolejności. Cleanup efektu ma oznaczyć
poprzednie żądanie jako nieaktualne, aby starsza odpowiedź nie nadpisała nowszego
wyniku ani nie przywróciła stanu pending.
