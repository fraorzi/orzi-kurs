# Easy — zbuduj minimalne flagi permissions

Launcher workerów składa argv Node według zasady najmniejszych uprawnień.
Zaimplementuj `solve(entry, access)`:

- pierwszym argumentem jest zawsze `--permission`;
- dla każdej ścieżki z `access.read` dodaj `--allow-fs-read=<ścieżka>`,
  z `access.write` — `--allow-fs-write=<ścieżka>`;
- `access.worker` → `--allow-worker`, `access.child` →
  `--allow-child-process`;
- na końcu ścieżka `entry`;
- pusta konfiguracja daje sam `--permission` + entry — **żadnych** wildcardów
  "na wszelki wypadek".
