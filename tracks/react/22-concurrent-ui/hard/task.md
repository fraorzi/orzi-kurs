# Zakładki zachowujące stan bez ukrytych subskrypcji

Zaimplementuj `WorkspaceTabs` z użyciem stabilnego komponentu `<Activity>`.

Panel `Edycja` zawiera kontrolowane pole `Notatka robocza`. Jego lokalny stan ma
przetrwać przejście do zakładki `Podgląd` i powrót. Przekazana funkcja `subscribe`
uruchamia subskrypcję edytora i zwraca cleanup.

Gdy panel edycji jest ukryty:

- nie może być dostępny dla użytkownika,
- jego Effect ma zostać posprzątany,
- lokalny draft ma pozostać zachowany.

Po ponownym pokazaniu panelu Effect ma zasubskrybować się ponownie, a wpisany
draft nadal ma znajdować się w polu.

