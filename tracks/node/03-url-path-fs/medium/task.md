# Zatrzymaj path traversal

Zwróć bezpieczną ścieżkę pod rootem albo rzuć błąd dla `..`, ścieżki absolutnej i prefiksu tylko tekstowo podobnego do root.

Kod ma pozostać TypeScript-first, deterministyczny i możliwy do testowania bez zewnętrznych usług.
