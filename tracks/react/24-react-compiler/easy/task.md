# Komponent zgodny z regułami i możliwy do skompilowania

Napraw `ExpandableDetails`.

Komponent ma pokazywać `Funkcja wyłączona`, gdy `enabled` jest fałszywe. Gdy jest
włączony, przycisk `Pokaż szczegóły` / `Ukryj szczegóły` steruje widocznością
tekstu `Szczegóły wdrożenia`.

Hook nie może być wywoływany warunkowo. Rozwiązanie ma przechodzić Rules of Hooks
i zostać rzeczywiście zoptymalizowane przez React Compiler.

