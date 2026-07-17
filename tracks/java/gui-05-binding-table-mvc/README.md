# Binding, TableView i MVC

## Grupa

GUI

## Kiedy

Gdy observable model waliduje stan, computed value aktualizuje się po zmianie, a tabela dostaje DTO zamiast encji.

## Pułapki

Dwukierunkowy binding bez walidacji tworzy niepoprawny model; cell factory nie może wykonywać I/O i dodawać listenerów bez cleanupu.

## Źródła

- [Java SE 25 desktop API](https://docs.oracle.com/en/java/javase/25/docs/api/java.desktop/module-summary.html)
- [PJATK GUI Dojo](https://dojo.pjwstk.edu.pl/pl/gui)
